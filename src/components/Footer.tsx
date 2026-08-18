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
            <div className="logo">{t('GARDENIA', 'جاردينيا')}</div>
            <p>
              {t(
                'A real estate developer building modern communities across Egypt, rooted in gardens, comfort, and considered design.',
                'مطوّر عقاري بيبني مجتمعات عصرية في مصر، جذورها في الحدائق والراحة والتصميم المدروس.'
              )}
            </p>
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
            <h4>{t('Legal', 'قانوني')}</h4>
            <a href="#">{t('Privacy Policy', 'سياسة الخصوصية')}</a>
            <a href="#">{t('Terms & Conditions', 'الشروط والأحكام')}</a>
            <h4 style={{ marginTop: '28px' }}>{t('Follow', 'تابعنا')}</h4>
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>{t('© 2026 Gardenia Developments. All rights reserved.', '© 2026 جاردينيا للتطوير العقاري، جميع الحقوق محفوظة')}</span>
          <span>{t('Egypt\'s Premier Real Estate Developer', 'مطوّر عقاري رائد في مصر')}</span>
        </div>
      </div>
    </footer>
  )
}
