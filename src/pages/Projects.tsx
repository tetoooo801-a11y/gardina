import { useState, useMemo, useEffect } from 'react'
import { useLang } from '../context/LangContext'
import { FadeUp, WordPullUp, ImageReveal, ParallaxImage } from '../components/Animate'
import { SlideTabs } from '../components/ui/slide-tabs'
import { MessageCircle, ArrowRight } from 'lucide-react'
import type { Page, ContactPrefill } from '../App'

interface ProjectsProps {
  onNavigate: (page: Page, prefill?: ContactPrefill) => void
}

interface Project {
  id: number
  img: string
  tag: { en: string; ar: string }
  name: { en: string; ar: string }
  loc: { en: string; ar: string }
  type: { en: string; ar: string }
  desc: { en: string; ar: string }
  detail: { en: string; ar: string }
}

const projects: Project[] = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=1100&fit=crop&auto=format',
    tag: { en: 'Residential', ar: 'سكني' },
    name: { en: 'Gardenia Residence', ar: 'جاردينيا ريزيدنس' },
    loc: { en: '10th of Ramadan City', ar: 'العاشر من رمضان' },
    type: { en: 'Gated Community', ar: 'مجتمع مسوّر' },
    desc: { en: 'A gated community where landscaped courtyards meet modern architecture, designed for families who value calm and greenery.', ar: 'مجتمع مسوّر تلتقي فيه الأفنية الخضراء بالعمارة العصرية، مصمم للعائلات التي تقدّر الهدوء والمساحات الخضراء.' },
    detail: { en: '12 residential buildings, 340 homes, with communal gardens woven through every cluster.', ar: '12 مبنى سكنيًا، 340 وحدة سكنية، مع حدائق مشتركة منسوجة في كل تجمع.' },
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&h=1100&fit=crop&auto=format',
    tag: { en: 'Commercial', ar: 'تجاري' },
    name: { en: 'Gardenia Business Park', ar: 'جاردينيا بيزنس بارك' },
    loc: { en: 'New Cairo', ar: 'القاهرة الجديدة' },
    type: { en: 'Mixed-Use', ar: 'متعدد الاستخدامات' },
    desc: { en: 'A mixed-use business district designed for the way people actually work — open, connected, and surrounded by greenery.', ar: 'منطقة أعمال متكاملة مصممة على طريقة الشغل الحقيقية — مفتوحة ومترابطة ومحاطة بالخضرة.' },
    detail: { en: 'Office towers, retail podium, and F&B promenade across a walkable campus layout.', ar: 'أبراج مكاتب وتجزئة وممشى مطاعم ومقاهٍ عبر تصميم حرم جامعي قابل للمشي.' },
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&h=1100&fit=crop&auto=format',
    tag: { en: 'Residential', ar: 'سكني' },
    name: { en: 'Gardenia Heights', ar: 'جاردينيا هايتس' },
    loc: { en: 'Sheikh Zayed', ar: 'الشيخ زايد' },
    type: { en: 'High-Rise Residential', ar: 'سكن شاهق' },
    desc: { en: 'Elevated living with skyline views and resort-style amenities — a new standard for urban residential life.', ar: 'حياة مرتفعة بإطلالات بانورامية ومرافق فندقية — معيار جديد للحياة السكنية الحضرية.' },
    detail: { en: 'Premium apartments across two towers with rooftop pool, spa, and sky lounge.', ar: 'شقق فاخرة عبر برجين مع مسبح على السطح وسبا وصالة سماوية.' },
  },
  {
    id: 4,
    img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&h=1100&fit=crop&auto=format',
    tag: { en: 'Residential', ar: 'سكني' },
    name: { en: 'Gardenia Gardens', ar: 'جاردينيا جاردنز' },
    loc: { en: '6th of October City', ar: 'مدينة السادس من أكتوبر' },
    type: { en: 'Villa & Townhouse', ar: 'فيلا وتاون هاوس' },
    desc: { en: 'An intimate collection of villas and townhouses set within a mature garden landscape, built for those who prefer space over density.', ar: 'مجموعة مميزة من الفيلات والتاون هاوس وسط طبيعة خضراء ناضجة، بُنيت لمن يفضل المساحة على الكثافة.' },
    detail: { en: '60 standalone villas and 120 townhouses across a 30-feddan landscaped plot.', ar: '60 فيلا مستقلة و120 تاون هاوس على قطعة أرض مشجّرة تبلغ 30 فدانًا.' },
  },
  {
    id: 5,
    img: 'https://images.unsplash.com/photo-1565402170291-8491f14678db?w=900&h=1100&fit=crop&auto=format',
    tag: { en: 'Mixed-Use', ar: 'متعدد الاستخدامات' },
    name: { en: 'Gardenia Plaza', ar: 'جاردينيا بلازا' },
    loc: { en: 'Maadi, Cairo', ar: 'المعادي، القاهرة' },
    type: { en: 'Retail & Residential', ar: 'تجاري وسكني' },
    desc: { en: 'An urban mixed-use development that brings together retail, dining, and boutique residences in one curated address.', ar: 'تطوير حضري متعدد الاستخدامات يجمع التجزئة والمطاعم والمساكن المميزة في عنوان واحد متكامل.' },
    detail: { en: 'Ground-floor retail and dining, six residential floors with curated amenity deck.', ar: 'طوابق تجزئة ومطاعم في الأرضي، وست طوابق سكنية مع طابق مرافق متميز.' },
  },
  {
    id: 6,
    img: 'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=900&h=1100&fit=crop&auto=format',
    tag: { en: 'Residential', ar: 'سكني' },
    name: { en: 'Gardenia Springs', ar: 'جاردينيا سبرينجز' },
    loc: { en: 'North Coast', ar: 'الساحل الشمالي' },
    type: { en: 'Seasonal Community', ar: 'مجتمع موسمي' },
    desc: { en: 'A coastal seasonal retreat designed around the Mediterranean horizon, where architecture defers to the landscape.', ar: 'ملجأ ساحلي موسمي مصمم حول الأفق المتوسطي، حيث تنحني العمارة أمام الطبيعة.' },
    detail: { en: 'Chalets, twin villas, and a central promenade fronting the sea.', ar: 'شاليهات وفيلات مزدوجة وممشى مركزي يطل على البحر.' },
  },
]

