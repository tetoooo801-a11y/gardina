import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LangProvider } from './context/LangContext'
import AnimatedNav from './components/AnimatedNav'
import Footer from './components/Footer'
import QuickContact from './components/QuickContact'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import BoxLoader from './components/ui/box-loader'

export type Page = 'home' | 'about' | 'projects' | 'careers' | 'contact'

export interface ContactPrefill {
  subject?: string
  message?: string
}

const TRANSITION_MS = 500

function AppInner() {
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <AnimatedNav currentPage={page} onNavigate={navigate} />

      {/* Page transition overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="page-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <BoxLoader />
            <div className="page-transition-label">Gardenia Developments</div>
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

