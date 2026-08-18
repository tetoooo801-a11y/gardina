import { useRef, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../context/LangContext'
const gardeniaImg = '/gardenia-hero.png'

type Page = 'home' | 'about' | 'projects' | 'careers' | 'contact'

interface GardeniaHeroProps {
  onNavigate: (page: Page) => void
}

/* Monospaced micro-label (MekaVerse token aesthetic) */
function MicroLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontFamily: 'var(--font-en-body)',
      fontSize: '10px',
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: 'rgba(225,220,200,0.55)',
      fontWeight: 500,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* Hairline divider */
function Hairline({ style }: { style?: React.CSSProperties }) {
  return <div style={{ height: '1px', background: 'rgba(225,220,200,0.2)', ...style }} />
}

export default function GardeniaHero({ onNavigate }: GardeniaHeroProps) {
  const { t, lang } = useLang()
  const isAr = lang === 'ar'
  const containerRef = useRef<HTMLDivElement>(null)
  const [scene, setScene] = useState(1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  /* ── Track scene number ── */
  useMotionValueEvent(scrollYProgress, 'change', v => {
    if (v < 0.20) setScene(1)
    else if (v < 0.38) setScene(2)
    else if (v < 0.56) setScene(3)
    else if (v < 0.73) setScene(4)
    else if (v < 0.88) setScene(5)
    else setScene(6)
  })

  /* ── IMAGE — continuous zoom + subtle drift ── */
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.32])
  const imgY     = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const imgX     = useTransform(scrollYProgress,
    [0,    0.3,   0.55,  0.75,  1],
    ['0%', '2%', '-1%', '1%', '0%']
  )

  /* ── COLOR GRADE OVERLAYS per scene ── */
  // S1 — deep green tint
  const ov1 = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.28], [0.55, 0.42, 0.42, 0])
  // S3 — tighten (near transparent, reveal detail)
  const ov3 = useTransform(scrollYProgress, [0.36, 0.46, 0.56, 0.64], [0, 0.15, 0.15, 0])
  // S4 — warm amber
  const ov4 = useTransform(scrollYProgress, [0.56, 0.64, 0.76, 0.84], [0, 0.45, 0.45, 0])
  // S5/6 — dark close for statement + CTA
  const ovDark = useTransform(scrollYProgress, [0.72, 0.86], [0, 0.68])

  // Persistent bottom gradient opacity (always on, intensifies)
  const botGrad = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 0.75, 0.9])

  /* ── HERO FADE-OUT at very end ── */
  const heroOp = useTransform(scrollYProgress, [0.96, 1.0], [1, 0])

  /* ── PROGRESS BAR ── */
  const progressW = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  /* ── SCROLL ARROW fades out after scene 1 ── */
  const arrowOp = useTransform(scrollYProgress, [0, 0.06, 0.18], [1, 1, 0])

  /* ── SCENE TEXT OPACITIES & Y ── */
  const s1Op = useTransform(scrollYProgress, [0.00, 0.06, 0.16, 0.26], [0, 1, 1, 0])
  const s2Op = useTransform(scrollYProgress, [0.20, 0.27, 0.36, 0.46], [0, 1, 1, 0])
  const s3Op = useTransform(scrollYProgress, [0.40, 0.47, 0.56, 0.64], [0, 1, 1, 0])
  const s4Op = useTransform(scrollYProgress, [0.58, 0.64, 0.74, 0.82], [0, 1, 1, 0])
  const s5Op = useTransform(scrollYProgress, [0.76, 0.82, 0.90, 0.96], [0, 1, 1, 0])
  const s6Op = useTransform(scrollYProgress, [0.88, 0.93, 0.99, 1.00], [0, 1, 1, 0])

  const s1Y = useTransform(scrollYProgress, [0.00, 0.26], ['18px', '-10px'])
  const s2Y = useTransform(scrollYProgress, [0.20, 0.46], ['18px', '-10px'])
  const s3Y = useTransform(scrollYProgress, [0.40, 0.64], ['18px', '-10px'])
  const s4Y = useTransform(scrollYProgress, [0.58, 0.82], ['18px', '-10px'])
  const s5Y = useTransform(scrollYProgress, [0.76, 0.96], ['18px', '-10px'])
  const s6Y = useTransform(scrollYProgress, [0.88, 1.00], ['18px', '-10px'])

  const sOp = [s1Op, s2Op, s3Op, s4Op, s5Op, s6Op]
  const sY  = [s1Y,  s2Y,  s3Y,  s4Y,  s5Y,  s6Y]

  const nav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0 })
  }

  const petal = '#E8E4D8'

  return (
    /* ── SCROLL CONTAINER — 300vh tall ── */
    <div ref={containerRef} style={{ height: '300vh', position: 'relative' }}>

      {/* ── STICKY VIEWPORT ── */}
      <motion.div style={{
        position: 'sticky', top: 0,
        height: '100svh', overflow: 'hidden',
        background: '#0b1510',
        opacity: heroOp,
      }}>

        {/* ════════════════════════════════
            BASE IMAGE — single photo, continuous motion
        ════════════════════════════════ */}
        <motion.div style={{
          position: 'absolute', inset: '-8%',
          scale: imgScale, x: imgX, y: imgY,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}>
          <img
            src={gardeniaImg}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 42%' }}
            loading="eager"
          />
        </motion.div>

        {/* ════════════════════════════════
            OVERLAYS
        ════════════════════════════════ */}

        {/* Persistent bottom vignette */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(8,14,8,0.52) 0%, transparent 28%, transparent 52%, rgba(6,12,6,0.88) 100%)',
          opacity: botGrad,
        }} />

        {/* S1 green tint */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'rgba(15,35,18,1)', opacity: ov1,
        }} />

        {/* S3 detail — slightly lighter, reveal facade */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'rgba(8,12,8,1)', opacity: ov3,
        }} />

        {/* S4 warm amber tint for lifestyle */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'rgba(60,30,0,1)', opacity: ov4,
        }} />

        {/* S5/6 dark close for editorial text */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'rgba(6,12,6,1)', opacity: ovDark,
        }} />

        {/* Noise grain */}
        <div className="gardenia-noise" style={{
          position: 'absolute', inset: 0, zIndex: 4,
          opacity: 0.45, mixBlendMode: 'overlay', pointerEvents: 'none',
        }} />

        {/* Scene counter top right */}
        <div style={{ position: 'absolute', top: 28, right: 32, zIndex: 30 }}>
          <MicroLabel>
            {String(scene).padStart(2, '0')} / 06
          </MicroLabel>
        </div>

        {/* ════════════════════════════════
            SCENE 01 — ESTABLISHING SHOT
            Wide view, brand name, minimal
        ════════════════════════════════ */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '0 56px 72px',
          opacity: sOp[0], y: sY[0], pointerEvents: 'none',
        }}>
          <MicroLabel style={{ marginBottom: 20, color: 'rgba(184,144,90,0.85)' }}>
            {t('Gardenia Developments · Egypt · Est. 2015', 'جاردينيا للتطوير العقاري · مصر')}
          </MicroLabel>
          <h1 style={{
            fontFamily: 'var(--font-en-display)',
            fontWeight: 300, lineHeight: 0.86,
            letterSpacing: '-0.04em',
            color: petal,
            fontSize: 'clamp(80px, 16vw, 220px)',
            margin: 0,
          }}>
            {t('Gardenia', 'جاردينيا')}
          </h1>
          <Hairline style={{ margin: '28px 0 20px', maxWidth: 480 }} />
          <p style={{
            fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
            fontSize: '13px', letterSpacing: '0.04em',
            color: 'rgba(225,220,200,0.7)',
            maxWidth: '38ch', lineHeight: 1.6, margin: 0,
          }}>
            {t(
              'Building modern communities, rooted in nature.',
              'نبني مجتمعات عصرية، جذورها في الطبيعة.'
            )}
          </p>
        </motion.div>

        {/* ════════════════════════════════
            SCENE 02 — APPROACH
            Camera moves toward the building
        ════════════════════════════════ */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', textAlign: 'center',
          padding: '0 40px',
          opacity: sOp[1], y: sY[1], pointerEvents: 'none',
        }}>
          <MicroLabel style={{ marginBottom: 32, color: 'rgba(184,144,90,0.75)' }}>
            {t('Approaching the development', 'الاقتراب من المشروع')}
          </MicroLabel>
          <div style={{
            fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
            fontWeight: isAr ? 700 : 300,
            fontSize: 'clamp(36px, 6vw, 80px)',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            color: petal, maxWidth: '14ch',
          }}>
            {t(
              'Where architecture meets the landscape.',
              'حيث تلتقي العمارة بالطبيعة.'
            )}
          </div>
        </motion.div>

        {/* ════════════════════════════════
            SCENE 03 — ARCHITECTURAL DETAIL
            Facade / entrance / materials
        ════════════════════════════════ */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: '0 56px 80px',
          opacity: sOp[2], y: sY[2], pointerEvents: 'none',
        }}>
          <div style={{ maxWidth: 360, textAlign: isAr ? 'left' : 'right' }}>
            <MicroLabel style={{ marginBottom: 16, color: 'rgba(184,144,90,0.85)' }}>
              {t('Facade · Natural Stone + Timber Louvers', 'الواجهة · حجر طبيعي + مصاريع خشبية')}
            </MicroLabel>
            <Hairline style={{ marginBottom: 20 }} />
            <p style={{
              fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
              fontSize: '14px', lineHeight: 1.65,
              color: 'rgba(225,220,200,0.82)', margin: 0,
            }}>
              {t(
                'Every facade is composed of natural travertine, warm timber louvers, and floor-to-ceiling glazing — materials chosen for how they age in the Egyptian climate.',
                'كل واجهة مُركّبة من حجر التراورتين الطبيعي والمصاريع الخشبية الدافئة والزجاج من الأرض للسقف — مواد اختيرت لكيفية تقادمها في المناخ المصري.'
              )}
            </p>
          </div>
        </motion.div>

        {/* ════════════════════════════════
            SCENE 04 — LIFESTYLE
            Environment + atmosphere
        ════════════════════════════════ */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '0 56px',
          opacity: sOp[3], y: sY[3], pointerEvents: 'none',
        }}>
          <MicroLabel style={{ marginBottom: 24, color: 'rgba(184,144,90,0.75)' }}>
            {t('Community · Gardens · Landscape', 'المجتمع · الحدائق · المناظر الطبيعية')}
          </MicroLabel>
          <div style={{
            fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
            fontWeight: isAr ? 700 : 300,
            fontSize: 'clamp(32px, 5.5vw, 72px)',
            lineHeight: 1.0, letterSpacing: '-0.02em',
            color: petal, maxWidth: '13ch',
          }}>
            {t('Life, surrounded by nature.', 'حياة محاطة بالطبيعة.')}
          </div>
          <div style={{ display: 'flex', gap: 48, marginTop: 40 }}>
            {[
              { num: '340+', en: 'Residences', ar: 'وحدة سكنية' },
              { num: '60%', en: 'Green Space', ar: 'مساحة خضراء' },
              { num: '12', en: 'Buildings', ar: 'مبنى' },
            ].map(s => (
              <div key={s.num}>
                <div style={{ fontFamily: 'var(--font-en-display)', fontSize: '28px', fontWeight: 400, color: petal, lineHeight: 1 }}>
                  {s.num}
                </div>
                <MicroLabel style={{ marginTop: 6 }}>{t(s.en, s.ar)}</MicroLabel>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════
            SCENE 05 — PROJECT STATEMENT
            Large editorial typography
        ════════════════════════════════ */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          alignItems: 'center', textAlign: 'center',
          padding: '0 48px',
          opacity: sOp[4], y: sY[4], pointerEvents: 'none',
        }}>
          <MicroLabel style={{ marginBottom: 36, color: 'rgba(184,144,90,0.7)' }}>
            {t('A developer that plants roots, not just buildings', 'مطوّر يزرع جذوراً، لا مجرد مبانٍ')}
          </MicroLabel>
          <div style={{
            fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
            fontWeight: isAr ? 700 : 300,
            fontSize: 'clamp(28px, 5vw, 68px)',
            lineHeight: 1.05, letterSpacing: '-0.025em',
            color: petal, maxWidth: '16ch',
          }}>
            {t(
              'Nine years. Five communities. 3,400 families home.',
              'تسع سنوات. خمسة مجتمعات. 3,400 عائلة في بيتها.'
            )}
          </div>
          <Hairline style={{ width: 80, margin: '36px auto 0' }} />
        </motion.div>

        {/* ════════════════════════════════
            SCENE 06 — CTA
            Final reveal before next section
        ════════════════════════════════ */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          padding: '0 56px 80px',
          opacity: sOp[5], y: sY[5],
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'flex-end' }}>
            <div>
              <MicroLabel style={{ marginBottom: 20, color: 'rgba(184,144,90,0.75)' }}>
                {t('Gardenia Developments', 'جاردينيا للتطوير العقاري')}
              </MicroLabel>
              <div style={{
                fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                fontWeight: isAr ? 700 : 300,
                fontSize: 'clamp(32px, 4.5vw, 60px)',
                lineHeight: 1.0, letterSpacing: '-0.02em',
                color: petal,
              }}>
                {t('Begin your journey.', 'ابدأ رحلتك.')}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-end' }}>
              <button
                onClick={() => nav('projects')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 12,
                  background: petal, color: '#0b1510',
                  borderRadius: '999px', border: 'none', cursor: 'pointer',
                  padding: '14px 24px', fontSize: '13px', fontWeight: 600,
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  letterSpacing: '0.03em', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                {t('Explore Projects', 'استكشف المشاريع')}
                <span style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#0b1510', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ArrowRight size={14} color={petal} />
                </span>
              </button>
              <button
                onClick={() => nav('contact')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', color: 'rgba(225,220,200,0.75)',
                  border: '1px solid rgba(225,220,200,0.25)',
                  borderRadius: '999px', cursor: 'pointer',
                  padding: '12px 22px', fontSize: '12px', fontWeight: 500,
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  letterSpacing: '0.04em', transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = petal; el.style.borderColor = 'rgba(225,220,200,0.5)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = 'rgba(225,220,200,0.75)'; el.style.borderColor = 'rgba(225,220,200,0.25)'
                }}
              >
                {t('Get In Touch', 'تواصل معنا')}
              </button>
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════
            PERSISTENT UI CHROME
        ════════════════════════════════ */}

        {/* Scroll indicator — fades after scene 1 */}
        <motion.div style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20, display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 8,
          opacity: arrowOp, pointerEvents: 'none',
        }}>
          <MicroLabel style={{ color: 'rgba(225,220,200,0.5)' }}>{t('Scroll', 'مرر')}</MicroLabel>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'rgba(225,220,200,0.45)', fontSize: 16 }}
          >
            ↓
          </motion.div>
        </motion.div>

        {/* Progress bar — bottom edge */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '2px', background: 'rgba(225,220,200,0.08)', zIndex: 25,
        }}>
          <motion.div style={{
            height: '100%', background: 'var(--gold)',
            width: progressW, transformOrigin: 'left',
          }} />
        </div>

        {/* Scene label — bottom right above progress */}
        <div style={{
          position: 'absolute', bottom: 14, right: 32, zIndex: 24,
        }}>
          <MicroLabel>
            {[
              t('Establishing', 'المشهد الأول'),
              t('Approach', 'الاقتراب'),
              t('Detail', 'التفصيل'),
              t('Lifestyle', 'أسلوب الحياة'),
              t('Statement', 'البيان'),
              t('Discover', 'اكتشف'),
            ][scene - 1]}
          </MicroLabel>
        </div>

      </motion.div>
    </div>
  )
}
