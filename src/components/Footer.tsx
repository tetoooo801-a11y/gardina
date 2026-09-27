import { useLang } from '../context/LangContext'

type Page = 'home' | 'about' | 'projects' | 'careers' | 'contact'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  const { t } = useLang()

  const nav: Array<{ key: Page; en: string; ar: string }> = [
    { key: 'home', en: 'Home', ar: 'الرئيسية' },
    { key: 'about', en: 'About Us', ar: 'من نحن' },
    { key: 'projects', en: 'Projects', ar: 'المشروعات' },
    { key: 'careers', en: 'Careers', ar: 'الوظائف' },
    { key: 'contact', en: 'Contact Us', ar: 'تواصل معنا' },
  ]

  const handleNav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo" style={{ letterSpacing: '0.12em', fontSize: '18px', fontWeight: 600 }}>
              {t('GARDENIA HEIGHTS', 'جاردينيا هايتس')}
            </div>
            <p>
              {t(
                'Developing visionary New Classic communities, open-air commercial destinations, and medical landmarks across 10th of Ramadan City and New Sohag.',
                'تطوير مجتمعات كلاسيكية جديدة متكاملة، ومراكز تجارية مفتوحة، وصروح طبية رائدة عبر مدينتي العاشر من رمضان وسوهاج الجديدة.'
              )}
            </p>
            <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.1em' }}>
              {t('LIFE YOU DESERVE', 'حياة تليق بك')}
            </div>

            {/* Mobile-only social icons (visible only on mobile view) */}
            <div className="footer-mobile-socials">
              <div className="footer-social-row">
                <a
                  href="https://wa.me/201050176306"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={t('WhatsApp: 01050176306', 'واتساب: 01050176306')}
                  className="footer-social-btn footer-social-wa"
                  aria-label="WhatsApp"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/>
                  </svg>
                </a>

                <a
                  href="tel:17994"
                  title={t('Hotline: 17994', 'الخط الساخن: 17994')}
                  className="footer-social-btn footer-social-phone"
                  aria-label="Hotline 17994"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/gardenia_heights_developments?stkn=MXdzN2RzeTFwOGlzdA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="footer-social-btn footer-social-ig"
                  aria-label="Instagram"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/share/1DYKNgHetH/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Facebook"
                  className="footer-social-btn footer-social-fb"
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('Navigate', 'تصفح')}</h4>
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

          <div className="footer-col">
            <h4>{t('Direct Inquiries', 'التواصل المباشر')}</h4>
            <a href="tel:17994">
              {t('Hotline: 17994', 'الخط الساخن: 17994')}
            </a>
            <a href="mailto:info@gardeniaheights.com">
              info@gardeniaheights.com
            </a>
            <div style={{ fontSize: '12.5px', color: 'rgba(255, 253, 248, 0.65)', lineHeight: 1.5, marginTop: '8px' }}>
              {t(
                'New Ordonia Mall, 7th Floor, 10th of Ramadan City',
                'مول الأردنية الجديد، الدور السابع، مدينة العاشر من رمضان'
              )}
            </div>
          </div>

          <div className="footer-col">
            <h4>{t('Connect & Follow', 'تواصل وتابعنا')}</h4>
            
            {/* Social & Chat Icons Row (WhatsApp, Hotline, Instagram, Facebook) */}
            <div className="footer-social-row" style={{ marginBottom: '22px' }}>
              <a
                href="https://wa.me/201050176306"
                target="_blank"
                rel="noopener noreferrer"
                title={t('WhatsApp: 01050176306', 'واتساب: 01050176306')}
                className="footer-social-btn footer-social-wa"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/gardenia_heights_developments?stkn=MXdzN2RzeTFwOGlzdA=="
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="footer-social-btn footer-social-ig"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>

              <a
                href="https://www.facebook.com/share/1DYKNgHetH/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="footer-social-btn footer-social-fb"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            <h4 style={{ marginTop: '16px', marginBottom: '12px' }}>{t('Legal', 'قانوني')}</h4>
            <a href="#" onClick={e => e.preventDefault()}>{t('Privacy Policy', 'سياسة الخصوصية')}</a>
            <a href="#" onClick={e => e.preventDefault()}>{t('Terms & Conditions', 'الشروط والأحكام')}</a>
          </div>
        </div>
        <div className="footer-bottom" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
          <span>{t('© 2026 Gardenia Heights Developments. All rights reserved.', '© 2026 جاردينيا هايتس للتطوير العقاري، جميع الحقوق محفوظة')}</span>
          <div
            className="footer-powered-badge"
            dir="ltr"
            style={{
              fontSize: '11.5px',
              fontWeight: 500,
              color: 'var(--gold)',
              background: 'rgba(212, 175, 55, 0.14)',
              border: '1px solid rgba(212, 175, 55, 0.42)',
              padding: '4px 12px',
              borderRadius: '999px',
              letterSpacing: '0.03em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 0 12px rgba(212, 175, 55, 0.14)',
              transition: 'all 0.22s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(212, 175, 55, 0.22)'
              el.style.borderColor = 'var(--gold)'
              el.style.boxShadow = '0 0 16px rgba(212, 175, 55, 0.3)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'rgba(212, 175, 55, 0.14)'
              el.style.borderColor = 'rgba(212, 175, 55, 0.42)'
              el.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.14)'
            }}
          >
            <span style={{ opacity: 0.85, fontWeight: 400 }}>Powered by</span>
            <a
              href="https://www.instagram.com/ads_with_benefits?stkn=emNjZnprd2E0dDhh"
              target="_blank"
              rel="noopener noreferrer"
              title="Powered by ads with benefits (Instagram)"
              style={{
                color: 'var(--gold)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
                textDecorationColor: 'rgba(212, 175, 55, 0.75)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#fff'
                el.style.textDecorationColor = '#fff'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'var(--gold)'
                el.style.textDecorationColor = 'rgba(212, 175, 55, 0.75)'
              }}
            >
              <span>ads with benefits</span>
              <span style={{ fontSize: '10px', opacity: 0.9 }}>↗</span>
            </a>
            <span
              style={{
                fontSize: '10px',
                opacity: 0.6,
                fontWeight: 700,
                margin: '0 1px',
                color: 'var(--gold)',
                userSelect: 'none',
              }}
              aria-hidden="true"
            >
              ✕
            </span>
            <a
              href="https://sirad-agancy.com/en"
              target="_blank"
              rel="noopener noreferrer"
              title="Sirad Creative Agency"
              style={{
                color: 'var(--gold)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.color = '#fff'
                const img = el.querySelector('img')
                if (img) {
                  img.style.filter = 'brightness(1.3) drop-shadow(0 0 6px rgba(212, 175, 55, 0.6))'
                  img.style.transform = 'scale(1.04)'
                }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.color = 'var(--gold)'
                const img = el.querySelector('img')
                if (img) {
                  img.style.filter = 'none'
                  img.style.transform = 'scale(1)'
                }
              }}
            >
              <img
                src="/images/sirad-logo-gold.png"
                alt="Sirad Creative Agency"
                style={{
                  height: '13px',
                  width: 'auto',
                  objectFit: 'contain',
                  verticalAlign: 'middle',
                  transition: 'filter 0.2s ease, transform 0.2s ease',
                }}
              />
              <span style={{ fontSize: '10px', opacity: 0.9 }}>↗</span>
            </a>
          </div>
          <span>{t('Life You Deserve — حياة تليق بك', 'حياة تليق بك — Life You Deserve')}</span>
        </div>
      </div>
    </footer>
  )
}
