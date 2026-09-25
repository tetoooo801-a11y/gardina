import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../context/LangContext'
import { FadeUp, WordPullUp, ParallaxImage } from '../components/Animate'
import {
  MessageCircle,
  ArrowRight,
  Phone,
  MapPin,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Download,
} from 'lucide-react'
import type { Page, ContactPrefill } from '../App'
import Skiper49 from '../components/ui/skiper49'

interface ProjectsProps {
  onNavigate: (page: Page, prefill?: ContactPrefill) => void
}

export type CategoryFilterKey =
  | 'all'
  | 'residential'
  | 'commercial'
  | 'villas'
  | 'night'

export type RegionFilterKey = 'all' | '10th' | 'sohag'

export interface GalleryItem {
  id: string
  img: string
  title: { en: string; ar: string }
  category: 'residential' | 'commercial' | 'villas' | 'night'
  region: '10th' | 'sohag' | 'both'
  loc: { en: string; ar: string }
  categoryLabel: { en: string; ar: string }
  caption: { en: string; ar: string }
  description: { en: string; ar: string }
}

const CATEGORY_TAGS: Array<{ key: CategoryFilterKey; en: string; ar: string }> = [
  { key: 'all', en: 'All Photos (21)', ar: 'كافة الصور (21)' },
  { key: 'residential', en: 'Residential Communities', ar: 'المجتمعات السكنية' },
  { key: 'commercial', en: 'Commercial & Strip Malls', ar: 'المراكز التجارية والستريب مول' },
  { key: 'villas', en: 'Villas & Mansions', ar: 'الفيلات والقصور' },
  { key: 'night', en: 'Night Facades & Lighting', ar: 'الواجهات الليلية والإضاءة' },
]

