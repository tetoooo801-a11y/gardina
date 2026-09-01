import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LangProvider, useLang } from './context/LangContext'
import AnimatedNav from './components/AnimatedNav'
import Footer from './components/Footer'
import QuickContact from './components/QuickContact'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Careers from './pages/Careers'
import Contact from './pages/Contact'

export type Page = 'home' | 'about' | 'projects' | 'careers' | 'contact'

export interface ContactPrefill {
  subject?: string
  message?: string
}

const TRANSITION_MS = 500

function AppInner() {
  const { isAr, t } = useLang()
  const [page, setPage] = useState<Page>('home')
  const [loading, setLoading] = useState(false)
  const [contactPrefill, setContactPrefill] = useState<ContactPrefill | null>(null)
  const nextPage = useRef<Page>('home')
  const pendingPrefill = useRef<ContactPrefill | null>(null)

  const navigate = (p: Page, prefill?: ContactPrefill) => {
    pendingPrefill.current = prefill || null
    if (p === page) {
      if (prefill) setContactPrefill(prefill)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    nextPage.current = p
    setLoading(true)
  }

  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => {
      setPage(nextPage.current)
      setContactPrefill(pendingPrefill.current)
      window.scrollTo({ top: 0 })
      setTimeout(() => setLoading(false), 100)
    }, TRANSITION_MS)
    return () => clearTimeout(t)
  }, [loading])

  const gardeniaLogo = isAr ? '/gardenia-logo-collapsed.svg' : '/gardenia-logo-collapsed-en.svg'

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <AnimatedNav currentPage={page} onNavigate={navigate} />

      {/* Page transition overlay with Gardenia Logo */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="page-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: [0.94, 1.02, 0.96], opacity: 1 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
              }}
            >
              <img
                src={gardeniaLogo}
                alt="Gardenia Developments"
                style={{
                  height: 52,
                  width: 'auto',
                  filter: 'brightness(0) invert(1) sepia(1) saturate(1.8) hue-rotate(5deg) drop-shadow(0 0 24px rgba(212,175,55,0.45))',
                }}
              />
              <div
                style={{
                  fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                  fontSize: isAr ? 15 : 13,
                  letterSpacing: isAr ? 0 : '0.22em',
                  textTransform: isAr ? 'none' : 'uppercase',
                  color: 'var(--gold)',
                  fontWeight: 600,
                }}
              >
                {t('Gardenia Developments', 'جاردينيا للتطوير العقاري')}
              </div>
            </motion.div>

            {/* Shimmer loading bar */}
            <div
              style={{
                width: 140,
                height: 2,
                background: 'rgba(225, 220, 200, 0.12)',
                borderRadius: 999,
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '60%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ flex: 1 }}>
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'about' && <About onNavigate={navigate} />}
        {page === 'projects' && <Projects onNavigate={navigate} />}
        {page === 'careers' && <Careers onNavigate={navigate} />}
        {page === 'contact' && <Contact prefill={contactPrefill} />}
      </main>

      {/* Floating Sales Contact Widget */}
      <QuickContact />

      <Footer onNavigate={navigate} />
    </div>
  )
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}

