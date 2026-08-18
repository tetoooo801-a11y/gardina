import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'

type Page = 'home' | 'about' | 'projects' | 'careers' | 'contact'

interface HeaderProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav: Array<{ key: Page; en: string; ar: string }> = [
    { key: 'home', en: 'Home', ar: 'الرئيسية' },
    { key: 'about', en: 'About Us', ar: 'من نحن' },
    { key: 'projects', en: 'Projects', ar: 'المشروعات' },
    { key: 'careers', en: 'Careers', ar: 'الوظائف' },
    { key: 'contact', en: 'Contact Us', ar: 'تواصل معنا' },
  ]

  const handleNav = (page: Page) => {
    onNavigate(page)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en')
  }

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="wrap header-inner">
          <button className="logo" onClick={() => handleNav('home')}>
            {t('GARDENIA', 'جاردينيا')}
          </button>
          <nav>
            {nav.map(item => (
              <a
                key={item.key}
                href="#"
                className={currentPage === item.key ? 'active' : ''}
                onClick={e => { e.preventDefault(); handleNav(item.key) }}
              >
                {t(item.en, item.ar)}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="lang-toggle" onClick={toggleLang}>
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <a
              href="#"
              className="book-btn"
              onClick={e => { e.preventDefault(); handleNav('contact') }}
            >
              {t('Get In Touch', 'تواصل معنا')} →
            </a>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-nav">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="logo">{t('GARDENIA', 'جاردينيا')}</span>
            <button
              onClick={() => setMobileOpen(false)}
              style={{ color: 'var(--petal)', padding: '8px' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="mobile-nav-links">
            {nav.map(item => (
              <a
                key={item.key}
                href="#"
                onClick={e => { e.preventDefault(); handleNav(item.key) }}
              >
                {t(item.en, item.ar)}
              </a>
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '32px', display: 'flex', gap: '12px' }}>
            <button className="lang-toggle" onClick={toggleLang}>
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <a
              href="#"
              className="book-btn"
              onClick={e => { e.preventDefault(); handleNav('contact'); setMobileOpen(false) }}
            >
              {t('Get In Touch', 'تواصل معنا')} →
            </a>
          </div>
        </div>
      )}
    </>
  )
}
