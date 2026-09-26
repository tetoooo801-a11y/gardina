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
            src="/images/gallery/gallery-06.jpg"
            alt="About Gardenia Heights"
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

      {/* VALUE PROPOSITION & REGIONAL EXPANSION */}
      <section className="about-page-section">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-text">
              <FadeUp>
                <div className="eyebrow">
                  <span className="stem"></span>
                  {t('Value Proposition & Regional Expansion', 'القيمة الاستثمارية والتوسع الإقليمي')}
                </div>
              </FadeUp>
              <WordPullUp
                text={t('A Legacy of Growth & Distinction', 'إرث من النمو والتميز')}
                tag="h2"
                delay={0.12}
                align="start"
                className="w-full"
                style={{
                  fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                  fontWeight: isAr ? 700 : 400,
                  fontSize: isAr ? '34px' : '38px',
                  lineHeight: isAr ? 1.3 : 1.18,
                  margin: '16px 0 10px',
                }}
              />
              <FadeUp delay={0.22}>
                <h3
                  style={{
                    fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                    fontWeight: isAr ? 600 : 500,
                    fontSize: isAr ? '20px' : '22px',
                    color: 'var(--gold-deep)',
                    margin: '0 0 20px',
                    lineHeight: 1.35,
                  }}
                >
                  {t('Elevating Standards Across Strategic Cities', 'الارتقاء بالمعايير في مدن استراتيجية')}
                </h3>
              </FadeUp>
              <FadeUp delay={0.32}>
                <p>
                  {t(
                    'At Gardenia Heights Developments, we identify thriving economic hubs and transform them into master-planned communities built for generations. From our flagship developments in the industrial heartbeat of 10th of Ramadan to premier urban destinations in New Sohag, our portfolio reflects a singular promise: timeless New Classic design, exceptional privacy, and enduring capital appreciation.',
                    'في جاردينيا هايتس للتطوير العقاري، نقتنص المراكز الاقتصادية المزدهرة ونحولها إلى مجتمعات متكاملة ومدروسة بُنيت لتدوم عبر الأجيال. من مشروعاتنا الرائدة في القلب الصناعي النابض لمدينة العاشر من رمضان إلى أرقى الوجهات الحضرية في سوهاج الجديدة، تعكس محفظتنا الاستثمارية وعداً راسخاً: تصميم نيو كلاسيك يتحدى الزمن، خصوصية استثنائية، وعوائد رأس مالية متنامية ومستدامة.'
                  )}
                </p>
              </FadeUp>
              <FadeUp delay={0.42}>
                <p>
                  {t(
                    'Every project we design is a long-term commitment — to our residents, to the surrounding environment, and to Egypt\'s urban future.',
                    'كل مشروع بنصممه هو التزام طويل المدى — لسكاننا، للبيئة المحيطة، ولمستقبل التحضر في مصر.'
                  )}
                </p>
              </FadeUp>
            </div>
            <ImageReveal
              src="/images/gallery/gallery-01.jpg"
              alt="Gardenia Heights Flagship Community"
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
              src="/images/gallery/gallery-02.jpg"
              alt="Gardenia Heights Community & Family Living"
              delay={0}
              className="story-img"
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '20px' }}>
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
                  fontWeight: isAr ? 700 : 400,
                  fontSize: isAr ? '34px' : '38px',
                  lineHeight: isAr ? 1.3 : 1.18,
                  letterSpacing: isAr ? 0 : '-0.01em',
                  color: 'var(--ink)',
                  maxWidth: '20ch',
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

      {/* CORE PILLARS */}
      <section className="about-page-section">
        <div className="wrap">
          <FadeUp>
            <div className="section-head">
              <div className="eyebrow"><span className="stem"></span>{t('Core Pillars', 'الركائز الأساسية')}</div>
            </div>
          </FadeUp>
          <WordPullUp
            text={t('What defines our distinction', 'ما يُحدد ريادتنا وتميزنا')}
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
          <Stagger stagger={0.1} className="values-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }} delay={0.15}>
            {[
              {
                num: '01',
                en: [
                  'Strategic Expansion',
                  "Investing in Egypt's most promising, high-growth urban hubs with prime, high-connectivity locations.",
                ],
                ar: [
                  'توسع استراتيجي مدروس',
                  'الاستثمار في أكثر المراكز الحضرية الواعدة والأسرع نمواً في مصر بمواقع حيوية وسهلة الوصول.',
                ],
              },
              {
                num: '02',
                en: [
                  'New Classic Craftsmanship',
                  'Facades defined by balanced symmetry, bespoke wrought iron, and refined stone finishes.',
                ],
                ar: [
                  'حرفية النيو كلاسيك',
                  'واجهات تتسم بالتناظر المتوازن، تفاصيل الحديد المشغول الخاصة، والتشطيبات الحجرية الفاخرة.',
                ],
              },
              {
                num: '03',
                en: [
                  'Integrated Ecosystems',
                  'Seamless master plans merging tranquil private residences with vibrant strip malls, executive suites, and specialized clinics.',
                ],
                ar: [
                  'منظومات متكاملة',
                  'مخططات عامة متناغمة تدمج بين السكن الهادئ الخاص والستريب مول النابض، المكاتب الإدارية، والعيادات التخصصية.',
                ],
              },
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
              src="/images/gallery/gallery-14.jpg"
              alt="Gardenia Heights Commercial & Mixed-Use Destinations"
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