const REGIONAL_FILTERS: Array<{ key: RegionFilterKey; en: string; ar: string }> = [
  { key: 'all', en: 'All Destinations', ar: 'كافة الوجهات' },
  { key: '10th', en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
  { key: 'sohag', en: 'New Sohag', ar: 'مدينة سوهاج الجديدة' },
]

const CONSTRUCTION_STANDARDS = [
  {
    title: { en: 'Architectural Consistency', ar: 'التناسق المعماري الموحد' },
    desc: {
      en: 'Signature New Classic exterior lines, natural stone cladding, and balanced symmetry integrated across all typologies.',
      ar: 'خطوط خارجية كلاسيكية جديدة مميزة، تكسيات حجرية طبيعية، وتناسق متوازن مدمج عبر كافة الأنماط والمشروعات.',
    },
    badge: { en: 'New Classic Heritage', ar: 'أصالة كلاسيكية حديثة' },
  },
  {
    title: { en: 'Prime Accessibility', ar: 'المواقع الاستراتيجية وسهولة الوصول' },
    desc: {
      en: 'Strategic positioning along key arterial roads in both 10th of Ramadan City and New Sohag.',
      ar: 'تموضع استراتيجي على أهم المحاور والشرايين الرئيسية في كل من مدينة العاشر من رمضان ومدينة سوهاج الجديدة.',
    },
    badge: { en: 'Strategic Arterials', ar: 'شرايين ومحاور رئيسية' },
  },
  {
    title: { en: 'Integrated Ecosystems', ar: 'منظومات ومجتمعات متكاملة' },
    desc: {
      en: 'Seamless physical proximity between living spaces, daily retail conveniences, and essential medical care.',
      ar: 'ترابط وتقارب مدروس بين المساحات السكنية، والمراكز التجارية والخدمات اليومية، ومراكز الرعاية الطبية الأساسية.',
    },
    badge: { en: 'Full Life Integration', ar: 'تكامل معيشي شامل' },
  },
  {
    title: { en: 'Investment Longevity', ar: 'استدامة القيمة والعائد الاستثماري' },
    desc: {
      en: 'Built with durable materials and meticulous engineering to ensure sustained capital appreciation.',
      ar: 'تنفيذ بخامات معمرة فائقة الجودة وهندسة دقيقة تضمن نمواً متواصلاً في رأس المال وقيمة الأصول عبر الأجيال.',
    },
    badge: { en: 'Capital Appreciation', ar: 'نمو مستدام للأصول' },
  },
]

// Official Architectural Gallery items loaded from Google Drive portfolio
const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-01',
    img: '/images/gallery/gallery-01.jpg',
    categoryLabel: { en: 'Residential Community', ar: 'مجتمع سكني متكامل' },
    title: { en: 'Gardenia Residential Flagship', ar: 'الصرح السكني الرائد — جاردينيا' },
    category: 'residential',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Lush landscaped gardens, water features, and balanced New Classic residential architecture.',
      ar: 'حدائق غنّاء منسقة ونوافير مائية مميزة وواجهات سكنية متناغمة تعكس أرقى معايير السكن العائلي الهادئ.',
    },
    description: {
      en: 'Signature low-rise residential enclave featuring open parklands, pedestrian walks, and serene community ambiance.',
      ar: 'مجمع سكني راقٍ يتسم بالمساحات الخضراء المفتوحة ومسارات التنزه وبيئة مجتمعية هادئة وآمنة.',
    },
  },
  {
    id: 'gallery-02',
    img: '/images/gallery/gallery-02.jpg',
    categoryLabel: { en: 'Family Living', ar: 'حياة عائلية متكاملة' },
    title: { en: 'Lakeside Family Living', ar: 'إطلالات البحيرات والحياة العائلية' },
    category: 'residential',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Serene lakefront promenade and green parks designed for healthy family upbringing.',
      ar: 'ممشى مائي هادئ ومساحات خضراء مفتوحة صُممت لتوفير بيئة عائلية آمنة ومريحة.',
    },
    description: {
      en: 'Master-planned surroundings where classical architecture meets tranquil water features and manicured lawns.',
      ar: 'محيط عمراني مدروس يجمع بين العمارة الكلاسيكية والمسطحات المائية الساحرة والحدائق المنسقة.',
    },
  },
  {
    id: 'gallery-03',
    img: '/images/gallery/gallery-03.jpg',
    categoryLabel: { en: 'Terracotta Residences', ar: 'عمارة كلاسيكية متوسطية' },
    title: { en: 'Terracotta Heights Residence', ar: 'كمبوند تيراكوتا هايتس السكني' },
    category: 'residential',
    region: 'sohag',
    loc: { en: 'New Sohag', ar: 'مدينة سوهاج الجديدة' },
    caption: {
      en: 'Mediterranean terracotta roofs, sculpted landscape gardens, and private low-density living.',
      ar: 'أسقف كلاسيكية بنمط القرميد، حدائق هندسية منسقة، وكثافة سكانية منخفضة لضمان الخصوصية والهدوء.',
    },
    description: {
      en: 'Timeless Mediterranean aesthetics, earthy stone textures, and generous garden setbacks.',
      ar: 'جماليات معمارية خالدة، تكسيات حجرية متقنة، ومساحات ارتداد خضراء رحبة تعزز الهدوء والراحة.',
    },
  },
  {
    id: 'gallery-04',
    img: '/images/gallery/gallery-04.jpg',
    categoryLabel: { en: 'Architectural Elevation', ar: 'تفاصيل معمارية راقية' },
    title: { en: 'Grand Balcony Elevations', ar: 'شرفات الواجهات البانورامية' },
    category: 'residential',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Expansive private terraces and high-ceiling master bedrooms overlooking community parks.',
      ar: 'تراسات خاصة واسعة وغرف نوم رئيسية بأسقف مرتفعة تطل على المساحات الخضراء المفتوحة.',
    },
    description: {
      en: 'Crafted with artisanal iron railings, stone balustrades, and high energy-efficient glass systems.',
      ar: 'درابزينات حديد مشغول يدوية الصنع وتفاصيل معمارية حجرية وأنظمة زجاجية عازلة للحرارة والصوت.',
    },
  },
  {
    id: 'gallery-05',
    img: '/images/gallery/gallery-05.jpg',
    categoryLabel: { en: 'Landscape & Parks', ar: 'اللاندسكيب والحدائق' },
    title: { en: 'Garden Promenade Walkways', ar: 'الممرات والجادات الخضراء' },
    category: 'residential',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Dedicated pedestrian-first pathways separated from vehicle circulation.',
      ar: 'مسارات مشاة مخصصة محاطة بالأشجار والنباتات المعمرة مفصولة تماماً عن حركة السيارات.',
    },
    description: {
      en: 'Shaded walking avenues lined with indigenous flora, ornamental trees, and continuous seating niches.',
      ar: 'جادات مظللة بأشجار النخيل والورود المعمرة مع مقاعد استرخاء هادئة موزعة بعناية.',
    },
  },
  {
    id: 'gallery-06',
    img: '/images/gallery/gallery-06.jpg',
    categoryLabel: { en: 'Night Architecture', ar: 'واجهات ليلية مضيئة' },
    title: { en: 'Illuminated Boulevard by Night', ar: 'البوليفارد السكني المضيء ليلاً' },
    category: 'night',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Atmospheric architectural lighting highlighting exterior stone and wrought-iron textures.',
      ar: 'إضاءة معمارية ذكية تبرز فخامة تفاصيل الواجهات الحجرية والحديد المشغول ليلاً.',
    },
    description: {
      en: 'Concealed warm LED lighting illuminating building facade pilasters, entrance canopies, and private parking driveways.',
      ar: 'إضاءة دافئة خفية تبرز الأعمدة الحجرية ومداخل العمارات ومواقف السيارات الخاصة بانسيابية وفخامة.',
    },
  },
  {
    id: 'gallery-07',
    img: '/images/gallery/gallery-07.jpg',
    categoryLabel: { en: 'Night Architecture', ar: 'واجهات ليلية مضيئة' },
    title: { en: 'Warm Evening Facade', ar: 'الواجهات المسائية الدافئة' },
    category: 'night',
    region: 'sohag',
    loc: { en: 'New Sohag', ar: 'مدينة سوهاج الجديدة' },
    caption: {
      en: 'Cozy ambient glow creating a tranquil ambiance across the residential community.',
      ar: 'أجواء مسائية ساحرة بإضاءة هادئة تمنح شعوراً دائماً بالدفء والأمان.',
    },
    description: {
      en: 'Nighttime perspective demonstrating the harmony of building proportions and ambient street illumination.',
      ar: 'مشهد ليلي يبرز تناسق الكتل المعمارية وتكامل الإضاءة الهادئة للشوارع الداخلية.',
    },
  },
  {
    id: 'gallery-08',
    img: '/images/gallery/gallery-08.jpg',
    categoryLabel: { en: 'Night Architecture', ar: 'واجهات ليلية مضيئة' },
    title: { en: 'Contemporary Classical Elevation', ar: 'التصميم الكلاسيكي الحديث' },
    category: 'night',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Multi-layered facade lighting emphasizing symmetry and grand entrance portals.',
      ar: 'إضاءة هندسية متعددة المستويات تبرز التناظر المعماري ومداخل العمارات الفخمة.',
    },
    description: {
      en: 'Refined architectural symmetry enhanced by vertical accent lighting along central and corner bays.',
      ar: 'تناغم هندسي رفيع تبرزه الإضاءات الرأسية على الواجهات والأركان لتعزيز الحضور المعماري المهيب.',
    },
  },
  {
    id: 'gallery-09',
    img: '/images/gallery/gallery-09.jpg',
    categoryLabel: { en: 'Night Architecture', ar: 'واجهات ليلية مضيئة' },
    title: { en: 'Dusk Skyline Vista', ar: 'المشهد المسائي للأفق المعماري' },
    category: 'night',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Harmonious building heights and roof profiles blending into the desert sunset.',
      ar: 'تناغم في ارتفاعات المباني والتشكيلات الهندسية مع ألوان الغروب الساحرة.',
    },
    description: {
      en: 'Thoughtful urban density allowing open sky views and fresh cross-ventilation breezes.',
      ar: 'تخطيط عمراني متطور يضمن تدفق الهواء النقي وإطلالات مفتوحة على الأفق دون حجب.',
    },
  },
  {
    id: 'gallery-10',
    img: '/images/gallery/gallery-10.jpg',
    categoryLabel: { en: 'Family Living', ar: 'حياة عائلية متكاملة' },
    title: { en: 'Sunlit Family Lawn', ar: 'المروج الخضراء وأنشطة العائلة' },
    category: 'residential',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Expansive manicured open lawns where children play freely and securely.',
      ar: 'مروج خضراء ممتدة توفر بيئة ترفيهية حيوية وآمنة للأطفال والأنشطة العائلية.',
    },
    description: {
      en: 'Vibrant daytime community setting with wide pedestrian paths, flowering borders, and residential calm.',
      ar: 'بيئة سكنية نهارية مفعمة بالحيوية بممرات رحيبة ومساحات آمنة للأطفال والراحة العائلية.',
    },
  },
  {
    id: 'gallery-11',
    img: '/images/gallery/gallery-11.jpg',
    categoryLabel: { en: 'Night Architecture', ar: 'واجهات ليلية مضيئة' },
    title: { en: 'Twilight Courtyard', ar: 'الفناء السكني وقت الشفق' },
    category: 'night',
    region: 'sohag',
    loc: { en: 'New Sohag', ar: 'مدينة سوهاج الجديدة' },
    caption: {
      en: 'Private inner courtyards designed for peaceful evening gatherings.',
      ar: 'أفنية داخلية خاصة مصممة لتوفير أقصى درجات الخصوصية والراحة للجلسات المسائية.',
    },
    description: {
      en: 'Balanced illumination casting soft reflections across landscaped greenery and modern facades.',
      ar: 'توزيع ضوئي متوازن يلقي بظلال ناعمة على المساحات الخضراء والواجهات المعمارية العصرية.',
    },
  },
  {
    id: 'gallery-12',
    img: '/images/gallery/gallery-12.jpg',
    categoryLabel: { en: 'Night Architecture', ar: 'واجهات ليلية مضيئة' },
    title: { en: 'Celestial Night Elevation', ar: 'الواجهة المعمارية تحت سماء النجوم' },
    category: 'night',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Vertical architectural grandeur illuminated beneath a brilliant starry canopy.',
      ar: 'صورة رأسية تبرز شموخ العمارة الكلاسيكية الحديثة وارتفاعاتها الفخمة تحت سماء متلألئة.',
    },
    description: {
      en: 'Stunning vertical perspective showcasing corner stone detailing, balcony railings, and architectural crown.',
      ar: 'منظور رأسي مذهل يبرز تفاصيل الحجر المشغول والدرابزينات والتاج المعماري المميز للواجهة.',
    },
  },
  {
    id: 'gallery-13',
    img: '/images/gallery/gallery-13.jpg',
    categoryLabel: { en: 'Commercial Strip Mall', ar: 'المراكز والستريب مول' },
    title: { en: 'Twin Mall Grand Portal', ar: 'المدخل الرئيسي — توين مول' },
    category: 'commercial',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Impressive double-height glass atrium entrance with Costa Coffee flagship and retail shops.',
      ar: 'مدخل رئيسي مهيب بارتفاع مضاعف وواجهات زجاجية بانورامية يضم كافيهات ومتاجر راقية.',
    },
    description: {
      en: 'High-profile commercial destination designed for prominent retail visibility and effortless visitor flow.',
      ar: 'وجهة تجارية راقية صُممت لتمنح العلامات التجارية أقصى درجات الظهور وتوفر حركة زوار انسيابية.',
    },
  },
  {
    id: 'gallery-14',
    img: '/images/gallery/gallery-14.jpg',
    categoryLabel: { en: 'Commercial Strip Mall', ar: 'المراكز والستريب مول' },
    title: { en: 'Twin Mall Promenade Boulevard', ar: 'ممشى وبوليفارد توين مول' },
    category: 'commercial',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'High-visibility open-air avenue featuring international dining brands, KFC, Costa, and palm landscaping.',
      ar: 'بوليفارد تجاري مفتوح يضم كبرى العلامات العالمية والمطاعم وممشى عريض بأشجار النخيل.',
    },
    description: {
      en: 'Wide promenade setting engineered for premier dining, retail therapy, and bustling social engagement.',
      ar: 'ممشى تجاري فسيح يجمع بين تجارب التسوق الراقية والجلسات الخارجية الممتعة.',
    },
  },
  {
    id: 'gallery-15',
    img: '/images/gallery/gallery-15.jpg',
    categoryLabel: { en: 'Commercial Strip Mall', ar: 'المراكز والستريب مول' },
    title: { en: 'Open-Air Retail Arcades', ar: 'الأروقة والمحلات التجارية المفتوحة' },
    category: 'commercial',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Outdoor shaded walkways ensuring vibrant customer footfall throughout all seasons.',
      ar: 'أروقة وممرات مظللة للمشاة تضمن تجربة تسوق مريحة وحركة زوار نشطة على مدار العام.',
    },
    description: {
      en: 'Architectural canopy shading and contemporary decorative lattice patterns integrating modern commerce with comfort.',
      ar: 'مظلات معمارية وزخارف هندسية معاصرة تدمج بين راحة المتسوقين وفخامة المنشأة التجارية.',
    },
  },
  {
    id: 'gallery-16',
    img: '/images/gallery/gallery-16.jpg',
    categoryLabel: { en: 'Commercial Strip Mall', ar: 'المراكز والستريب مول' },
    title: { en: 'Panoramic Storefronts', ar: 'واجهات العرض البانورامية' },
    category: 'commercial',
    region: 'sohag',
    loc: { en: 'New Sohag', ar: 'مدينة سوهاج الجديدة' },
    caption: {
      en: 'Expansive floor-to-ceiling glass fronts maximizing product exposure and brand prestige.',
      ar: 'واجهات زجاجية ممتدة من الأرض إلى السقف تمنح المتاجر أقصى درجات الظهور والتميز.',
    },
    description: {
      en: 'Continuous storefront display opportunities tailored for luxury flagships, banks, and lifestyle brands.',
      ar: 'مساحات واجهات مستمرة ومصممة خصيصاً للبنوك والعلامات التجارية الكبرى والصيدليات والمطاعم.',
    },
  },
  {
    id: 'gallery-17',
    img: '/images/gallery/gallery-17.jpg',
    categoryLabel: { en: 'Commercial Strip Mall', ar: 'المراكز والستريب مول' },
    title: { en: 'Retail Boulevard Perspective', ar: 'منظور البوليفارد التجاري' },
    category: 'commercial',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Strategic arterial frontage offering immediate connectivity and abundant parking facilities.',
      ar: 'موقع حيوي مباشر على المحاور الرئيسية مع ساحات انتظار سيارات فسيحة وسهلة الوصول.',
    },
    description: {
      en: 'Clear lines of sight from primary transit routes, creating an instant landmark for commerce.',
      ar: 'رؤية بصرية واضحة ومباشرة من الطرق السريعة والمحاور، مما يجعله علامة استدلالية بارزة.',
    },
  },
  {
    id: 'gallery-18',
    img: '/images/gallery/gallery-18.jpg',
    categoryLabel: { en: 'Commercial Strip Mall', ar: 'المراكز والستريب مول' },
    title: { en: 'Commercial Plaza Courtyard', ar: 'بلازا الساحة التجارية' },
    category: 'commercial',
    region: '10th',
    loc: { en: '10th of Ramadan City', ar: 'مدينة العاشر من رمضان' },
    caption: {
      en: 'Vibrant meeting spaces blending al fresco cafe dining with open-air plazas.',
      ar: 'مساحات لقاء وتواصل حيوية تجمع بين جلسات المقاهي الخارجية والساحات المفتوحة.',
    },
    description: {
      en: 'Civic commercial hub hosting outdoor community markets, evening gatherings, and weekend family activities.',
      ar: 'ساحة تجارية واجتماعية تنبض بالحياة وتستضيف الفعاليات العائلية والجلسات المسائية الراقية.',
    },
  },
  {
    id: 'gallery-19',
    img: '/images/gallery/gallery-19.jpg',
    categoryLabel: { en: 'Commercial Strip Mall', ar: 'المراكز والستريب مول' },
    title: { en: 'Urban Mixed-Use Frontage', ar: 'الواجهة الحضرية المتكاملة' },
    category: 'commercial',
    region: 'sohag',
    loc: { en: 'New Sohag', ar: 'مدينة سوهاج الجديدة' },
    caption: {
      en: 'Seamless combination of ground-floor retail and executive upper-level suites.',
      ar: 'تكامل ذكي بين المحلات التجارية في الدور الأرضي والمكاتب الإدارية في الأدوار العلوية.',
    },
    description: {
      en: 'Integrated destination bringing together everyday retail conveniences and professional corporate headquarters.',
      ar: 'صرح متعدد الاستخدامات يجمع بين التسوق والخدمات اليومية والمقرات الإدارية والعيادات الطبية.',
    },
  },
  {
    id: 'gallery-20',
    img: '/images/gallery/gallery-20.jpg',
    categoryLabel: { en: 'Villas & Mansions', ar: 'فيلات وقصور خاصة' },
    title: { en: 'Luxury Private Villa Estate', ar: 'الفيلا الملكية الفاخرة بحمام سباحة' },
    category: 'villas',
    region: 'sohag',
    loc: { en: 'New Sohag', ar: 'مدينة سوهاج الجديدة' },
    caption: {
      en: 'Bespoke Mediterranean mansion with private swimming pool, outdoor lounge, and secluded gardens.',
      ar: 'قصر خاص بتصميم متوسطي فاخر مع حمام سباحة خاص وجلسات استرخاء خارجية وحدائق مسورة.',
    },
    description: {
      en: 'The pinnacle of private luxury living, featuring floor-to-ceiling arched glass openings and resort-caliber poolside terraces.',
      ar: 'قمة الفخامة والخصوصية العائلية، بواجهات مقوسة واسعة وتراسات فندقية مطلة على المسبح والحدائق.',
    },
  },
  {
    id: 'gallery-21',
    img: '/images/gallery/gallery-21.jpg',
    categoryLabel: { en: 'Villas & Mansions', ar: 'فيلات وقصور خاصة' },
    title: { en: 'Signature Royal Mansion', ar: 'القصر المعماري الكلاسيكي' },
    category: 'villas',
    region: 'sohag',
    loc: { en: 'New Sohag', ar: 'مدينة سوهاج الجديدة' },
    caption: {
      en: 'Timeless arched colonnades, stone balustrades, and stately Mediterranean architecture.',
      ar: 'أقواس حجرية كلاسيكية وتناغم معماري ملكي يعكس قمة الفخامة والخصوصية المطلقة.',
    },
    description: {
      en: 'Grand symmetry, Italian cypress landscaping, and majestic colonnaded balconies defining eternal distinction.',
      ar: 'تناظر مهيب وأشجار السرو الإيطالية وشرفات بأعمدة كلاسيكية تعكس روعة الهندسة والتميز الدائم.',
    },
  },
]

