import { useLang } from '../context/LangContext'
import GardeniaHero from '../components/GardeniaHero'
import { FadeUp, FadeIn, WordPullUp, Stagger, StaggerItem, ImageReveal, ParallaxImage, HoverScale } from '../components/Animate'

type Page = 'home' | 'about' | 'projects' | 'careers' | 'contact'

interface HomeProps {
  onNavigate: (page: Page) => void
}

export default function Home({ onNavigate }: HomeProps) {
  const { t } = useLang()

  const nav = (page: Page) => {
    onNavigate(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* HERO */}
      <GardeniaHero onNavigate={onNavigate} />

      {/* ABOUT GARDENIA */}
      <section className="about" id="about-section">
        <div className="wrap about-grid">
          <div className="about-text">
            <FadeUp delay={0}>
              <div className="eyebrow">
                <span className="stem"></span>
                {t('About Gardenia', 'عن جاردينيا')}
              </div>
            </FadeUp>
            <WordPullUp
              text={t('A developer that plants roots, not just buildings.', 'مطوّر يزرع جذور، مش مجرد مباني')}
              tag="h2"
              delay={0.1}
              style={{ fontFamily: 'var(--font-en-display)', fontWeight: 400, fontSize: '38px', lineHeight: 1.18, margin: '16px 0 22px' }}
            />
            <FadeUp delay={0.3}>
              <p>
                {t(
                  'For over nine years, Gardenia Developments has designed communities across Egypt built around gardens, craftsmanship, and everyday comfort. Every project carries the same idea forward: spaces people are proud to call home.',
                  'من أكتر من تسع سنين، جاردينيا للتطوير العقاري بتصمم مجتمعات في مصر مبنية على الحدائق والحرفية والراحة اليومية. كل مشروع بياخد نفس الفكرة لقدام: مساحات الناس فخورة إنها تسميها بيتها.'
                )}
              </p>
            </FadeUp>
            <FadeUp delay={0.42}>
              <a href="#" className="pill-btn" onClick={e => { e.preventDefault(); nav('about') }}>
                {t('Learn More', 'اعرف أكتر')} →
              </a>
            </FadeUp>
          </div>
          <ImageReveal
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=700&fit=crop&auto=format"
            alt="Gardenia architecture"
            delay={0.15}
            className="about-img"
          />
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="projects" id="projects-section">
        <div className="wrap">
          <div className="proj-head-row">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <FadeUp>
                <div className="eyebrow">
                  <span className="stem"></span>
                  {t('Featured Projects', 'مشروعات مختارة')}
                </div>
              </FadeUp>
              <WordPullUp
                text={t("Where we've built", 'أماكن بنيناها')}
                tag="h2"
                delay={0.1}
                style={{ fontFamily: 'var(--font-en-display)', fontWeight: 400, fontSize: '36px', lineHeight: 1.2, margin: '16px 0 14px' }}
              />
            </div>
            <FadeUp delay={0.2}>
              <a href="#" className="view-all" onClick={e => { e.preventDefault(); nav('projects') }}>
                {t('View All Projects', 'شاهد كل المشاريع')} →
              </a>
            </FadeUp>
          </div>

          <Stagger stagger={0.12} className="proj-grid" delay={0.1}>
            {[
              {
                img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&h=900&fit=crop&auto=format',
                tag: { en: 'Residential', ar: 'سكني' },
                name: { en: 'Gardenia Residence', ar: 'جاردينيا ريزيدنس' },
                loc: { en: '10th of Ramadan City', ar: 'العاشر من رمضان' },
                desc: { en: 'A gated community where landscaped courtyards meet modern architecture.', ar: 'مجتمع مسوّر تلتقي فيه الأفنية الخضراء بالعمارة العصرية.' },
              },
              {
                img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&h=900&fit=crop&auto=format',
                tag: { en: 'Commercial', ar: 'تجاري' },
                name: { en: 'Gardenia Business Park', ar: 'جاردينيا بيزنس بارك' },
                loc: { en: 'New Cairo', ar: 'القاهرة الجديدة' },
                desc: { en: 'A mixed-use business district designed for the way people actually work.', ar: 'منطقة أعمال متكاملة مصممة على طريقة الشغل الحقيقية.' },
              },
              {
                img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&h=900&fit=crop&auto=format',
                tag: { en: 'Residential', ar: 'سكني' },
                name: { en: 'Gardenia Heights', ar: 'جاردينيا هايتس' },
                loc: { en: 'Sheikh Zayed', ar: 'الشيخ زايد' },
                desc: { en: 'Elevated living with skyline views and resort-style amenities.', ar: 'حياة مرتفعة بإطلالات بانورامية ومرافق فندقية.' },
              },
            ].map((proj, i) => (
              <StaggerItem key={i}>
                <HoverScale scale={1.01} style={{ height: '100%' }}>
                  <div className="proj-card" style={{ height: '100%' }}>
                    <div className="img-wrap" style={{ overflow: 'hidden' }}>
                      <img src={proj.img} alt={proj.name.en} style={{ transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
                    </div>
                    <div className="proj-tags">
                      <span className="proj-tag">{t(proj.tag.en, proj.tag.ar)}</span>
                    </div>
                    <h3>{t(proj.name.en, proj.name.ar)}</h3>
                    <div className="proj-loc">{t(proj.loc.en, proj.loc.ar)}</div>
                    <p>{t(proj.desc.en, proj.desc.ar)}</p>
                    <div className="proj-link" onClick={() => nav('projects')}>
                      <span>{t('View Project', 'شاهد المشروع')}</span>
                      <span>→</span>
                    </div>
                  </div>
                </HoverScale>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* OUR APPROACH */}
      <section className="approach">
        <div className="wrap">
          <FadeUp>
            <div className="section-head on-dark">
              <div className="eyebrow on-dark">
                <span className="stem"></span>
                {t('Our Approach', 'أسلوبنا')}
              </div>
              <WordPullUp
                text={t('Four ideas behind every project', 'أربع أفكار وراء كل مشروع')}
                tag="h2"
                delay={0.1}
                style={{ fontFamily: 'var(--font-en-display)', fontWeight: 400, fontSize: '36px', lineHeight: 1.2, color: 'var(--petal)', margin: '16px 0 14px' }}
              />
            </div>
          </FadeUp>
          <Stagger stagger={0.1} className="approach-grid" delay={0.15}>
            {[
              { num: '01', en: ['Thoughtful Design', 'Every masterplan starts with how people will actually live in it.'], ar: ['تصميم مدروس', 'كل مخطط عام بيبدأ من إزاي الناس هتعيش فيه فعليًا.'] },
              { num: '02', en: ['Quality Craftsmanship', 'Premium materials and precise execution, project after project.'], ar: ['حرفية عالية', 'خامات فاخرة وتنفيذ دقيق، في كل مشروع.'] },
              { num: '03', en: ['Living Landscapes', 'Gardens and green spines are structural, not decorative.'], ar: ['مساحات خضراء حية', 'الحدائق والمحاور الخضراء جزء من التصميم مش زينة.'] },
              { num: '04', en: ['Long-Term Partnership', 'We stay involved well past handover, through service and community care.'], ar: ['شراكة طويلة المدى', 'بنفضل موجودين بعد التسليم، بالخدمة ورعاية المجتمع.'] },
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

      {/* FEATURED COMMUNITY */}
      <section className="community" style={{ overflow: 'hidden' }}>
        <ParallaxImage
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1800&h=900&fit=crop&auto=format"
          alt="Gardenia Residence community"
          strength={80}
          containerStyle={{ position: 'absolute', inset: 0 }}
        />
        <div className="wrap">
          <div className="community-content">
            <FadeUp delay={0}>
              <div className="eyebrow on-dark">
                <span className="stem"></span>
                {t('Featured Community', 'مجتمع مميز')}
              </div>
            </FadeUp>
            <WordPullUp
              text={t('Gardenia Residence, 10th of Ramadan City', 'جاردينيا ريزيدنس، العاشر من رمضان')}
              tag="h2"
              delay={0.1}
              style={{ fontFamily: 'var(--font-en-display)', fontWeight: 400, fontSize: '38px', lineHeight: 1.2, color: 'var(--petal)', margin: '16px 0 18px' }}
            />
            <FadeUp delay={0.3}>
              <p>
                {t(
                  'Our flagship community brings the Gardenia philosophy to life — 12 buildings, 340 homes, and gardens woven through every cluster.',
                  'مجتمعنا الرائد بيجسّد فلسفة جاردينيا - 12 مبنى، 340 وحدة سكنية، وحدائق منسوجة في كل تجمع.'
                )}
              </p>
            </FadeUp>
            <FadeUp delay={0.42}>
              <a
                href="#"
                className="pill-btn"
                style={{ background: 'var(--gold)', color: 'var(--green)' }}
                onClick={e => { e.preventDefault(); nav('projects') }}
              >
                {t('Explore Gardenia Residence', 'استكشف جاردينيا ريزيدنس')} →
              </a>
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
            style={{ fontFamily: 'var(--font-en-display)', fontWeight: 400, fontSize: '36px', lineHeight: 1.2, margin: '0 0 48px' }}
          />
          <Stagger stagger={0.1} className="life-grid">
            {[
              { img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=700&fit=crop&auto=format', en: 'Community Gardens', ar: 'حدائق مجتمعية' },
              { img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&h=700&fit=crop&auto=format', en: 'Family Living', ar: 'حياة عائلية' },
              { img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=700&fit=crop&auto=format', en: 'Wellness & Fitness', ar: 'لياقة وصحة' },
              { img: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=500&h=700&fit=crop&auto=format', en: 'Everyday Convenience', ar: 'راحة يومية' },
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
              style={{ fontFamily: 'var(--font-en-display)', fontWeight: 400, fontSize: '36px', lineHeight: 1.2, margin: '16px 0 14px', textAlign: 'center' }}
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
              style={{ fontFamily: 'var(--font-en-display)', fontWeight: 400, fontSize: '34px', margin: '16px 0 14px' }}
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

      {/* CTA BANNER */}
      <FadeUp distance={40} style={{ padding: '110px 0 0' }}>
        <div className="wrap" style={{ padding: '0 48px' }}>
          <div className="cta-banner" style={{ margin: 0 }}>
            <img
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1800&h=700&fit=crop&auto=format"
              alt="Gardenia at golden hour"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="cta-banner-content">
              <h2 style={{ fontFamily: 'var(--font-en-display)', fontWeight: 400, fontSize: '42px', marginBottom: '12px', color: 'var(--petal)' }}>
                {t("Let's build your next chapter.", 'يلا نبني فصلك الجاي')}
              </h2>
              <p>{t('Reach out to our team for project brochures, site visits, or investment opportunities.', 'تواصل مع فريقنا لطلب البروشورات، زيارات الموقع، أو فرص الاستثمار.')}</p>
              <a
                href="#"
                className="cta-banner-btn"
                onClick={e => { e.preventDefault(); nav('contact') }}
              >
                {t('Get In Touch', 'تواصل معنا')}
              </a>
            </div>
          </div>
        </div>
      </FadeUp>
      <div style={{ height: '0' }} />
    </>
  )
}
