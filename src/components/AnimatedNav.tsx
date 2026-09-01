import * as React from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useLang } from '../context/LangContext'

const gardeniaLogoAr          = '/gardenia-logo.svg'
const gardeniaLogoEn          = '/gardenia-logo-en.png'
const gardeniaLogoCollapsedAr = '/gardenia-logo-collapsed.svg'
const gardeniaLogoCollapsedEn = '/gardenia-logo-collapsed-en.svg'

type Page = 'home' | 'about' | 'projects' | 'careers' | 'contact'

interface AnimatedNavProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

const NAV: Array<{ key: Page; en: string; ar: string }> = [
  { key: 'home',     en: 'Home',     ar: 'الرئيسية' },
  { key: 'about',    en: 'About',    ar: 'من نحن' },
  { key: 'projects', en: 'Projects', ar: 'المشروعات' },
  { key: 'careers',  en: 'Careers',  ar: 'الوظائف' },
  { key: 'contact',  en: 'Contact',  ar: 'تواصل' },
]

const COLLAPSE_THRESHOLD = 150
const EXPAND_DELTA = 80

export default function AnimatedNav({ currentPage, onNavigate }: AnimatedNavProps) {
  const { lang, setLang, t, isAr } = useLang()
  const [isExpanded, setExpanded] = React.useState(true)
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const { scrollY } = useScroll()
  const lastScrollY = React.useRef(0)
  const collapseScrollY = React.useRef(0)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = lastScrollY.current
    if (isExpanded && latest > prev && latest > COLLAPSE_THRESHOLD) {
      setExpanded(false)
      collapseScrollY.current = latest
    } else if (!isExpanded && latest < prev && collapseScrollY.current - latest > EXPAND_DELTA) {
      setExpanded(true)
    }
    lastScrollY.current = latest
  })

  const handleNav = (page: Page) => {
    onNavigate(page)
    setMobileOpen(false)
    setExpanded(true)
  }

  const petal    = 'rgba(225,220,200,0.88)'
  const petalDim = 'rgba(225,220,200,0.5)'
  const bg       = 'rgba(8,14,10,0.9)'
  const border   = '1px solid rgba(225,220,200,0.13)'
  const logoFilter = 'brightness(0) invert(1) sepia(1) saturate(1.5) hue-rotate(5deg)'

  return (
    <>
      {/* ── PILL NAV ── */}
      <div style={{
        position: 'fixed', top: 20, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100, pointerEvents: 'none',
      }}>
        <motion.nav
          dir={isAr ? 'rtl' : 'ltr'}
          aria-label="Main Navigation"
          title={isExpanded ? undefined : (isAr ? 'انقر لفتح القائمة' : 'Click to expand menu')}
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1, width: isExpanded ? 'auto' : '44px' }}
          transition={{ type: 'spring', damping: 22, stiffness: 280 }}
          onClick={() => { if (!isExpanded) setExpanded(true) }}
          style={{
            display: 'flex', alignItems: 'center',
            overflow: 'hidden',
            borderRadius: '999px',
            border, background: bg,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            height: '44px',
            boxShadow: '0 4px 32px rgba(0,0,0,0.38)',
            cursor: isExpanded ? 'default' : 'pointer',
            pointerEvents: 'auto',
            whiteSpace: 'nowrap',
            position: 'relative',
          }}
        >
          {/* Expanded content — fades in/out as one block */}
          <motion.div
            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            style={{ display: 'flex', alignItems: 'center', pointerEvents: isExpanded ? 'auto' : 'none' }}
          >
            {/* Logo */}
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', padding: isAr ? '0 10px 0 14px' : '0 14px 0 10px' }}>
              <img
                key={lang}
                src={isAr ? gardeniaLogoAr : gardeniaLogoEn}
                alt={isAr ? 'جاردينيا هايتس' : 'Gardenia Heights'}
                style={{ height: 26, width: 'auto', filter: logoFilter, opacity: 0.95 }}
              />
            </div>

            {/* Divider */}
            <div style={{ flexShrink: 0, width: 1, height: 18, background: 'rgba(225,220,200,0.15)' }} />

            {/* Nav links + lang + hamburger */}
            <div className="animated-nav-links" style={{ display: 'flex', alignItems: 'center', gap: 2, padding: '0 8px' }}>
              {NAV.map(item => (
                <a
                  key={item.key}
                  href="#"
                  onClick={e => { e.preventDefault(); e.stopPropagation(); handleNav(item.key) }}
                  style={{
                    fontSize: isAr ? '12px' : '11px',
                    fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                    letterSpacing: isAr ? 0 : '0.08em',
                    textTransform: isAr ? 'none' : 'uppercase',
                    color: currentPage === item.key ? petal : petalDim,
                    fontWeight: currentPage === item.key ? 600 : 400,
                    padding: '5px 10px',
                    borderRadius: '999px',
                    background: currentPage === item.key ? 'rgba(225,220,200,0.1)' : 'transparent',
                    transition: 'color 0.2s, background 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { if (currentPage !== item.key) (e.currentTarget as HTMLElement).style.color = petal }}
                  onMouseLeave={e => { if (currentPage !== item.key) (e.currentTarget as HTMLElement).style.color = petalDim }}
                >
                  {t(item.en, item.ar)}
                </a>
              ))}

              {/* Lang toggle */}
              <div className="animated-nav-lang" style={{ marginInlineStart: 4 }}>
                <button
                  onClick={e => { e.stopPropagation(); setLang(lang === 'en' ? 'ar' : 'en') }}
                  style={{
                    fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-en-body)', fontWeight: 600,
                    color: 'var(--gold)',
                    background: 'rgba(184,144,90,0.12)',
                    border: '1px solid rgba(184,144,90,0.25)',
                    borderRadius: '999px', padding: '4px 10px',
                    cursor: 'pointer', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(184,144,90,0.22)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(184,144,90,0.12)')}
                >
                  {lang === 'en' ? 'AR' : 'EN'}
                </button>
              </div>

              {/* Mobile hamburger */}
              <div style={{ marginInlineStart: 2 }}>
                <button
                  onClick={e => { e.stopPropagation(); setMobileOpen(v => !v) }}
                  className="mobile-menu-trigger-btn"
                  aria-label="Open menu"
                  style={{
                    display: 'none', width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(225,220,200,0.08)',
                    border: '1px solid rgba(225,220,200,0.15)',
                    alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: petal,
                  }}
                >
                  <Menu size={15} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Collapsed logo — absolutely centered */}
          <motion.div
            animate={{ opacity: isExpanded ? 0 : 1, scale: isExpanded ? 0.7 : 1 }}
            transition={{ duration: 0.18, ease: 'easeInOut', delay: isExpanded ? 0 : 0.12 }}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            <img
              key={lang}
              src={isAr ? gardeniaLogoCollapsedAr : gardeniaLogoCollapsedEn}
              alt="Gardenia"
              style={{ height: 26, width: 'auto', maxWidth: 36, objectFit: 'contain', filter: logoFilter, opacity: 0.92, direction: 'ltr' }}
            />
          </motion.div>
        </motion.nav>
      </div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(6,10,6,0.97)',
              backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column',
              padding: '32px 28px',
            }}
            onClick={() => setMobileOpen(false)}
          >
            {/* Drawer header */}
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}
              onClick={e => e.stopPropagation()}
            >
              <img
                key={lang}
                src={isAr ? gardeniaLogoAr : gardeniaLogoEn}
                alt={isAr ? 'جاردينيا هايتس' : 'Gardenia Heights'}
                style={{ height: 28, width: 'auto', filter: logoFilter, opacity: 0.95 }}
              />
              <button
                onClick={() => setMobileOpen(false)}
                style={{ color: petalDim, padding: 8, background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }} onClick={e => e.stopPropagation()}>
              {NAV.map((item, i) => (
                <a
                  key={item.key}
                  href="#"
                  onClick={e => { e.preventDefault(); handleNav(item.key) }}
                  style={{
                    fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                    fontSize: 'clamp(28px, 8vw, 48px)',
                    fontWeight: isAr ? 700 : 300,
                    letterSpacing: '-0.01em',
                    color: currentPage === item.key ? petal : 'rgba(225,220,200,0.3)',
                    textDecoration: 'none',
                    padding: '10px 0',
                    borderBottom: i < NAV.length - 1 ? '1px solid rgba(225,220,200,0.07)' : 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {t(item.en, item.ar)}
                </a>
              ))}
            </div>

            {/* Footer row */}
            <div style={{ marginTop: 'auto', display: 'flex', gap: 12, alignItems: 'center' }} onClick={e => e.stopPropagation()}>
              <button
                onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
                style={{
                  fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-en-body)', fontWeight: 600,
                  color: 'var(--gold)', background: 'rgba(184,144,90,0.12)',
                  border: '1px solid rgba(184,144,90,0.25)',
                  borderRadius: '999px', padding: '8px 18px', cursor: 'pointer',
                }}
              >
                {lang === 'en' ? 'AR' : 'EN'}
              </button>
              <a
                href="#"
                onClick={e => { e.preventDefault(); handleNav('contact') }}
                style={{
                  fontSize: '12px', letterSpacing: '0.06em', textTransform: 'uppercase',
                  fontFamily: 'var(--font-en-body)', fontWeight: 500,
                  color: petal, background: 'rgba(225,220,200,0.1)',
                  border: '1px solid rgba(225,220,200,0.2)',
                  borderRadius: '999px', padding: '8px 20px', textDecoration: 'none',
                }}
              >
                {t('Get In Touch', 'تواصل معنا')} →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
