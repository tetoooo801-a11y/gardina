import { useLang } from '../context/LangContext'
import { FadeUp, WordPullUp, Stagger, StaggerItem, ImageReveal, ParallaxImage } from '../components/Animate'

type Page = 'home' | 'about' | 'projects' | 'careers' | 'contact'

interface AboutProps {
  onNavigate: (page: Page) => void
}

export default function About({ onNavigate }: AboutProps) {
  const { t, isAr } = useLang()

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2000&h=1200&fit=crop&auto=format"
            alt="About Gardenia"
            strength={100}
            containerStyle={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className="wrap page-hero-content">
          <FadeUp delay={0.1}>
            <div className="eyebrow-label">
              <span className="stem"></span>
              {t('About Us', 'من نحن')}
            </div>
          </FadeUp>
          <WordPullUp
            text={t('About Gardenia', 'عن جاردينيا')}
            tag="h1"
            delay={0.2}
            stagger={0.08}
            style={{
              fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
              fontWeight: isAr ? 700 : 300,
              lineHeight: isAr ? 1.25 : 0.9,
              letterSpacing: isAr ? 0 : '-0.01em',
              color: 'var(--petal)',
              fontSize: isAr ? 'clamp(44px, 7.5vw, 84px)' : 'clamp(52px, 8vw, 96px)',
            }}
          />
          <FadeUp delay={0.45}>
            <p className="subtitle">
              {t(
                'A real estate developer committed to creating communities that last generations.',
                'مطوّر عقاري ملتزم بإنشاء مجتمعات تدوم لأجيال.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="about-page-section">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-text">
              <FadeUp>
                <div className="eyebrow">
                  <span className="stem"></span>
                  {t('Who We Are', 'من نحن')}
                </div>
              </FadeUp>
              <WordPullUp
                text={t('More than a developer — a community builder.', 'أكتر من مطوّر — بنّاء مجتمعات')}
                tag="h2"
                delay={0.12}
                style={{
                  fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                  fontWeight: isAr ? 700 : 400,
                  fontSize: isAr ? '34px' : '38px',
                  lineHeight: isAr ? 1.3 : 1.18,
                  margin: '16px 0 22px',
                }}
              />
              <FadeUp delay={0.28}>
                <p>
                  {t(
                    'Gardenia Developments was founded on a simple conviction: that the best communities grow from the ground up. We are architects, engineers, urban planners, and people who believe that where you live shapes who you become.',
                    'جاردينيا للتطوير العقاري اتأسست على قناعة بسيطة: إن أفضل المجتمعات بتنمو من تحت لفوق. إحنا معماريين ومهندسين ومخططين عمرانيين وناس بتؤمن إن المكان اللي تعيش فيه بيشكّل مين هتبقى.'
                  )}
                </p>
              </FadeUp>
              <FadeUp delay={0.38}>
                <p>
                  {t(
                    'Every project we design is a long-term commitment — to our residents, to the surrounding environment, and to Egypt\'s urban future.',
                    'كل مشروع بنصممه هو التزام طويل المدى — لسكاننا، للبيئة المحيطة، ولمستقبل التحضر في مصر.'
                  )}
                </p>
              </FadeUp>
            </div>
            <ImageReveal
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=900&h=700&fit=crop&auto=format"
              alt="Gardenia community"
              delay={0.15}
              className="about-img"
            />
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section style={{ padding: '0 0 110px', background: 'var(--petal)' }}>
        <div className="wrap">
          <div className="story-grid">
            <ImageReveal
              src="https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=700&h=900&fit=crop&auto=format"
              alt="Our story"
              delay={0}
              className="story-img"
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
              <FadeUp>
                <div className="eyebrow">
                  <span className="stem"></span>
                  {t('Our Story', 'قصتنا')}
                </div>
              </FadeUp>
              <WordPullUp
                text={t('Built from a single idea. Grown into a movement.', 'بُنيت من فكرة واحدة. نمت لتصبح حركة.')}
                delay={0.1}
                style={{
                  fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                  fontWeight: isAr ? 700 : 300,
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  lineHeight: isAr ? 1.25 : 1.1,
                  letterSpacing: isAr ? 0 : '-0.01em',
                  color: 'var(--ink)',
                  maxWidth: '16ch',
                }}
              />
              <FadeUp delay={0.32}>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(33,31,26,.75)', maxWidth: '44ch' }}>
                  {t(
                    'Founded over nine years ago with a commitment to quality and community, Gardenia began with a single residential project in 10th of Ramadan City. Since then, we\'ve delivered 12 projects, housing more than 3,400 families across Egypt.',
                    'تأسست منذ أكثر من تسع سنوات بالتزام بالجودة والمجتمع، بدأت جاردينيا بمشروع سكني واحد في العاشر من رمضان. منذ ذلك الحين، أنجزنا 12 مشروعًا يضم أكثر من 3,400 عائلة في جميع أنحاء مصر.'
                  )}
                </p>
              </FadeUp>
              <FadeUp delay={0.44}>
                <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(33,31,26,.75)', maxWidth: '44ch' }}>
                  {t(
                    'Each project taught us something new — about materials, about people, about what it means to build a home that endures.',
                    'كل مشروع علّمنا شيئًا جديدًا — عن المواد، عن الناس، عن معنى بناء منزل يصمد.'
                  )}
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="approach" style={{ padding: '110px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <FadeUp delay={0}>
              <div>
                <div className="eyebrow on-dark" style={{ marginBottom: '24px' }}>
                  <span className="stem"></span>
                  {t('Our Vision', 'رؤيتنا')}
                </div>
                <WordPullUp
                  text={t(
                    "To be Egypt's most trusted real estate developer — measured not in units sold, but in communities that thrive.",
                    'أن نكون المطوّر العقاري الأكثر ثقة في مصر — ليس بعدد الوحدات المُباعة، بل بالمجتمعات التي تزدهر.'
                  )}
                  delay={0.15}
                  style={{
                    fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                    fontSize: 'clamp(26px, 3.5vw, 44px)',
                    fontWeight: isAr ? 700 : 300,
                    color: 'var(--petal)',
                    lineHeight: isAr ? 1.3 : 1.1,
                    letterSpacing: isAr ? 0 : '-0.01em',
                  }}
                />
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div>
                <div className="eyebrow on-dark" style={{ marginBottom: '24px' }}>
                  <span className="stem"></span>
                  {t('Our Mission', 'مهمتنا')}
                </div>
                <p style={{ fontSize: '16px', lineHeight: 1.75, color: 'rgba(255,253,248,.82)' }}>
                  {t(
                    'To design and deliver residential communities that integrate architecture, nature, and modern living — creating places where people connect, belong, and grow. We pursue quality in every detail, from masterplan to doorknob.',
                    'تصميم وتسليم مجتمعات سكنية تدمج العمارة والطبيعة والحياة العصرية — لخلق أماكن يتواصل فيها الناس وينتمون ويتطورون.'
                  )}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-page-section">
        <div className="wrap">
          <FadeUp>
            <div className="section-head">
              <div className="eyebrow"><span className="stem"></span>{t('Our Values', 'قيمنا')}</div>
            </div>
          </FadeUp>
          <WordPullUp
            text={t('What we stand for', 'ما نؤمن به')}
            tag="h2"
            delay={0.1}
            style={{
              fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
              fontWeight: isAr ? 700 : 400,
              fontSize: isAr ? '32px' : '36px',
              lineHeight: isAr ? 1.3 : 1.2,
              margin: '16px 0 0',
            }}
          />
          <Stagger stagger={0.1} className="values-grid" delay={0.15}>
            {[
              { num: '01', en: ['Quality', 'We never compromise on materials, execution, or finish. Quality is the minimum, not the goal.'], ar: ['الجودة', 'لا نتنازل أبدًا عن المواد أو التنفيذ أو اللمسات النهائية.'] },
              { num: '02', en: ['Design', 'Architecture that is both beautiful and functional — spaces that serve the rhythms of daily life.'], ar: ['التصميم', 'عمارة جميلة وعملية في آنٍ واحد — مساحات تخدم إيقاعات الحياة اليومية.'] },
              { num: '03', en: ['Community', 'We build neighborhoods, not just buildings. Every project is designed to foster belonging.'], ar: ['المجتمع', 'نبني أحياء، لا مجرد مبانٍ. كل مشروع مصمم لتعزيز الانتماء.'] },
              { num: '04', en: ['Vision', 'We think decades ahead — in landscape planning, infrastructure, and the lives our residents will lead.'], ar: ['الرؤية', 'نفكر عقودًا للأمام — في تخطيط المناظر الطبيعية والبنية التحتية وحياة سكاننا.'] },
            ].map(v => (
              <StaggerItem key={v.num}>
                <div className="value-item">
                  <div className="num">{v.num}</div>
                  <h3>{t(v.en[0], v.ar[0])}</h3>
                  <p>{t(v.en[1], v.ar[1])}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section style={{ padding: '0 0 110px' }}>
        <div className="wrap">
          <div className="about-grid">
            <ImageReveal
              src="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=900&h=700&fit=crop&auto=format"
              alt="What Gardenia does"
              delay={0}
              className="about-img"
            />
            <div className="about-text">
              <FadeUp>
                <div className="eyebrow"><span className="stem"></span>{t('What We Do', 'ماذا نفعل')}</div>
              </FadeUp>
              <WordPullUp
                text={t('From masterplan to move-in day.', 'من المخطط إلى يوم السكن')}
                tag="h2"
                delay={0.12}
                style={{
                  fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                  fontWeight: isAr ? 700 : 400,
                  fontSize: isAr ? '34px' : '38px',
                  lineHeight: isAr ? 1.3 : 1.18,
                  margin: '16px 0 22px',
                }}
              />
              <FadeUp delay={0.28}>
                <p>
                  {t(
                    "Gardenia develops residential communities and mixed-use projects across Egypt's major cities. Our work spans everything from land acquisition and masterplanning to architecture, landscape design, sales, and long-term property management.",
                    'تطوّر جاردينيا مجتمعات سكنية ومشاريع متعددة الاستخدامات عبر المدن المصرية الكبرى.'
                  )}
                </p>
              </FadeUp>
              <FadeUp delay={0.38}>
                <p>
                  {t(
                    'Our in-house team of architects and landscape designers controls every stage of the process. This is how we ensure consistency, quality, and a unified vision.',
                    'يتولى فريقنا الداخلي من المعماريين ومصممي المناظر الطبيعية الإشراف على كل مرحلة من العملية.'
                  )}
                </p>
              </FadeUp>
              <FadeUp delay={0.48}>
                <button
                  className="pill-btn"
                  onClick={() => { onNavigate('projects'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                >
                  {t('Explore Our Projects', 'استكشف مشروعاتنا')} →
                </button>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
