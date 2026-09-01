import { useLang } from '../context/LangContext'
import { FadeUp, WordPullUp, Stagger, StaggerItem, ImageReveal, ParallaxImage } from '../components/Animate'
import type { Page, ContactPrefill } from '../App'

interface CareersProps {
  onNavigate: (page: Page, prefill?: ContactPrefill) => void
}

const positions = [
  { dept: { en: 'Architecture', ar: 'العمارة' }, title: { en: 'Senior Architect', ar: 'مهندس معماري أول' }, loc: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' }, type: { en: 'Full-time', ar: 'دوام كامل' } },
  { dept: { en: 'Engineering', ar: 'الهندسة' }, title: { en: 'Structural Engineer', ar: 'مهندس إنشائي' }, loc: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' }, type: { en: 'Full-time', ar: 'دوام كامل' } },
  { dept: { en: 'Sales', ar: 'المبيعات' }, title: { en: 'Sales Consultant', ar: 'مستشار مبيعات' }, loc: { en: 'Multiple Locations', ar: 'مواقع متعددة' }, type: { en: 'Full-time', ar: 'دوام كامل' } },
  { dept: { en: 'Landscape Design', ar: 'تصميم المناظر الطبيعية' }, title: { en: 'Landscape Designer', ar: 'مصمم مناظر طبيعية' }, loc: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' }, type: { en: 'Full-time', ar: 'دوام كامل' } },
  { dept: { en: 'Marketing', ar: 'التسويق' }, title: { en: 'Brand & Content Manager', ar: 'مدير العلامة التجارية والمحتوى' }, loc: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' }, type: { en: 'Full-time', ar: 'دوام كامل' } },
  { dept: { en: 'Project Management', ar: 'إدارة المشاريع' }, title: { en: 'Project Manager — Residential', ar: 'مدير مشروع — سكني' }, loc: { en: '10th of Ramadan City', ar: 'العاشر من رمضان' }, type: { en: 'Full-time', ar: 'دوام كامل' } },
  { dept: { en: 'Customer Relations', ar: 'علاقات العملاء' }, title: { en: 'After-Sales Coordinator', ar: 'منسق خدمة ما بعد البيع' }, loc: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' }, type: { en: 'Full-time', ar: 'دوام كامل' } },
  { dept: { en: 'Finance', ar: 'المالية' }, title: { en: 'Financial Analyst', ar: 'محلل مالي' }, loc: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' }, type: { en: 'Full-time', ar: 'دوام كامل' } },
]

export default function Careers({ onNavigate }: CareersProps) {
  const { t, isAr } = useLang()

  const handleApply = (pos: typeof positions[0]) => {
    const jobTitle = isAr ? pos.title.ar : pos.title.en
    const jobDept = isAr ? pos.dept.ar : pos.dept.en
    const subject = isAr
      ? `طلب تقديم لوظيفة: ${jobTitle} (${jobDept})`
      : `Application for: ${jobTitle} (${jobDept})`
    const message = isAr
      ? `مرحباً فريق التوظيف في جاردينيا،\n\nأود التقدم لشغل وظيفة "${jobTitle}" في قسم "${jobDept}".\n\nملخص خبرتي ورقم هاتفي:`
      : `Dear Gardenia Recruitment Team,\n\nI am applying for the position of "${jobTitle}" in the "${jobDept}" department.\n\nSummary of my background and contact number:`
    
    onNavigate('contact', { subject, message })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=2000&h=1200&fit=crop&auto=format"
            alt="Careers at Gardenia"
            strength={100}
            containerStyle={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className="wrap page-hero-content">
          <FadeUp delay={0.1}>
            <div className="eyebrow-label">
              <span className="stem"></span>
              {t('Join Our Team', 'انضم إلى فريقنا')}
            </div>
          </FadeUp>
          <WordPullUp
            text={t('Careers', 'الوظائف')}
            tag="h1"
            delay={0.2}
            stagger={0.1}
            style={{
              fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
              fontWeight: isAr ? 700 : 300,
              lineHeight: isAr ? 1.25 : 0.9,
              letterSpacing: isAr ? 0 : '-0.01em',
              color: 'var(--petal)',
              fontSize: isAr ? 'clamp(44px, 7.5vw, 84px)' : 'clamp(52px, 8vw, 96px)',
            }}
          />
          <FadeUp delay={0.4}>
            <p className="subtitle">{t('Build the future with us.', 'ابنِ المستقبل معنا.')}</p>
          </FadeUp>
        </div>
      </section>

      <section className="careers-page">
        <div className="wrap">

          {/* WHY WORK WITH US */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '110px' }}>
            <div>
              <FadeUp>
                <div className="eyebrow" style={{ marginBottom: '24px' }}>
                  <span className="stem"></span>
                  {t('Why Work With Us', 'لماذا تعمل معنا')}
                </div>
              </FadeUp>
              <WordPullUp
                text={t('Shape the places people call home.', 'شكّل الأماكن التي يسميها الناس بيتًا.')}
                delay={0.12}
                style={{
                  fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                  fontWeight: isAr ? 700 : 300,
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  lineHeight: isAr ? 1.25 : 1.1,
                  letterSpacing: isAr ? 0 : '-0.01em',
                  color: 'var(--ink)',
                  maxWidth: '14ch',
                }}
              />
            </div>
            <Stagger stagger={0.1} delay={0.1}>
              {[
                { en: ['Meaningful Work', 'Every project you touch will house real families and shape real communities.'], ar: ['عمل ذو معنى', 'كل مشروع تعمل عليه سيضم عائلات حقيقية ويشكّل مجتمعات حقيقية.'] },
                { en: ['Growth Culture', 'We invest in your development — through mentorship, training, and real responsibility.'], ar: ['ثقافة النمو', 'نستثمر في تطويرك — من خلال الإرشاد والتدريب والمسؤولية الحقيقية.'] },
                { en: ['Collaborative Teams', 'Cross-disciplinary collaboration is at the core of how we design and deliver.'], ar: ['فرق تعاونية', 'التعاون متعدد التخصصات هو جوهر طريقة تصميمنا وتنفيذنا.'] },
              ].map((item, i) => (
                <StaggerItem key={i}>
                  <div style={{ padding: '20px 0', borderBottom: '1px solid var(--line)' }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>{t(item.en[0], item.ar[0])}</div>
                    <div style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(33,31,26,.65)' }}>{t(item.en[1], item.ar[1])}</div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* OUR CULTURE */}
          <FadeUp>
            <div className="eyebrow" style={{ marginBottom: '16px' }}>
              <span className="stem"></span>
              {t('Our Culture', 'ثقافتنا')}
            </div>
          </FadeUp>
          <WordPullUp
            text={t('Life at Gardenia', 'الحياة في جاردينيا')}
            tag="h2"
            delay={0.1}
            style={{
              fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
              fontSize: isAr ? '28px' : '32px',
              fontWeight: isAr ? 700 : 400,
              lineHeight: isAr ? 1.3 : 1.15,
              marginBottom: '48px',
            }}
          />
          <Stagger stagger={0.12} className="culture-grid">
            {[
              { img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop&auto=format', label: { en: 'Studio & Design Culture', ar: 'ثقافة الاستوديو والتصميم' } },
              { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=500&fit=crop&auto=format', label: { en: 'On-Site Experience', ar: 'التجربة الميدانية' } },
              { img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&h=500&fit=crop&auto=format', label: { en: 'Collaborative Spirit', ar: 'روح التعاون' } },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="culture-card">
                  <img src={item.img} alt={item.label.en} style={{ transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} />
                  <div className="culture-card-label">{t(item.label.en, item.label.ar)}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* OPEN POSITIONS */}
          <div style={{ marginTop: '110px' }}>
            <FadeUp>
              <div className="eyebrow" style={{ marginBottom: '16px' }}>
                <span className="stem"></span>
                {t('Open Positions', 'الوظائف المتاحة')}
              </div>
            </FadeUp>
            <WordPullUp
              text={t('Join us. Shape communities.', 'انضم إلينا. شكّل مجتمعات.')}
              tag="h2"
              delay={0.1}
              style={{
                fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                fontSize: isAr ? '28px' : '32px',
                fontWeight: isAr ? 700 : 400,
                lineHeight: isAr ? 1.3 : 1.15,
                marginBottom: '8px',
              }}
            />
            <FadeUp delay={0.22}>
              <p style={{ fontSize: '15px', color: 'rgba(33,31,26,.65)', marginBottom: '0' }}>
                {t(
                  "We're always looking for talented individuals to join our team.",
                  'نحن دائمًا نبحث عن أفراد موهوبين للانضمام إلى فريقنا.'
                )}
              </p>
            </FadeUp>
            <Stagger stagger={0.06} delay={0.1} className="positions-list">
              {positions.map((pos, i) => (
                <StaggerItem key={i}>
                  <div className="position-item" onClick={() => handleApply(pos)}>
                    <div className="position-meta">
                      <div className="position-title">{t(pos.title.en, pos.title.ar)}</div>
                      <div className="position-dept">{t(pos.dept.en, pos.dept.ar)}</div>
                    </div>
                    <div className="position-tags">
                      <span className="position-tag">{t(pos.loc.en, pos.loc.ar)}</span>
                      <span className="position-tag">{t(pos.type.en, pos.type.ar)}</span>
                    </div>
                    <div className="position-actions">
                      <button
                        className="pill-btn"
                        style={{ background: 'transparent', color: 'var(--ink)', border: '1px solid var(--line)', padding: '10px 18px', fontSize: '12px' }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleApply(pos)
                        }}
                      >
                        {t('Apply Now', 'تقدّم الآن')} →
                      </button>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

        </div>
      </section>
    </>
  )
}

