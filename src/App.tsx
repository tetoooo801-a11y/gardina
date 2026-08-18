import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LangProvider } from './context/LangContext'
import AnimatedNav from './components/AnimatedNav'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Careers from './pages/Careers'
import Contact from './pages/Contact'
import BoxLoader from './components/ui/box-loader'

type Page = 'home' | 'about' | 'projects' | 'careers' | 'contact'

const TRANSITION_MS = 600

function AppInner() {
  const [page, setPage] = useState<Page>('home')
  const [loading, setLoading] = useState(false)
  const nextPage = useRef<Page>('home')

  const navigate = (p: Page) => {
    if (p === page) return
    nextPage.current = p
    setLoading(true)
  }

  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => {
      setPage(nextPage.current)
      window.scrollTo({ top: 0 })
      setTimeout(() => setLoading(false), 120)
    }, TRANSITION_MS)
    return () => clearTimeout(t)
  }, [loading])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AnimatedNav currentPage={page} onNavigate={navigate} />

      {/* Page transition overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="page-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
          >
            <BoxLoader />
            <div className="page-transition-label">Loading</div>
          </motion.div>
        )}
      </AnimatePresence>

      <main style={{ flex: 1 }}>
        {page === 'home' && <Home onNavigate={navigate} />}
        {page === 'about' && <About onNavigate={navigate} />}
        {page === 'projects' && <Projects onNavigate={navigate} />}
        {page === 'careers' && <Careers onNavigate={navigate} />}
        {page === 'contact' && <Contact />}
      </main>
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
