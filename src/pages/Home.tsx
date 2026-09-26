import { useLang } from '../context/LangContext'
import TowerHeroScrollytelling from '../components/TowerHeroScrollytelling'
import { FadeUp, FadeIn, WordPullUp, Stagger, StaggerItem, ImageReveal, ParallaxImage, HoverScale } from '../components/Animate'
import Skiper49 from '../components/ui/skiper49'

type Page = 'home' | 'about' | 'projects' | 'careers' | 'contact'

interface HomeProps {
  onNavigate: (page: Page) => void
}

export default function Home({ onNavigate }: HomeProps) {
  const { t, isAr } = useLang()

  const nav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* HERO SCROLLYTELLING */}
      <TowerHeroScrollytelling onNavigate={nav} />

      {/* ABOUT GARDENIA */}
      <section className="about" id="about-section">
        <div className="wrap about-grid">
          <div className="about-text">
            <FadeUp delay={0}>
              <div className="eyebrow">
                <span className="stem"></span>
                {t('Value Proposition & Regional Expansion', 'القيمة الاستثمارية والتوسع الإقليمي')}
              </div>
            </FadeUp>
            <WordPullUp
              text={t('A Legacy of Growth & Distinction', 'إرث من النمو والتميز')}
              tag="h2"
              delay={0.1}
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
            <FadeUp delay={0.2}>
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
            <FadeUp delay={0.3}>
              <p>
                {t(
                  'At Gardenia Heights Developments, we identify thriving economic hubs and transform them into master-planned communities built for generations. From our flagship developments in the industrial heartbeat of 10th of Ramadan to premier urban destinations in New Sohag, our portfolio reflects a singular promise: timeless New Classic design, exceptional privacy, and enduring capital appreciation.',
                  'في جاردينيا هايتس للتطوير العقاري، نقتنص المراكز الاقتصادية المزدهرة ونحولها إلى مجتمعات متكاملة ومدروسة بُنيت لتدوم عبر الأجيال. من مشروعاتنا الرائدة في القلب الصناعي النابض لمدينة العاشر من رمضان إلى أرقى الوجهات الحضرية في سوهاج الجديدة، تعكس محفظتنا الاستثمارية وعداً راسخاً: تصميم نيو كلاسيك يتحدى الزمن، خصوصية استثنائية، وعوائد رأس مالية متنامية ومستدامة.'
                )}
              </p>
            </FadeUp>
            <FadeUp delay={0.42}>
              <a href="#" className="pill-btn" onClick={e => { e.preventDefault(); nav('about') }}>
                {t('Learn More', 'اعرف أكثر')} →
              </a>
            </FadeUp>
          </div>
          <ImageReveal
            src="/images/gallery/gallery-01.jpg"
            alt="Gardenia Heights Flagship Architecture"
            delay={0.15}
            className="about-img"
          />
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="projects" id="projects-section">
        <div className="wrap">
          <div className="proj-head-row" style={{ marginBottom: '36px', alignItems: 'flex-end' }}>
            <div className="section-head" style={{ marginBottom: 0, maxWidth: '820px' }}>
              <FadeUp>
                <div className="eyebrow">
                  <span className="stem"></span>
                  {t('Our Portfolio', 'محفظة مشروعاتنا')}
                </div>
              </FadeUp>
              <WordPullUp
                text={t('A Unified Vision of Architectural Distinction', 'رؤية معمارية موحدة بآفاق استثنائية')}
                tag="h2"
                delay={0.1}
                style={{
                  fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                  fontWeight: isAr ? 700 : 400,
                  fontSize: isAr ? '30px' : '36px',
                  lineHeight: isAr ? 1.3 : 1.15,
                  margin: '14px 0 14px',
                }}
              />
              <FadeUp delay={0.15}>
                <p
                  style={{
                    fontSize: isAr ? '14.5px' : '15px',
                    lineHeight: 1.7,
                    color: 'rgba(33, 31, 26, 0.72)',
                    margin: 0,
                    fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  }}
                >
                  {t(
                    'Explore the full breadth of Gardenia Heights Developments. From signature New Classic residential residences to bustling open-air strip malls, executive office suites, and modern medical centers across 10th of Ramadan City and New Sohag, every landmark reflects our dedication to enduring quality and timeless design.',
                    'استكشف المدى المتكامل لمشروعات جاردينيا هايتس للتطوير العقاري. من المجمعات السكنية الكلاسيكية الجديدة المميزة، إلى الستريب مول المفتوح النابض بالحياة، والأجنحة الإدارية الراقية، والمراكز الطبية التخصصية الحديثة عبر مدينتي العاشر من رمضان وسوهاج الجديدة؛ حيث يجسد كل صرح التزامنا الراسخ بالجودة المتوارثة والتصميم الخالد.'
                  )}
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.2}>
              <a
                href="#"
                className="view-all"
                onClick={e => {
                  e.preventDefault()
                  nav('projects')
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  fontWeight: 600,
                  fontSize: isAr ? '14px' : '13.5px',
                  color: 'var(--gold-deep)',
                }}
              >
                {t('Explore Full Gallery', 'استكشف المعرض بالكامل')} {isAr ? '←' : '→'}
              </a>
            </FadeUp>
          </div>

          <Stagger
            stagger={0.12}
            className="proj-grid"
            delay={0.1}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                img: '/images/gallery/gallery-03.jpg',
                tag: { en: 'Residential Typology', ar: 'النمط السكني' },
                name: { en: 'Signature New Classic Residences', ar: 'المجتمعات السكنية الكلاسيكية' },
                loc: { en: '10th of Ramadan City', ar: 'العاشر من رمضان' },
                caption: {
                  en: 'Serene, low-density residences planned around absolute privacy, lush green buffers, and family-first comfort.',
                  ar: 'مساكن هادئة منخفضة الكثافة صُممت حول الخصوصية المطلقة، والأحزمة الخضراء الشاسعة، وراحة العائلة أولاً.',
                },
                focus: {
                  en: 'Grand New Classic facades, hotel-grade lobbies, private residential entrances, and bespoke wrought-iron.',
                  ar: 'واجهات كلاسيكية جديدة فخمة، ردهات فندقية، بوابات سكنية خاصة، وشرفات واسعة بحديد مشغول فاخر.',
                },
              },
              {
                img: '/images/gallery/gallery-14.jpg',
                tag: { en: 'Commercial & Retail', ar: 'المراكز والستريب مول' },
                name: { en: 'Open-Air Commercial Promenades', ar: 'المراكز والممرات التجارية المفتوحة' },
                loc: { en: '10th of Ramadan City', ar: 'العاشر من رمضان' },
                caption: {
                  en: 'Prime commercial environments engineered for sustained foot traffic, dynamic retail spaces, and premier dining experiences.',
                  ar: 'بيئات تجارية استثنائية هندست لضمان تدفق مستمر للزوار، ومساحات تجزئة حيوية، وتجارب تسوق ومطاعم راقية.',
                },
                focus: {
                  en: 'High-visibility open-air commercial avenues, double-height panoramic storefronts, and promenade seating.',
                  ar: 'جادات تجارية مفتوحة فائقة الوضوح، واجهات عرض بانورامية مزدوجة الارتفاع، وجلسات خارجية على الممشى.',
                },
              },
              {
                img: '/images/gallery/gallery-19.jpg',
                tag: { en: 'Administrative Suites', ar: 'المقرات الإدارية' },
                name: { en: 'Executive Corporate Business Suites', ar: 'المقرات والأجنحة الإدارية الفاخرة' },
                loc: { en: '10th of Ramadan City', ar: 'العاشر من رمضان' },
                caption: {
                  en: 'Prestigious office spaces designed to project authority, maintain operational focus, and deliver an elevated business address.',
                  ar: 'مساحات مكتبية مرموقة مصممة لتعكس الهيبة والريادة، وتحافظ على التركيز التشغيلي، وتمنح شركتك عنوان عمل فائق التميز.',
                },
                focus: {
                  en: 'Sophisticated corporate lobbies, private boardrooms, warm architectural lighting, and executive floor plans.',
                  ar: 'ردهات استقبال مؤسسية راقية، غرف اجتماعات خاصة متطورة، وإضاءة معمارية دافئة ومدروسة.',
                },
              },
              {
                img: '/images/gallery/gallery-16.jpg',
                tag: { en: 'Medical Centers', ar: 'الصروح والعيادات الطبية' },
                name: { en: 'Specialized Healthcare Complexes', ar: 'المراكز الطبية التخصصية المتكاملة' },
                loc: { en: '10th of Ramadan & New Sohag', ar: 'العاشر من رمضان وسوهاج الجديدة' },
                caption: {
                  en: 'State-of-the-art healthcare suites balancing absolute hygiene, peaceful patient experiences, and seamless accessibility.',
                  ar: 'أجنحة رعاية صحية متطورة توازن بين أعلى درجات التعقيم والسلامة، وتجربة مريحة للمرضى، وسهولة تامة في الوصول.',
                },
                focus: {
                  en: 'Pristine clinic entrances, patient waiting lounges, clean marble corridors, and compliant clinical infrastructure.',
                  ar: 'مداخل عيادات فائقة النقاء، استراحات انتظار رحبة للمرضى، وممرات رخامية وبنية تحتية طبية معتمدة.',
                },
              },
            ].map((proj, i) => (
              <StaggerItem key={i}>
                <HoverScale scale={1.01} style={{ height: '100%' }}>
                  <div
                    className="proj-card"
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid rgba(212, 175, 55, 0.22)',
                      background: '#FFFDF8',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                    }}
                  >
                    <div className="img-wrap" style={{ overflow: 'hidden', marginBottom: 0, aspectRatio: '16/11' }}>
                      <img
                        src={proj.img}
                        alt={proj.name.en}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                      />
                    </div>
                    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <div className="proj-tags" style={{ marginBottom: '8px' }}>
                        <span className="proj-tag" style={{ background: 'rgba(212, 175, 55, 0.12)', borderColor: 'rgba(212, 175, 55, 0.35)', color: 'var(--gold-deep)' }}>
                          {t(proj.tag.en, proj.tag.ar)}
                        </span>
                      </div>
                      <h3 style={{ fontSize: isAr ? '19px' : '20px', margin: '0 0 6px', fontWeight: 600 }}>
                        {t(proj.name.en, proj.name.ar)}
                      </h3>
                      <div className="proj-loc" style={{ color: 'var(--gold-deep)', fontWeight: 500, marginBottom: '12px' }}>
                        📍 {t(proj.loc.en, proj.loc.ar)}
                      </div>
                      <div
                        style={{
                          background: 'rgba(244, 240, 230, 0.6)',
                          borderLeft: isAr ? 'none' : '3px solid var(--gold)',
                          borderRight: isAr ? '3px solid var(--gold)' : 'none',
                          padding: '10px 12px',
                          borderRadius: '6px',
                          marginBottom: '14px',
                        }}
                      >
                        <p style={{ fontSize: '12.5px', lineHeight: 1.55, margin: 0, color: '#2b2923', fontWeight: 500 }}>
                          {t(proj.caption.en, proj.caption.ar)}
                        </p>
                      </div>
                      <p style={{ fontSize: '12px', lineHeight: 1.6, color: 'rgba(33, 31, 26, 0.65)', flexGrow: 1, margin: '0 0 16px' }}>
                        <strong style={{ color: 'var(--ink)' }}>{t('Focus:', 'التركيز:')}</strong> {t(proj.focus.en, proj.focus.ar)}
                      </p>
                      <div
                        className="proj-link"
                        onClick={() => nav('projects')}
                        style={{
                          marginTop: 'auto',
                          paddingTop: '12px',
                          borderTop: '1px solid rgba(33, 31, 26, 0.08)',
                          cursor: 'pointer',
                        }}
                      >
                        <span>{t('View in Gallery', 'مشاهدة في معرض الصور')}</span>
                        <span>{isAr ? '←' : '→'}</span>
                      </div>
                    </div>
                  </div>
                </HoverScale>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CORE PILLARS */}
      <section className="approach">
        <div className="wrap">
          <FadeUp>
            <div className="section-head on-dark">
              <div className="eyebrow on-dark">
                <span className="stem"></span>
                {t('Core Pillars', 'الركائز الأساسية')}
              </div>
              <WordPullUp
                text={t('Built on three strategic pillars', 'مبني على ثلاث ركائز استراتيجية')}
                tag="h2"
                delay={0.1}
                style={{
                  fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                  fontWeight: isAr ? 700 : 400,
                  fontSize: isAr ? '32px' : '36px',
                  lineHeight: isAr ? 1.3 : 1.2,
                  color: 'var(--petal)',
                  margin: '16px 0 14px',
                }}
              />
            </div>
          </FadeUp>
          <Stagger stagger={0.1} className="approach-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }} delay={0.15}>
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
            ].map(item => (
              <StaggerItem key={item.num}>
                <div className="approach-item">
                  <div className="num">{item.num}</div>
                  <h3>{t(item.en[0], item.ar[0])}</h3>
                  <p>{t(item.en[1], item.ar[1])}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 4. STRATEGIC LOCATIONS SPOTLIGHT */}
      <section className="locations-spotlight" id="locations-section" style={{ padding: '110px 0', background: 'var(--green)', color: 'var(--petal)' }}>
        <div className="wrap">
          <div className="section-head on-dark center" style={{ maxWidth: '780px', margin: '0 auto 60px', textAlign: 'center' }}>
            <FadeUp>
              <div className="eyebrow on-dark" style={{ justifyContent: 'center' }}>
                <span className="stem"></span>
                {t('Strategic Locations Spotlight', 'الوجهات الاستراتيجية')}
              </div>
            </FadeUp>
            <WordPullUp
              text={t('Where We Build', 'أين نبني')}
              tag="h2"
              delay={0.1}
              style={{
                fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                fontWeight: isAr ? 700 : 400,
                fontSize: isAr ? '36px' : '44px',
                lineHeight: isAr ? 1.25 : 1.15,
                color: 'var(--petal)',
                margin: '16px 0 12px',
                textAlign: 'center',
              }}
            />
            <FadeUp delay={0.2}>
              <p style={{ fontSize: isAr ? '17px' : '18px', color: 'var(--gold)', fontWeight: 500, margin: '0 auto', textAlign: 'center' }}>
                {t("Prime Footprints in Egypt's Key Destinations", 'حضور استراتيجي في أهم الوجهات المصرية')}
              </p>
            </FadeUp>
          </div>

          <Stagger stagger={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Card 1: 10th of Ramadan City */}
            <StaggerItem>
              <HoverScale scale={1.015}>
                <div
                  className="rounded-2xl overflow-hidden border border-[rgba(255,253,248,0.15)] bg-[rgba(28,43,32,0.6)] backdrop-blur-md flex flex-col h-full transition-all duration-300 hover:border-[#d4af37]/50 shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src="/images/gallery/gallery-06.jpg"
                      alt="10th of Ramadan City"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,20,15,0.92)] via-[rgba(15,20,15,0.3)] to-transparent" />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#d4af37] text-[#0b1510] shadow-md">
                        {t('Flagship Destination', 'الوجهة الرائدة')}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 rtl:text-right">
                      <h3
                        className="text-2xl md:text-3xl font-normal text-white"
                        style={{ fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)' }}
                      >
                        {t('10th of Ramadan City', 'مدينة العاشر من رمضان')}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                    <p
                      className="text-sm md:text-base text-white/80 leading-relaxed mb-6"
                      style={{ fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)' }}
                    >
                      {t(
                        "Establishing new benchmarks for upscale residential living and cutting-edge commercial centers in the city's most prestigious districts.",
                        'إرساء معايير جديدة للحياة السكنية الراقية والمراكز التجارية المتطورة في أرقى أحياء المدينة.'
                      )}
                    </p>
                    <div className="pt-4 border-t border-[rgba(255,253,248,0.12)] flex items-center justify-between text-[#d4af37] text-xs font-semibold tracking-wider uppercase">
                      <span>{t('Residential & Commercial', 'سكني وتجاري')}</span>
                      <span>📍 {t('East Cairo Hub', 'محور شرق القاهرة')}</span>
                    </div>
                  </div>
                </div>
              </HoverScale>
            </StaggerItem>

            {/* Card 2: New Sohag */}
            <StaggerItem>
              <HoverScale scale={1.015}>
                <div
                  className="rounded-2xl overflow-hidden border border-[rgba(255,253,248,0.15)] bg-[rgba(28,43,32,0.6)] backdrop-blur-md flex flex-col h-full transition-all duration-300 hover:border-[#d4af37]/50 shadow-[0_12px_36px_rgba(0,0,0,0.4)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src="/images/gallery/gallery-20.jpg"
                      alt="New Sohag"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(15,20,15,0.92)] via-[rgba(15,20,15,0.3)] to-transparent" />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-[#d4af37] text-[#0b1510] shadow-md">
                        {t('Upper Egypt Hub', 'وجهة الصعيد الأولى')}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 rtl:text-right">
                      <h3
                        className="text-2xl md:text-3xl font-normal text-white"
                        style={{ fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)' }}
                      >
                        {t('New Sohag', 'سوهاج الجديدة')}
                      </h3>
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-1 justify-between">
                    <p
                      className="text-sm md:text-base text-white/80 leading-relaxed mb-6"
                      style={{ fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)' }}
                    >
                      {t(
                        'Bringing signature New Classic luxury, planned infrastructure, and integrated community living to Upper Egypt’s fastest-growing modern hub.',
                        'نقل فخامة النيو كلاسيك المميزة، البنية التحتية المخططة، والحياة المجتمعية المتكاملة إلى أسرع المراكز الحديثة نمواً في صعيد مصر.'
                      )}
                    </p>
                    <div className="pt-4 border-t border-[rgba(255,253,248,0.12)] flex items-center justify-between text-[#d4af37] text-xs font-semibold tracking-wider uppercase">
                      <span>{t('New Classic Masterplan', 'مخطط نيو كلاسيك متكامل')}</span>
                      <span>📍 {t('Upper Egypt', 'صعيد مصر')}</span>
                    </div>
                  </div>
                </div>
              </HoverScale>
            </StaggerItem>
          </Stagger>

          {/* CTA Button */}
          <div className="flex justify-center mt-10">
            <FadeUp delay={0.3}>
              <button
                type="button"
                onClick={() => nav('projects')}
                className="pill-btn cursor-pointer"
                style={{
                  background: 'var(--gold)',
                  color: '#0b1510',
                  padding: '16px 36px',
                  fontSize: '14px',
                  fontWeight: 600,
                  boxShadow: '0 6px 24px rgba(184,144,90,0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderRadius: '999px',
                  cursor: 'pointer',
                }}
              >
                <span>{t('Discover Master Plans & Unit Availability', 'اكتشف المخططات وتوافر الوحدات')}</span>
                <span>{isAr ? '←' : '→'}</span>
              </button>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section className="lifestyle">
        <div className="wrap">
          <FadeUp>
            <div className="section-head">
              <div className="eyebrow">
                <span className="stem"></span>
                {t('Lifestyle', 'أسلوب الحياة')}
              </div>
            </div>
          </FadeUp>
          <WordPullUp
            text={t('Life, well planned.', 'حياة مخطط لها كويس')}
            tag="h2"
            delay={0.1}
            style={{
              fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
              fontWeight: isAr ? 700 : 400,
              fontSize: isAr ? '32px' : '36px',
              lineHeight: isAr ? 1.3 : 1.2,
              margin: '0 0 48px',
            }}
          />
          <Stagger stagger={0.1} className="life-grid">
            {[
              { img: '/images/gallery/gallery-05.jpg', en: 'Community Gardens', ar: 'حدائق مجتمعية' },
              { img: '/images/gallery/gallery-02.jpg', en: 'Family Living', ar: 'حياة عائلية' },
              { img: '/images/gallery/gallery-10.jpg', en: 'Wellness & Fitness', ar: 'لياقة وصحة' },
              { img: '/images/gallery/gallery-15.jpg', en: 'Everyday Convenience', ar: 'راحة يومية' },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="life-item">
                  <div className="img-wrap" style={{ overflow: 'hidden' }}>
                    <img src={item.img} alt={item.en} style={{ transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} />
                  </div>
                  <span>{t(item.en, item.ar)}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* WHY GARDENIA */}
      <section className="why">
        <div className="wrap">
          <div className="section-head center">
            <FadeUp>
              <div className="eyebrow" style={{ justifyContent: 'center' }}>
                <span className="stem"></span>
                {t('Why Gardenia', 'ليه جاردينيا')}
              </div>
            </FadeUp>
            <WordPullUp
              text={t('Built on trust, delivered on time.', 'مبني على الثقة، بيتسلم في ميعاده')}
              tag="h2"
              delay={0.1}
              style={{
                fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                fontWeight: isAr ? 700 : 400,
                fontSize: isAr ? '32px' : '36px',
                lineHeight: isAr ? 1.3 : 1.2,
                margin: '16px 0 14px',
                textAlign: 'center',
              }}
            />
          </div>
          <Stagger stagger={0.12} className="why-grid">
            {[
              { icon: <path d="M20 6L9 17l-5-5" />, en: ['100% On-Time Handover', 'Every unit delivered on the date we promised.'], ar: ['تسليم في الميعاد 100%', 'كل وحدة بتتسلم في الميعاد اللي وعدنا بيه.'] },
              { icon: <path d="M12 3l7 3v6c0 5-3 8-7 9-4-1-7-4-7-9V6l7-3z" />, en: ['In-House Design Studio', 'Architecture and interiors developed under one roof.'], ar: ['استوديو تصميم داخلي', 'العمارة والديكور بيتصمموا تحت سقف واحد.'] },
              { icon: <><circle cx="12" cy="6" r="3" /><path d="M6 21v-4a4 4 0 018 0v4" /></>, en: ['Dedicated After-Sales Team', "Real support long after you've moved in."], ar: ['فريق خدمة ما بعد البيع', 'دعم حقيقي حتى بعد ما تسكن.'] },
              { icon: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /></>, en: ['Flexible Payment Plans', 'Options built around how our clients actually pay.'], ar: ['خطط سداد مرنة', 'خطط مبنية على طريقة سداد عملائنا فعليًا.'] },
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="why-item">
                  <svg className="leaf-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{item.icon}</svg>
                  <h3>{t(item.en[0], item.ar[0])}</h3>
                  <p>{t(item.en[1], item.ar[1])}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CAREERS PREVIEW */}
      <section className="careers-preview">
        <div className="wrap careers-row">
          <div className="careers-text">
            <FadeUp>
              <div className="eyebrow">
                <span className="stem"></span>
                {t('Careers', 'الوظائف')}
              </div>
            </FadeUp>
            <WordPullUp
              text={t('Build your career with us.', 'ابنِ مستقبلك المهني معانا')}
              tag="h2"
              delay={0.1}
              style={{
                fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                fontWeight: isAr ? 700 : 400,
                fontSize: isAr ? '30px' : '34px',
                lineHeight: isAr ? 1.3 : 1.2,
                margin: '16px 0 14px',
              }}
            />
            <FadeUp delay={0.28}>
              <p>
                {t(
                  "We're a team of architects, engineers, and dreamers shaping the way Egypt lives. Explore open roles across design, construction, and sales.",
                  'إحنا فريق من المهندسين المعماريين والمهندسين والحالمين بنشكّل طريقة عيشة مصر. اكتشف الوظائف المتاحة في التصميم والإنشاءات والمبيعات.'
                )}
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.35}>
            <a
              href="#"
              className="pill-btn"
              style={{ flexShrink: 0 }}
              onClick={e => { e.preventDefault(); nav('careers') }}
            >
              {t('View Open Positions', 'شاهد الوظائف المتاحة')} →
            </a>
          </FadeUp>
        </div>
      </section>

      {/* FINAL CALL TO ACTION (PRE-FOOTER) */}
      <FadeUp distance={40} className="home-cta-fadeup" style={{ padding: '110px 0 0' }}>
        <div className="wrap home-cta-wrap" style={{ padding: '0 48px' }}>
          <div className="cta-banner home-cta-banner" style={{ margin: 0, minHeight: '460px', padding: '64px 32px' }}>
            <img
              src="/images/gallery/gallery-12.jpg"
              alt="Gardenia Heights celestial night elevation"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Cinematic Gradient Vignette */}
            <div
              className="home-cta-dark-overlay"
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(10,16,12,0.88) 0%, rgba(15,22,17,0.76) 50%, rgba(10,16,12,0.95) 100%)',
              }}
            />

            <div className="cta-banner-content home-cta-content" style={{ maxWidth: '780px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
              {/* Eyebrow badge */}
              <div
                className="home-cta-eyebrow"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 16px',
                  borderRadius: '999px',
                  background: 'rgba(212,175,55,0.15)',
                  border: '1px solid rgba(212,175,55,0.35)',
                  backdropFilter: 'blur(8px)',
                  marginBottom: '20px',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d4af37' }} />
                <span
                  style={{
                    fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: isAr ? 0 : '0.22em',
                    textTransform: isAr ? 'none' : 'uppercase',
                    color: '#f0d886',
                  }}
                >
                  <span className="home-cta-eyebrow-desktop">{t('Exclusive Invitation', 'دعوة حصرية للاستثمار')}</span>
                  <span className="home-cta-eyebrow-mobile">{t('Exclusive Invitation', 'دعوة حصرية')}</span>
                </span>
              </div>

              {/* Headline: Claim the Life You Deserve */}
              <h2
                className="home-cta-title"
                style={{
                  fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                  fontWeight: isAr ? 700 : 400,
                  fontSize: isAr ? 'clamp(32px, 5vw, 48px)' : 'clamp(36px, 5.5vw, 54px)',
                  lineHeight: isAr ? 1.25 : 1.12,
                  marginBottom: '16px',
                  color: 'var(--petal)',
                  textShadow: '0 2px 20px rgba(0,0,0,0.6)',
                }}
              >
                {t('Claim the Life You Deserve', 'امتلك الحياة التي تليق بك')}
              </h2>

              {/* Sub-headline */}
              <p
                className="home-cta-desc"
                style={{
                  fontSize: isAr ? '15px' : '16px',
                  lineHeight: 1.7,
                  color: 'rgba(255, 253, 248, 0.88)',
                  maxWidth: '58ch',
                  margin: '0 auto 32px',
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                }}
              >
                <span className="home-cta-desc-desktop">
                  {t(
                    'Speak with our investment advisors today to receive site plans, unit availability, and tailored payment structures across our destinations.',
                    'تحدث مع مستشارينا الاستثماريين اليوم للحصول على المخططات العامة، توافر الوحدات، وهياكل السداد المصممة خصيصاً عبر كافة وجهاتنا.'
                  )}
                </span>
                <span className="home-cta-desc-mobile">
                  {t(
                    'Speak with our advisors for site plans, unit availability, and tailored payment plans.',
                    'تحدث مع مستشارينا للحصول على المخططات وتوافر الوحدات وجداول السداد الميسرة.'
                  )}
                </span>
              </p>

              {/* Actions Row */}
              <div
                className="home-cta-actions"
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '16px',
                  marginBottom: '36px',
                }}
              >
                {/* Primary Button: Register Your Interest */}
                <button
                  type="button"
                  onClick={() => nav('contact')}
                  className="cursor-pointer home-cta-btn-primary"
                  style={{
                    background: 'linear-gradient(135deg, #f3de96 0%, #d4af37 60%, #b8905a 100%)',
                    color: '#0b1510',
                    padding: '16px 36px',
                    borderRadius: '999px',
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: isAr ? 0 : '0.02em',
                    boxShadow: '0 6px 28px rgba(212,175,55,0.45)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.03)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
                >
                  <span className="home-cta-btn-text-desktop">{t('Register Your Interest', 'سجّل اهتمامك الآن')}</span>
                  <span className="home-cta-btn-text-mobile">{t('Register Interest', 'سجّل اهتمامك')}</span>
                  <span>{isAr ? '←' : '→'}</span>
                </button>

                <div className="home-cta-secondary-row">
                  {/* Direct Hotline: 17994 */}
                  <a
                    href="tel:17994"
                    className="home-cta-btn-secondary"
                    style={{
                      background: 'rgba(255, 253, 248, 0.12)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1.5px solid rgba(212, 175, 55, 0.55)',
                      color: '#FFFDF8',
                      padding: '15px 30px',
                      borderRadius: '999px',
                      fontSize: '14px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      transition: 'background 0.2s, border-color 0.2s',
                      fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(212, 175, 55, 0.24)';
                      e.currentTarget.style.borderColor = '#d4af37';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 253, 248, 0.12)';
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.55)';
                    }}
                  >
                    <span style={{ color: '#d4af37', display: 'flex', alignItems: 'center' }}>
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <span className="home-cta-btn-text-desktop">{t('Direct Hotline: 17994', 'الخط الساخن: 17994')}</span>
                    <span className="home-cta-btn-text-mobile">{t('Hotline: 17994', 'الخط الساخن: 17994')}</span>
                  </a>

                  {/* WhatsApp Inquiries */}
                  <a
                    href="https://wa.me/201050176306"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="home-cta-btn-whatsapp"
                    style={{
                      background: 'rgba(37, 211, 102, 0.16)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1.5px solid rgba(37, 211, 102, 0.5)',
                      color: '#4ade80',
                      padding: '15px 26px',
                      borderRadius: '999px',
                      fontSize: '14px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '9px',
                      textDecoration: 'none',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                      transition: 'background 0.2s, border-color 0.2s',
                      fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(37, 211, 102, 0.28)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(37, 211, 102, 0.16)';
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z"/>
                    </svg>
                    <span className="home-cta-btn-text-desktop">{t('WhatsApp Inquiries', 'واتساب المبيعات')}</span>
                    <span className="home-cta-btn-text-mobile">{t('WhatsApp', 'واتساب المبيعات')}</span>
                  </a>
                </div>
              </div>

              {/* Gold Divider */}
              <div
                className="home-cta-divider"
                style={{
                  height: '1px',
                  width: '180px',
                  margin: '0 auto 18px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)',
                }}
              />

              {/* Brand Signature */}
              <div
                className="home-cta-signature"
                style={{
                  fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                  fontSize: isAr ? '14px' : '13px',
                  letterSpacing: isAr ? 0 : '0.18em',
                  textTransform: isAr ? 'none' : 'uppercase',
                  color: '#e6c96e',
                  fontWeight: 500,
                  opacity: 0.95,
                }}
              >
                {t(
                  'Gardenia Heights Developments — Life You Deserve.',
                  'جاردينيا هايتس للتطوير العقاري — حياة تليق بك.'
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeUp>
    </>
  )
}