const FILTER_TABS = [
  { en: 'All', ar: 'الكل' },
  { en: 'Residential', ar: 'سكني' },
  { en: 'Commercial', ar: 'تجاري' },
  { en: 'Mixed-Use', ar: 'متعدد' },
]

export default function Projects({ onNavigate }: ProjectsProps) {
  const { t, isAr } = useLang()
  const [selected, setSelected] = useState<Project | null>(null)
  const [filterIndex, setFilterIndex] = useState(0)

  const filteredProjects = useMemo(() => {
    if (filterIndex === 0) return projects
    const tag = FILTER_TABS[filterIndex].en
    return projects.filter(p => p.tag.en === tag)
  }, [filterIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    if (selected) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selected])

  const handleEnquire = (proj: Project) => {
    const pName = isAr ? proj.name.ar : proj.name.en
    const pLoc = isAr ? proj.loc.ar : proj.loc.en
    const subject = isAr
      ? `استفسار بخصوص مشروع: ${pName} (${pLoc})`
      : `Inquiry regarding: ${pName} (${pLoc})`
    const message = isAr
      ? `مرحباً فريق جاردينيا،\n\nأود الاستفسار عن تفاصيل الوحدات والأسعار وخطط السداد المتاحة في مشروع "${pName}" (${pLoc}).\n\nبرجاء التواصل معي على:`
      : `Hello Gardenia Team,\n\nI would like to inquire about available units, pricing, and payment plans for "${pName}" located in ${pLoc}.\n\nPlease reach out to me at:`

    setSelected(null)
    onNavigate('contact', { subject, message })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getWhatsAppUrl = (proj: Project) => {
    const pName = isAr ? proj.name.ar : proj.name.en
    const text = isAr
      ? `مرحباً، أود الاستفسار وحجز جولة معاينة لمشروع "${pName}".`
      : `Hello, I would like to inquire and schedule a viewing for "${pName}".`
    return `https://wa.me/201000000000?text=${encodeURIComponent(text)}`
  }

  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2000&h=1200&fit=crop&auto=format"
            alt="Our Projects"
            strength={100}
            containerStyle={{ position: 'absolute', inset: 0 }}
          />
        </div>
        <div className="wrap page-hero-content">
          <FadeUp delay={0.1}>
            <div className="eyebrow-label">
              <span className="stem"></span>
              {t('Portfolio', 'مشروعاتنا')}
            </div>
          </FadeUp>
          <WordPullUp
            text={t('Our Projects', 'مشروعاتنا')}
            tag="h1"
            delay={0.2}
            stagger={0.09}
            style={{ fontFamily: 'var(--font-en-display)', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.01em', color: 'var(--petal)', fontSize: 'clamp(52px, 8vw, 96px)' }}
          />
          <FadeUp delay={0.45}>
            <p className="subtitle">
              {t(
                'Discover the iconic communities designed and delivered by Gardenia Developments.',
                'اكتشف المجتمعات الراقية التي صممتها ونفذتها جاردينيا للتطوير العقاري.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* PROJECTS EDITORIAL */}
      <section className="projects-page">
        <div className="wrap">

          {/* FILTER TABS */}
          <FadeUp delay={0.05}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '64px' }}>
              <SlideTabs
                tabs={FILTER_TABS.map(f => t(f.en, f.ar))}
                selected={filterIndex}
                onChange={setFilterIndex}
              />
            </div>
          </FadeUp>

          <div className="proj-editorial">
            {filteredProjects.map((proj, i) => (
              <FadeUp key={proj.id} delay={0.05} distance={40}>
                <div className={`proj-editorial-item${i % 2 === 1 ? ' reverse' : ''}`}>
                  <ImageReveal
                    src={proj.img}
                    alt={proj.name.en}
                    delay={0.1}
                    className="proj-editorial-img"
                    zoom
                  />
                  <div className="proj-editorial-body">
                    <FadeUp delay={0.18}>
                      <div className="proj-tags">
                        <span className="proj-tag">{t(proj.tag.en, proj.tag.ar)}</span>
                        <span className="proj-tag">{t(proj.type.en, proj.type.ar)}</span>
                      </div>
                    </FadeUp>
                    <WordPullUp
                      text={t(proj.name.en, proj.name.ar)}
                      tag="h2"
                      delay={0.22}
                      style={{ fontFamily: 'var(--font-en-display)', fontSize: '32px', fontWeight: 400, margin: '14px 0 8px' }}
                    />
                    <FadeUp delay={0.3}>
                      <div className="loc">{t(proj.loc.en, proj.loc.ar)}</div>
                      <p>{t(proj.desc.en, proj.desc.ar)}</p>
                      <p style={{ fontSize: '13px', color: 'rgba(33,31,26,.55)', marginBottom: '28px' }}>
                        {t(proj.detail.en, proj.detail.ar)}
                      </p>
                    </FadeUp>
                    <FadeUp delay={0.38}>
                      <button className="pill-btn" onClick={() => setSelected(proj)}>
                        {t('Explore Project', 'استكشف المشروع')} →
                      </button>
                    </FadeUp>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <FadeUp distance={40} style={{ padding: '0 48px', marginBottom: '110px' }}>
        <div className="cta-banner" style={{ margin: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1800&h=700&fit=crop&auto=format"
            alt="Contact Gardenia"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="cta-banner-content">
            <h2>{t('Interested in a project?', 'مهتم بأحد مشروعاتنا؟')}</h2>
            <p>{t('Request a brochure, book a site visit, or speak directly with our advisory team.', 'اطلب بروشور المشروع أو احجز زيارة معاينة وتحدث مع فريقنا الاستشاري.')}</p>
            <button
              className="cta-banner-btn"
              onClick={() => { onNavigate('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              {t('Get In Touch', 'تواصل معنا')}
            </button>
          </div>
        </div>
      </FadeUp>

      {/* PROJECT DETAIL OVERLAY */}
      {selected && (
        <div className="proj-overlay" onClick={() => setSelected(null)}>
          <div className="proj-overlay-inner" onClick={e => e.stopPropagation()}>
            <div className="proj-overlay-img">
              <img src={selected.img} alt={selected.name.en} />
            </div>
            <div className="proj-overlay-body">
              <button className="proj-overlay-close" aria-label="Close modal" onClick={() => setSelected(null)}>✕</button>
              <div className="proj-tags">
                <span className="proj-tag">{t(selected.tag.en, selected.tag.ar)}</span>
                <span className="proj-tag">{t(selected.type.en, selected.type.ar)}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-en-display)', fontSize: '28px', fontWeight: 400, margin: '4px 0' }}>
                {t(selected.name.en, selected.name.ar)}
              </h3>
              <div style={{ fontSize: '13.5px', color: 'var(--gold-deep)', fontWeight: 500 }}>{t(selected.loc.en, selected.loc.ar)}</div>
              <div className="divider" />
              <p style={{ fontSize: '15px', lineHeight: 1.75, color: 'rgba(33,31,26,.8)' }}>{t(selected.desc.en, selected.desc.ar)}</p>
              <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'rgba(33,31,26,.65)', background: 'rgba(33,31,26,.04)', padding: '12px 16px', borderRadius: 10 }}>
                {t(selected.detail.en, selected.detail.ar)}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: '8px' }}>
                <button
                  className="pill-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleEnquire(selected)}
                >
                  {t('Enquire About This Project', 'طلب تفاصيل وحجز هذا المشروع')} <ArrowRight size={14} />
                </button>

                <a
                  href={getWhatsAppUrl(selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    background: 'rgba(37, 211, 102, 0.12)',
                    color: '#15803d',
                    border: '1px solid rgba(37, 211, 102, 0.3)',
                    padding: '12px 20px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37, 211, 102, 0.22)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37, 211, 102, 0.12)')}
                >
                  <MessageCircle size={16} />
                  {t('Chat with Sales on WhatsApp', 'استفسار عبر واتساب المبيعات')}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

