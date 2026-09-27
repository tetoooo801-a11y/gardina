import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, X } from 'lucide-react'
import { useLang } from '../context/LangContext'

export default function QuickContact() {
  const { isAr, t } = useLang()
  const [isOpen, setIsOpen] = useState(false)

  // Official Gardenia contact coordinates
  const phoneFormatted = '17994'
  const phoneTel = '17994'
  const mobileFormatted = '01050176306'
  const whatsappNumber = '201050176306' // Official WhatsApp & Mobile
  const whatsappMsgEn = encodeURIComponent('Hello Gardenia Heights Developments, I would like to enquire about your projects.')
  const whatsappMsgAr = encodeURIComponent('مرحباً جاردينيا هايتس للتطوير العقاري، أود الاستفسار عن مشروعاتكم وتوافر الوحدات.')
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${isAr ? whatsappMsgAr : whatsappMsgEn}`

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 28,
        [isAr ? 'left' : 'right']: 28,
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: isAr ? 'flex-start' : 'flex-end',
        gap: 12,
        fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
      }}
    >
      {/* Expanded Quick Contact Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.94 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            style={{
              background: 'rgba(12, 22, 14, 0.94)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(225, 220, 200, 0.16)',
              borderRadius: 20,
              padding: '20px 22px',
              width: 290,
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)',
              color: 'var(--petal)',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600 }}>
                  {t('Direct Sales', 'المبيعات المباشرة')}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, marginTop: 2 }}>
                  {t('Connect With Us', 'تحدث مع مستشارك العقاري')}
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'rgba(225, 220, 200, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(225, 220, 200, 0.7)',
                  cursor: 'pointer',
                  border: 'none',
                }}
              >
                <X size={15} />
              </button>
            </div>

            <p style={{ fontSize: 12.5, lineHeight: 1.5, color: 'rgba(225, 220, 200, 0.75)', margin: 0 }}>
              {t(
                'Our property specialists are available to answer your inquiries and book site tours.',
                'فريقنا متاح للرد الفوري على استفساراتك وحجز جولات المعاينة الميدانية.'
              )}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* WhatsApp Action */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'rgba(37, 211, 102, 0.15)',
                  border: '1px solid rgba(37, 211, 102, 0.35)',
                  padding: '11px 16px',
                  borderRadius: 12,
                  color: '#4ade80',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 600,
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(37, 211, 102, 0.25)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(37, 211, 102, 0.15)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <MessageCircle size={17} />
                <span>{t(`WhatsApp: ${mobileFormatted}`, `واتساب: ${mobileFormatted}`)}</span>
              </a>

              {/* Direct Call Action */}
              <a
                href={`tel:${phoneTel}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  background: 'rgba(184, 144, 90, 0.15)',
                  border: '1px solid rgba(184, 144, 90, 0.35)',
                  padding: '11px 16px',
                  borderRadius: 12,
                  color: 'var(--gold)',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 600,
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(184, 144, 90, 0.25)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(184, 144, 90, 0.15)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <Phone size={16} />
                <span>{t(`Hotline: ${phoneFormatted}`, `الخط الساخن: ${phoneFormatted}`)}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button (Compact Circular) */}
      <motion.button
        onClick={() => setIsOpen(v => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        title={t('Sales Inquiry', 'تواصل مع المبيعات')}
        aria-label={t('Sales Inquiry', 'تواصل مع المبيعات')}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          background: 'linear-gradient(135deg, #25382B 0%, #152419 100%)',
          color: 'var(--gold)',
          border: '1.5px solid rgba(212, 175, 55, 0.48)',
          borderRadius: '50%',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), 0 0 14px rgba(212, 175, 55, 0.22)',
          cursor: 'pointer',
          padding: 0,
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      >
        {isOpen ? (
          <X size={20} style={{ color: 'var(--gold)' }} />
        ) : (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'var(--gold)',
              color: '#152419',
            }}
          >
            <MessageCircle size={17} />
          </span>
        )}

        {/* Live Active Status Indicator */}
        <span
          style={{
            position: 'absolute',
            top: 1,
            [isAr ? 'left' : 'right']: 1,
            width: 11,
            height: 11,
            borderRadius: '50%',
            background: '#22c55e',
            border: '2px solid #152419',
            boxShadow: '0 0 8px #22c55e',
            display: 'inline-block',
          }}
        />
      </motion.button>
    </div>
  )
}