export default function Projects({ onNavigate }: ProjectsProps) {
  const { t, isAr } = useLang()
  const [activeCategory, setActiveCategory] = useState<CategoryFilterKey>('all')
  const [activeRegion, setActiveRegion] = useState<RegionFilterKey>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Filter gallery photos dynamically
  const filteredPhotos = useMemo(() => {
    return galleryItems.filter(item => {
      let matchesCat = true
      if (activeCategory === 'residential') matchesCat = item.category === 'residential'
      else if (activeCategory === 'commercial') matchesCat = item.category === 'commercial'
      else if (activeCategory === 'villas') matchesCat = item.category === 'villas'
      else if (activeCategory === 'night') matchesCat = item.category === 'night'

      let matchesReg = true
      if (activeRegion === '10th') matchesReg = item.region === '10th' || item.region === 'both'
      else if (activeRegion === 'sohag') matchesReg = item.region === 'sohag' || item.region === 'both'

      return matchesCat && matchesReg
    })
  }, [activeCategory, activeRegion])

  // Current photo in lightbox
  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(prev => (prev! > 0 ? prev! - 1 : filteredPhotos.length - 1))
  }, [lightboxIndex, filteredPhotos.length])

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return
    setLightboxIndex(prev => (prev! < filteredPhotos.length - 1 ? prev! + 1 : 0))
  }, [lightboxIndex, filteredPhotos.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') setLightboxIndex(null)
      else if (e.key === 'ArrowLeft') {
        if (isAr) handleNext()
        else handlePrev()
      } else if (e.key === 'ArrowRight') {
        if (isAr) handlePrev()
        else handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [lightboxIndex, handlePrev, handleNext, isAr])

  const salesWhatsAppNumber = '201050176306'

  const getWhatsAppInquiryUrl = (photo: GalleryItem) => {
    const pTitle = isAr ? photo.title.ar : photo.title.en
    const pLoc = isAr ? photo.loc.ar : photo.loc.en
    const text = isAr
      ? `مرحباً جاردينيا هايتس للتطوير العقاري، أود الاستفسار عن التصميم المعماري: "${pTitle}" (${pLoc}).`
      : `Hello Gardenia Heights Developments, I would like to inquire about the architectural design: "${pTitle}" (${pLoc}).`
    return `https://wa.me/${salesWhatsAppNumber}?text=${encodeURIComponent(text)}`
  }

  const generalWhatsAppUrl = `https://wa.me/${salesWhatsAppNumber}?text=${encodeURIComponent(
    isAr
      ? 'مرحباً جاردينيا هايتس للتطوير العقاري، أود الاستفسار والحصول على البروشور المعماري وتفاصيل المشروعات.'
      : 'Hello Gardenia Heights Developments, I would like to inquire and receive the architectural portfolio.'
  )}`

  return (
    <>
      {/* 1. HERO SECTION: Architectural Gallery Header */}
      <section className="page-hero" style={{ paddingBottom: '90px' }}>
        <div className="page-hero-bg">
          <ParallaxImage
            src="/images/projects/residential-flagship.jpg"
            alt="Gardenia Heights Architectural Gallery"
            strength={120}
            containerStyle={{ position: 'absolute', inset: 0 }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(12,22,14,0.78) 0%, rgba(12,22,14,0.92) 80%, rgba(12,22,14,1) 100%)',
            }}
          />
        </div>

        <div className="wrap page-hero-content" style={{ maxWidth: '1060px' }}>
          {/* Eyebrow / Badge */}
          <FadeUp delay={0.1}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '7px 18px',
                borderRadius: '999px',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.45)',
                color: 'var(--gold)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: isAr ? 0 : '0.2em',
                textTransform: isAr ? 'none' : 'uppercase',
                marginBottom: '20px',
                fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)' }} />
              <span>{t('Architectural Gallery', 'معرض الصور المعماري')}</span>
            </div>
          </FadeUp>

          {/* Main Headline */}
          <WordPullUp
            text={t('A Unified Vision of Architectural Distinction', 'رؤية معمارية موحدة بآفاق استثنائية')}
            tag="h1"
            delay={0.2}
            stagger={0.07}
            style={{
              fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
              fontWeight: isAr ? 700 : 300,
              lineHeight: isAr ? 1.25 : 1.05,
              letterSpacing: isAr ? 0 : '-0.02em',
              color: 'var(--petal)',
              fontSize: isAr ? 'clamp(36px, 5.5vw, 68px)' : 'clamp(42px, 6vw, 76px)',
              marginBottom: '24px',
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          />

          {/* Sub-headline */}
          <FadeUp delay={0.38}>
            <p
              style={{
                fontSize: isAr ? '16px' : '17px',
                lineHeight: 1.78,
                color: 'rgba(255, 253, 248, 0.88)',
                maxWidth: '840px',
                margin: '0 auto',
                fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
              }}
            >
              {t(
                'Explore our curated architectural gallery showcasing the distinctive typologies of Gardenia Heights Developments. From timeless New Classic residential facades and vibrant commercial boulevards to executive corporate suites and modern medical centers across 10th of Ramadan City and New Sohag.',
                'استكشف معرضنا المعماري المصور الذي يبرز تنوع وفخامة الأنماط الهندسية لدى جاردينيا هايتس للتطوير العقاري؛ من الواجهات السكنية الكلاسيكية الجديدة، والمراكز والممرات التجارية المفتوحة، إلى المقرات الإدارية الراقية والمراكز الطبية التخصصية في مدينتي العاشر من رمضان وسوهاج الجديدة.'
              )}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* 2. GALLERY INTERACTIVE FILTER BAR & PHOTO GRID */}
      <section className="projects-page" style={{ paddingTop: '50px', paddingBottom: '100px' }}>
        <div className="wrap">
          {/* Interactive Category Filter Pills */}
          <FadeUp delay={0.05}>
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                {CATEGORY_TAGS.map(tab => {
                  const isActive = activeCategory === tab.key
                  return (
                    <button
                      key={tab.key}
                      onClick={() => setActiveCategory(tab.key)}
                      style={{
                        position: 'relative',
                        padding: '11px 22px',
                        borderRadius: '999px',
                        fontSize: isAr ? '13.5px' : '13px',
                        fontWeight: isActive ? 600 : 500,
                        letterSpacing: isAr ? 0 : '0.02em',
                        color: isActive ? '#0e1a12' : 'rgba(33, 31, 26, 0.78)',
                        background: isActive
                          ? 'linear-gradient(135deg, #f2dd95 0%, #d4af37 100%)'
                          : 'rgba(33, 31, 26, 0.05)',
                        border: isActive
                          ? '1px solid #d4af37'
                          : '1px solid rgba(33, 31, 26, 0.12)',
                        boxShadow: isActive ? '0 4px 18px rgba(212, 175, 55, 0.35)' : 'none',
                        cursor: 'pointer',
                        transition: 'all 0.22s ease',
                        fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(33, 31, 26, 0.09)'
                          e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.45)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          e.currentTarget.style.background = 'rgba(33, 31, 26, 0.05)'
                          e.currentTarget.style.borderColor = 'rgba(33, 31, 26, 0.12)'
                        }
                      }}
                    >
                      {t(tab.en, tab.ar)}
                    </button>
                  )
                })}
              </div>
            </div>
          </FadeUp>

          {/* Regional Footprint Quick Toggle */}
          <FadeUp delay={0.12}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '54px',
                padding: '8px 18px',
                background: 'rgba(244, 240, 230, 0.65)',
                borderRadius: '999px',
                width: 'fit-content',
                margin: '0 auto 54px',
                border: '1px solid rgba(212, 175, 55, 0.25)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'var(--gold-deep)',
                  fontSize: '12px',
                  fontWeight: 600,
                  marginRight: isAr ? 0 : '8px',
                  marginLeft: isAr ? '8px' : 0,
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                }}
              >
                <MapPin size={14} />
                <span>{t('Filter by Destination:', 'تصفية حسب الوجهة:')}</span>
              </div>

              {REGIONAL_FILTERS.map(reg => {
                const isRegActive = activeRegion === reg.key
                return (
                  <button
                    key={reg.key}
                    onClick={() => setActiveRegion(reg.key)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: isRegActive ? 600 : 500,
                      background: isRegActive ? 'var(--green)' : 'transparent',
                      color: isRegActive ? '#FFFDF8' : 'rgba(33, 31, 26, 0.7)',
                      border: isRegActive ? '1px solid var(--green)' : '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                    }}
                  >
                    {t(reg.en, reg.ar)}
                  </button>
                )
              })}
            </div>
          </FadeUp>

          {/* 3. PURE ARCHITECTURAL PHOTO 3D COVERFLOW GALLERY (NO TEXT ON PHOTOS) */}
          <div className="w-full">
            <Skiper49
              images={filteredPhotos.map(photo => ({
                src: photo.img,
                alt: isAr ? photo.title.ar : photo.title.en,
              }))}
              showPagination={true}
              showNavigation={true}
              loop={true}
              autoplay={true}
              slideHeight={440}
              slideWidth={340}
              onImageClick={(_, index) => setLightboxIndex(index)}
            />
          </div>

          {/* Empty state fallback */}
          {filteredPhotos.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'rgba(33, 31, 26, 0.65)',
                fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
              }}
            >
              <p style={{ fontSize: '16px', marginBottom: '14px' }}>
                {t(
                  'No photos match this category or destination filter.',
                  'لا توجد صور تطابق هذا التصنيف أو معايير الوجهة المحددة.'
                )}
              </p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setActiveRegion('all')
                }}
                className="pill-btn"
              >
                {t('Reset Filters', 'عرض كافة الصور')}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3. LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(6, 12, 8, 0.94)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              padding: '20px 24px',
            }}
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Toolbar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto 16px',
                zIndex: 10,
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    background: 'rgba(212, 175, 55, 0.2)',
                    border: '1px solid rgba(212, 175, 55, 0.45)',
                    color: '#f4dc9b',
                    fontSize: '12px',
                    fontWeight: 600,
                    padding: '5px 14px',
                    borderRadius: '999px',
                    fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  }}
                >
                  {t(currentPhoto.categoryLabel.en, currentPhoto.categoryLabel.ar)}
                </span>
                <span
                  style={{
                    color: 'rgba(255, 253, 248, 0.65)',
                    fontSize: '13px',
                    fontWeight: 500,
                    fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  }}
                >
                  {isAr
                    ? `صورة ${lightboxIndex + 1} من ${filteredPhotos.length}`
                    : `Photo ${lightboxIndex + 1} of ${filteredPhotos.length}`}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Close"
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'rgba(255, 253, 248, 0.1)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  color: '#FFFDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.3)'
                  e.currentTarget.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 253, 248, 0.1)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Central Stage: Image & Prev/Next Arrows */}
            <div
              style={{
                position: 'relative',
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                overflow: 'hidden',
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous"
                style={{
                  position: 'absolute',
                  [isAr ? 'right' : 'left']: '16px',
                  zIndex: 20,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(12, 22, 14, 0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(212, 175, 55, 0.45)',
                  color: '#FFFDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.9)'
                  e.currentTarget.style.color = '#0e1a12'
                  e.currentTarget.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(12, 22, 14, 0.75)'
                  e.currentTarget.style.color = '#FFFDF8'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {isAr ? <ChevronRight size={26} /> : <ChevronLeft size={26} />}
              </button>

              {/* Main Image */}
              <motion.img
                key={currentPhoto.id}
                src={currentPhoto.img}
                alt={t(currentPhoto.title.en, currentPhoto.title.ar)}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                style={{
                  maxHeight: '68vh',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  borderRadius: '16px',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
                }}
              />

              {/* Next Button */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next"
                style={{
                  position: 'absolute',
                  [isAr ? 'left' : 'right']: '16px',
                  zIndex: 20,
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(12, 22, 14, 0.75)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(212, 175, 55, 0.45)',
                  color: '#FFFDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.9)'
                  e.currentTarget.style.color = '#0e1a12'
                  e.currentTarget.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(12, 22, 14, 0.75)'
                  e.currentTarget.style.color = '#FFFDF8'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {isAr ? <ChevronLeft size={26} /> : <ChevronRight size={26} />}
              </button>
            </div>

            {/* Bottom Caption Bar */}
            <div
              style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '16px auto 0',
                padding: '16px 24px',
                background: 'rgba(18, 30, 22, 0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: '16px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                zIndex: 10,
              }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3
                    style={{
                      fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                      fontSize: isAr ? '20px' : '22px',
                      fontWeight: isAr ? 700 : 500,
                      color: '#FFFDF8',
                      margin: 0,
                    }}
                  >
                    {t(currentPhoto.title.en, currentPhoto.title.ar)}
                  </h3>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#d4af37',
                      fontSize: '12px',
                      fontWeight: 500,
                      fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                    }}
                  >
                    <MapPin size={13} />
                    <span>{t(currentPhoto.loc.en, currentPhoto.loc.ar)}</span>
                  </div>
                </div>

                <p
                  style={{
                    color: 'rgba(255, 253, 248, 0.82)',
                    fontSize: isAr ? '13px' : '13px',
                    lineHeight: 1.6,
                    margin: 0,
                    fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  }}
                >
                  {t(currentPhoto.description.en, currentPhoto.description.ar)}
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <a
                  href={getWhatsAppInquiryUrl(currentPhoto)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(37, 211, 102, 0.18)',
                    border: '1px solid rgba(37, 211, 102, 0.5)',
                    color: '#4ade80',
                    padding: '10px 18px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    transition: 'all 0.2s',
                    fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(37, 211, 102, 0.32)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(37, 211, 102, 0.18)'
                  }}
                >
                  <MessageCircle size={16} />
                  <span>{t('Inquire via WhatsApp', 'استفسار عبر واتساب')}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    const pTitle = isAr ? currentPhoto.title.ar : currentPhoto.title.en
                    const pLoc = isAr ? currentPhoto.loc.ar : currentPhoto.loc.en
                    setLightboxIndex(null)
                    onNavigate('contact', {
                      subject: isAr
                        ? `استفسار عن التصميم المعماري: ${pTitle}`
                        : `Inquiry regarding design: ${pTitle}`,
                      message: isAr
                        ? `مرحباً فريق جاردينيا هايتس،\nأود الاستفسار والحصول على مزيد من التفاصيل والمخططات المتعلقة بالتصميم المعماري "${pTitle}" (${pLoc}).`
                        : `Hello Gardenia Heights Team,\nI would like to inquire about the architectural design "${pTitle}" located in ${pLoc}.`,
                    })
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #f3de96 0%, #d4af37 100%)',
                    color: '#0e1a12',
                    padding: '10px 20px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    transition: 'transform 0.2s',
                    fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <span>{t('Contact Us', 'تواصل معنا')}</span>
                  <span>{isAr ? '←' : '→'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. ARCHITECTURAL HIGHLIGHTS & CONSTRUCTION STANDARDS STRIP */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0d1a10 0%, #15271b 50%, #0d1a10 100%)',
          color: 'var(--petal)',
          padding: '88px 0',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(212, 175, 55, 0.25)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
          marginBottom: '100px',
        }}
      >
        {/* Ambient gold glow */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            height: '350px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 56px' }}>
            <FadeUp>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 18px',
                  borderRadius: '999px',
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.45)',
                  color: 'var(--gold)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: isAr ? 0 : '0.18em',
                  textTransform: isAr ? 'none' : 'uppercase',
                  marginBottom: '18px',
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                }}
              >
                <Sparkles size={12} />
                <span>{t('Engineering Rigor & Quality Standards', 'معايير التنفيذ والريادة الهندسية')}</span>
              </div>
            </FadeUp>

            <WordPullUp
              text={t(
                'Project Highlights & Construction Standards',
                'أبرز مميزات المشروعات ومعايير الجودة والإنشاء'
              )}
              tag="h2"
              delay={0.1}
              style={{
                fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                fontWeight: isAr ? 700 : 400,
                fontSize: isAr ? '28px' : '34px',
                lineHeight: 1.25,
                color: '#FFFDF8',
                marginBottom: '16px',
              }}
            />

            <FadeUp delay={0.2}>
              <p
                style={{
                  fontSize: isAr ? '14.5px' : '15px',
                  lineHeight: 1.7,
                  color: 'rgba(255, 253, 248, 0.8)',
                  margin: 0,
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                }}
              >
                {t(
                  'Every Gardenia Heights landmark is engineered to international architectural benchmarks, ensuring enduring value, resident privacy, and generational distinction.',
                  'كل صرح تطوره جاردينيا هايتس يُنفذ وفق أعلى المعايير المعمارية العالمية، لضمان استدامة القيمة، الخصوصية المطلقة، والتميز المتوارث عبر الأجيال.'
                )}
              </p>
            </FadeUp>
          </div>

          {/* 4 Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {CONSTRUCTION_STANDARDS.map((std, idx) => {
              return (
                <FadeUp key={idx} delay={0.1 + idx * 0.08}>
                  <div
                    style={{
                      background: 'rgba(255, 253, 248, 0.04)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(212, 175, 55, 0.22)',
                      borderRadius: '18px',
                      padding: '28px 24px',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.25s ease',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.25)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-4px)'
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.55)'
                      e.currentTarget.style.background = 'rgba(255, 253, 248, 0.07)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.22)'
                      e.currentTarget.style.background = 'rgba(255, 253, 248, 0.04)'
                    }}
                  >
                    {/* Top Row: Badge */}
                    <div style={{ marginBottom: '18px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          padding: '4px 12px',
                          borderRadius: '999px',
                          background: 'rgba(212, 175, 55, 0.12)',
                          color: '#f3dd97',
                          border: '1px solid rgba(212, 175, 55, 0.28)',
                          fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                          display: 'inline-block',
                          letterSpacing: isAr ? 0 : '0.04em',
                        }}
                      >
                        {t(std.badge.en, std.badge.ar)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                        fontSize: isAr ? '19px' : '20px',
                        fontWeight: isAr ? 700 : 500,
                        color: '#FFFDF8',
                        margin: '0 0 12px',
                        lineHeight: 1.3,
                      }}
                    >
                      {t(std.title.en, std.title.ar)}
                    </h3>

                    {/* Gold Divider Line */}
                    <div
                      style={{
                        height: '1px',
                        width: '40px',
                        background: 'linear-gradient(90deg, #d4af37, transparent)',
                        marginBottom: '14px',
                      }}
                    />

                    {/* Description */}
                    <p
                      style={{
                        fontSize: isAr ? '13.5px' : '13.5px',
                        lineHeight: 1.65,
                        color: 'rgba(255, 253, 248, 0.75)',
                        margin: 0,
                        flexGrow: 1,
                        fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                      }}
                    >
                      {t(std.desc.en, std.desc.ar)}
                    </p>
                  </div>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. INQUIRY BANNER */}
      <FadeUp distance={40} style={{ padding: '0 48px', marginBottom: '110px' }}>
        <div
          className="cta-banner"
          style={{
            margin: 0,
            borderRadius: '28px',
            overflow: 'hidden',
            position: 'relative',
            background: 'linear-gradient(135deg, #0e1c12 0%, #172c1e 50%, #0e1c12 100%)',
            border: '1px solid rgba(212, 175, 55, 0.4)',
            boxShadow: '0 24px 70px rgba(0, 0, 0, 0.55)',
          }}
        >
          <img
            src="/images/projects/residential-flagship.jpg"
            alt="Gardenia Developments"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.18,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.16) 0%, transparent 72%)',
              pointerEvents: 'none',
            }}
          />

          <div
            className="cta-banner-content"
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '68px 36px',
              textAlign: 'center',
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 18px',
                borderRadius: '999px',
                background: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.45)',
                color: 'var(--gold)',
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: isAr ? 0 : '0.18em',
                textTransform: isAr ? 'none' : 'uppercase',
                marginBottom: '20px',
                fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
              }}
            >
              <Sparkles size={12} />
              <span>{t('Unit Inquiries & Booking', 'حجز الوحدات والاستفسارات')}</span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                fontSize: isAr ? '30px' : '38px',
                fontWeight: isAr ? 700 : 400,
                color: '#FFFDF8',
                marginBottom: '16px',
                lineHeight: 1.25,
                textShadow: '0 2px 20px rgba(0,0,0,0.6)',
              }}
            >
              {t(
                'Ready to Secure Your Unit in Our Developments?',
                'جاهز لحجز وحدتك في مشروعاتنا؟'
              )}
            </h2>

            {/* Sub-headline */}
            <p
              style={{
                maxWidth: '740px',
                margin: '0 auto 34px',
                fontSize: isAr ? '15px' : '16px',
                lineHeight: 1.75,
                color: 'rgba(255, 253, 248, 0.88)',
                fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
              }}
            >
              {t(
                'Request master plans, full architectural brochures, and customized installment schedules for any unit across our integrated portfolio.',
                'اطلب المخططات العامة، البروشورات المعمارية الكاملة، وجداول السداد المصممة خصيصاً لأي وحدة عبر محفظتنا المتكاملة.'
              )}
            </p>

            {/* Action Row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '14px',
                marginBottom: '36px',
              }}
            >
              {/* Primary Button */}
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  onNavigate('contact', {
                    subject: isAr
                      ? 'طلب تحميل دليل المشروعات والمخططات الهندسية'
                      : 'Request: Download Project Portfolio & Floor Plans',
                    message: isAr
                      ? 'مرحباً جاردينيا هايتس للتطوير العقاري،\nأود استلام دليل المشروعات، المخططات الهندسية التفصيلية، وجداول السداد المتاحة.'
                      : 'Hello Gardenia Heights Developments,\nI would like to receive the comprehensive Project Portfolio, detailed floor plans, and customized payment schedules.',
                  })
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                style={{
                  background: 'linear-gradient(135deg, #f3de96 0%, #d4af37 60%, #b8905a 100%)',
                  color: '#0b1510',
                  padding: '15px 32px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  border: 'none',
                  boxShadow: '0 6px 26px rgba(212,175,55,0.45)',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1.03)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = 'scale(1)')}
              >
                <Download size={16} />
                <span>
                  {t(
                    'Download Project Portfolio & Floor Plans',
                    'تحميل دليل المشروعات والمخططات'
                  )}
                </span>
                <span>{isAr ? '←' : '→'}</span>
              </button>

              {/* Direct Hotline: 17994 */}
              <a
                href="tel:17994"
                style={{
                  background: 'rgba(255, 253, 248, 0.12)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(212, 175, 55, 0.55)',
                  color: '#FFFDF8',
                  padding: '14px 28px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.22)'
                  e.currentTarget.style.borderColor = '#d4af37'
                  e.currentTarget.style.transform = 'scale(1.03)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 253, 248, 0.12)'
                  e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.55)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <Phone size={16} style={{ color: '#d4af37' }} />
                <span>{t('Direct Hotline: 17994', 'الخط الساخن: 17994')}</span>
              </a>

              {/* WhatsApp Icon / Action */}
              <a
                href={generalWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'rgba(37, 211, 102, 0.16)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(37, 211, 102, 0.5)',
                  color: '#4ade80',
                  padding: '14px 26px',
                  borderRadius: '999px',
                  fontSize: '14px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '9px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                  transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(37, 211, 102, 0.28)'
                  e.currentTarget.style.transform = 'scale(1.03)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(37, 211, 102, 0.16)'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <MessageCircle size={17} />
                <span>{t('WhatsApp Inquiries', 'واتساب المبيعات')}</span>
              </a>
            </div>

            {/* Gold Divider */}
            <div
              style={{
                height: '1px',
                width: '180px',
                margin: '0 auto 18px',
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.7) 50%, transparent 100%)',
              }}
            />

            {/* Brand Signature */}
            <div
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
      </FadeUp>
    </>
  )
}
