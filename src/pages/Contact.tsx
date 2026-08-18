import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { FadeUp, WordPullUp, Stagger, StaggerItem, ParallaxImage } from '../components/Animate'

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=2000&h=1200&fit=crop&auto=format"
            alt="Contact Gardenia"
            strength={100}
            containerStyle={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className="wrap page-hero-content">
          <FadeUp delay={0.1}>
            <div className="eyebrow-label">
              <span className="stem"></span>
              {t('Reach Out', 'تواصل معنا')}
            </div>
          </FadeUp>
          <WordPullUp
            text={t('Contact Us', 'تواصل معنا')}
            tag="h1"
            delay={0.2}
            stagger={0.09}
            style={{ fontFamily: 'var(--font-en-display)', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.01em', color: 'var(--petal)', fontSize: 'clamp(52px, 8vw, 96px)' }}
          />
          <FadeUp delay={0.42}>
            <p className="subtitle">{t("Let's build what's next.", 'لنبنِ ما هو قادم.')}</p>
          </FadeUp>
        </div>
      </section>

      {/* CONTACT BODY */}
      <section className="contact-page">
        <div className="wrap">
          <div className="contact-grid">

            {/* CONTACT INFO */}
            <div>
              <FadeUp>
                <div className="eyebrow" style={{ marginBottom: '40px' }}>
                  <span className="stem"></span>
                  {t('Contact Information', 'معلومات التواصل')}
                </div>
              </FadeUp>
              <Stagger stagger={0.1} className="contact-info">
                {[
                  {
                    label: { en: 'Phone', ar: 'الهاتف' },
                    value: '+20 (2) 2600 0000',
                    sub: { en: 'Sun – Thu, 9am – 6pm', ar: 'الأحد – الخميس، 9ص – 6م' },
                  },
                  {
                    label: { en: 'Email', ar: 'البريد الإلكتروني' },
                    value: 'info@gardeniadevelopments.com',
                    sub: null,
                  },
                  {
                    label: { en: 'Sales Office', ar: 'مكتب المبيعات' },
                    value: t('10th of Ramadan City, Cairo, Egypt', 'العاشر من رمضان، القاهرة، مصر'),
                    sub: { en: 'Open daily 9am – 8pm', ar: 'مفتوح يومياً 9ص – 8م' },
                  },
                ].map((item, i) => (
                  <StaggerItem key={i}>
                    <div className="contact-info-item">
                      <div className="contact-info-label">{t(item.label.en, item.label.ar)}</div>
                      <div className="contact-info-value">{item.value}</div>
                      {item.sub && (
                        <div style={{ fontSize: '13px', color: 'rgba(33,31,26,.55)', marginTop: '4px' }}>
                          {t(item.sub.en, item.sub.ar)}
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                ))}

                <StaggerItem>
                  <div className="contact-info-item">
                    <div className="contact-info-label">{t('Follow Us', 'تابعنا')}</div>
                    <div className="social-links">
                      {['Instagram', 'Facebook', 'LinkedIn', 'YouTube'].map(s => (
                        <a key={s} href="#" className="social-link">{s}</a>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>

              {/* Map area */}
              <FadeUp delay={0.4}>
                <div style={{ marginTop: '56px', borderRadius: '16px', overflow: 'hidden', background: 'var(--cream)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '260px', position: 'relative' }}>
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=450&fit=crop&auto=format"
                    alt="Location map"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                  />
                  <div style={{ position: 'relative', zIndex: 2, background: 'var(--petal)', padding: '12px 20px', borderRadius: '999px', fontSize: '13px', fontWeight: 500, border: '1px solid var(--line)' }}>
                    {t('10th of Ramadan City, Cairo', 'العاشر من رمضان، القاهرة')}
                  </div>
                </div>
              </FadeUp>
            </div>

            {/* CONTACT FORM */}
            <div>
              <FadeUp>
                <div className="eyebrow" style={{ marginBottom: '40px' }}>
                  <span className="stem"></span>
                  {t('Send a Message', 'أرسل رسالة')}
                </div>
              </FadeUp>

              {submitted ? (
                <FadeUp>
                  <div style={{ padding: '48px 0' }}>
                    <div style={{ fontFamily: 'var(--font-en-display)', fontSize: '28px', fontWeight: 400, marginBottom: '16px' }}>
                      {t('Thank you for reaching out.', 'شكرًا على تواصلك.')}
                    </div>
                    <p style={{ fontSize: '15px', color: 'rgba(33,31,26,.65)', lineHeight: 1.7 }}>
                      {t(
                        "We've received your message and our team will be in touch within one business day.",
                        'تلقّينا رسالتك وسيتواصل معك فريقنا خلال يوم عمل واحد.'
                      )}
                    </p>
                  </div>
                </FadeUp>
              ) : (
                <Stagger stagger={0.08} className="contact-form" delay={0.05}>
                  <StaggerItem>
                    <div className="form-field">
                      <label className="form-label">{t('Full Name', 'الاسم الكامل')}</label>
                      <input type="text" className="form-input" placeholder={t('Your name', 'اسمك')} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="form-field">
                      <label className="form-label">{t('Email Address', 'البريد الإلكتروني')}</label>
                      <input type="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="form-field">
                      <label className="form-label">{t('Phone Number', 'رقم الهاتف')}</label>
                      <input type="tel" className="form-input" placeholder="+20 1XX XXX XXXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <div className="form-field">
                      <label className="form-label">{t('Message', 'رسالتك')}</label>
                      <textarea className="form-input" placeholder={t('How can we help you?', 'كيف يمكننا مساعدتك؟')} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                    </div>
                  </StaggerItem>
                  <StaggerItem>
                    <button type="submit" className="form-submit" onClick={handleSubmit}>
                      {t('Send Message', 'إرسال الرسالة')}
                    </button>
                  </StaggerItem>
                </Stagger>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
