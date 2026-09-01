import { useState, useEffect } from 'react'
import { useLang } from '../context/LangContext'
import { FadeUp, WordPullUp, Stagger, StaggerItem, ParallaxImage } from '../components/Animate'
import { Phone, Mail, MapPin, MessageCircle, CheckCircle2 } from 'lucide-react'
import type { ContactPrefill } from '../App'

interface ContactProps {
  prefill?: ContactPrefill | null
}

export default function Contact({ prefill }: ContactProps) {
  const { t, isAr } = useLang()
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (prefill) {
      const text = prefill.message || (prefill.subject ? `${prefill.subject}\n\n` : '')
      setForm(prev => ({ ...prev, message: text }))
    }
  }, [prefill])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
  }

  const phoneTel = '+20226000000'
  const phoneFormatted = '+20 (2) 2600 0000'
  const emailAddr = 'info@gardeniadevelopments.com'
  const whatsappNum = '201000000000'
  const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(
    isAr
      ? 'مرحباً، أود الاستفسار بخصوص مشروعات جاردينيا للتطوير العقاري.'
      : 'Hello, I would like to inquire about Gardenia Developments projects.'
  )}`

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
            style={{
              fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
              fontWeight: isAr ? 700 : 300,
              lineHeight: isAr ? 1.25 : 0.9,
              letterSpacing: isAr ? 0 : '-0.01em',
              color: 'var(--petal)',
              fontSize: isAr ? 'clamp(44px, 7.5vw, 84px)' : 'clamp(52px, 8vw, 96px)',
            }}
          />
          <FadeUp delay={0.42}>
            <p className="subtitle">{t("Let's build what's next together.", 'لنبنِ معاً فصلاً جديداً من التميز.')}</p>
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
                <div className="eyebrow" style={{ marginBottom: '32px' }}>
                  <span className="stem"></span>
                  {t('Contact Information', 'معلومات التواصل')}
                </div>
              </FadeUp>
              <Stagger stagger={0.08} className="contact-info">
                {/* Phone */}
                <StaggerItem>
                  <div className="contact-info-item">
                    <div className="contact-info-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Phone size={13} color="var(--gold-deep)" />
                      {t('Phone', 'الهاتف المباشر')}
                    </div>
                    <a
                      href={`tel:${phoneTel}`}
                      className="contact-info-value contact-link"
                      style={{ color: 'var(--ink)', textDecoration: 'none', transition: 'color 0.2s' }}
                    >
                      {phoneFormatted}
                    </a>
                    <div style={{ fontSize: '13px', color: 'rgba(33,31,26,.55)', marginTop: '2px' }}>
                      {t('Sun – Thu, 9am – 6pm', 'الأحد – الخميس، 9ص – 6م')}
                    </div>
                  </div>
                </StaggerItem>

                {/* WhatsApp */}
                <StaggerItem>
                  <div className="contact-info-item">
                    <div className="contact-info-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MessageCircle size={13} color="#22c55e" />
                      {t('Instant WhatsApp', 'واتساب المبيعات')}
                    </div>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-info-value contact-link"
                      style={{ color: '#15803d', textDecoration: 'none', transition: 'color 0.2s' }}
                    >
                      {t('Chat with a Property Consultant', 'تحدث مباشرة مع مستشارك العقاري')} →
                    </a>
                    <div style={{ fontSize: '13px', color: 'rgba(33,31,26,.55)', marginTop: '2px' }}>
                      {t('Instant response available daily', 'استجابة فورية على مدار اليوم')}
                    </div>
                  </div>
                </StaggerItem>

                {/* Email */}
                <StaggerItem>
                  <div className="contact-info-item">
                    <div className="contact-info-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Mail size={13} color="var(--gold-deep)" />
                      {t('Email', 'البريد الإلكتروني')}
                    </div>
                    <a
                      href={`mailto:${emailAddr}`}
                      className="contact-info-value contact-link"
                      style={{ color: 'var(--ink)', textDecoration: 'none', wordBreak: 'break-all', transition: 'color 0.2s' }}
                    >
                      {emailAddr}
                    </a>
                  </div>
                </StaggerItem>

                {/* Sales Office */}
                <StaggerItem>
                  <div className="contact-info-item">
                    <div className="contact-info-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <MapPin size={13} color="var(--gold-deep)" />
                      {t('Sales Office', 'مكتب المبيعات')}
                    </div>
                    <div className="contact-info-value">
                      {t('10th of Ramadan City, Cairo, Egypt', 'العاشر من رمضان، القاهرة، مصر')}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(33,31,26,.55)', marginTop: '2px' }}>
                      {t('Open daily 9am – 8pm', 'مفتوح يومياً 9ص – 8م')}
                    </div>
                  </div>
                </StaggerItem>

                {/* Socials */}
                <StaggerItem>
                  <div className="contact-info-item">
                    <div className="contact-info-label">{t('Follow Us', 'تابعنا')}</div>
                    <div className="social-links">
                      {['Instagram', 'Facebook', 'LinkedIn', 'YouTube'].map(s => (
                        <a key={s} href="#" className="social-link" aria-label={`Gardenia on ${s}`}>{s}</a>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              </Stagger>

              {/* Map area */}
              <FadeUp delay={0.4}>
                <div style={{ marginTop: '48px', borderRadius: '16px', overflow: 'hidden', background: 'var(--cream)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '240px', position: 'relative' }}>
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=450&fit=crop&auto=format"
                    alt="Location map"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
                  />
                  <a
                    href="https://maps.google.com/?q=10th+of+Ramadan+City+Cairo"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      background: 'var(--petal)',
                      padding: '12px 24px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      border: '1px solid var(--line)',
                      textDecoration: 'none',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <MapPin size={15} color="var(--gold-deep)" />
                    {t('View on Google Maps', 'عرض على خرائط Google')} ↗
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* CONTACT FORM */}
            <div>
              <FadeUp>
                <div className="eyebrow" style={{ marginBottom: '32px' }}>
                  <span className="stem"></span>
                  {t('Send a Message', 'أرسل رسالة')}
                </div>
              </FadeUp>

              {submitted ? (
                <FadeUp>
                  <div style={{ padding: '48px 32px', background: 'var(--petal)', borderRadius: 20, border: '1px solid var(--line)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                      <CheckCircle2 size={32} color="#16a34a" />
                      <div style={{ fontFamily: 'var(--font-en-display)', fontSize: '26px', fontWeight: 500 }}>
                        {t('Thank you for reaching out.', 'شكرًا على تواصلك معنا.')}
                      </div>
                    </div>
                    <p style={{ fontSize: '15px', color: 'rgba(33,31,26,.75)', lineHeight: 1.7, marginBottom: 24 }}>
                      {t(
                        "We've received your inquiry and our dedicated team will be in touch with you shortly within one business day.",
                        'تلقّينا رسالتك وسيتواصل معك مستشارك العقاري المختص خلال يوم عمل واحد.'
                      )}
                    </p>
                    <button
                      onClick={() => {
                        setForm({ name: '', email: '', phone: '', message: '' })
                        setSubmitted(false)
                      }}
                      className="pill-btn"
                      style={{ fontSize: 12.5 }}
                    >
                      {t('Send Another Message', 'إرسال رسالة أخرى')}
                    </button>
                  </div>
                </FadeUp>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Stagger stagger={0.08} className="contact-form" delay={0.05}>
                    <StaggerItem>
                      <div className="form-field">
                        <label className="form-label">{t('Full Name', 'الاسم الكامل')} *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder={t('e.g. Karim Mansour', 'مثال: كريم منصور')}
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          required
                        />
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="form-field">
                        <label className="form-label">{t('Email Address', 'البريد الإلكتروني')} *</label>
                        <input
                          type="email"
                          className="form-input"
                          placeholder="name@domain.com"
                          value={form.email}
                          onChange={e => setForm({ ...form, email: e.target.value })}
                          required
                        />
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="form-field">
                        <label className="form-label">{t('Phone Number', 'رقم الهاتف')}</label>
                        <input
                          type="tel"
                          className="form-input"
                          placeholder="+20 1XX XXX XXXX"
                          value={form.phone}
                          onChange={e => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="form-field">
                        <label className="form-label">{t('Message / Inquiry', 'تفاصيل الرسالة أو الاستفسار')} *</label>
                        <textarea
                          className="form-input"
                          placeholder={t('How can our team assist you today?', 'كيف يمكن لفريقنا مساعدتك اليوم؟')}
                          value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })}
                          required
                        />
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <button type="submit" className="form-submit">
                        {t('Send Message', 'إرسال الرسالة')} →
                      </button>
                    </StaggerItem>
                  </Stagger>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

