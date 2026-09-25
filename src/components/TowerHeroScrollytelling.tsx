'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  AnimatePresence,
  MotionValue,
} from 'framer-motion';
import { useLang } from '../context/LangContext';

const TOTAL_FRAMES = 232;

const gardeniaLogoAr = '/gardenia-logo-collapsed.svg';
const gardeniaLogoEn = '/gardenia-logo-collapsed-en.svg';
const gardeniaLogoFull = '/gardenia-logo.svg';

interface ScrollyBeatProps {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  badge: { en: string; ar: string };
  title: { en: string; ar: string };
  subtitle: { en: string; ar: string };
  isAr: boolean;
  align?: 'center' | 'left' | 'right';
}

function ScrollyBeat({
  progress,
  range,
  badge,
  title,
  subtitle,
  isAr,
  align = 'center',
}: ScrollyBeatProps) {
  const opacity = useTransform(
    progress,
    [range[0], range[1], range[2], range[3]],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [range[0], range[1], range[2], range[3]],
    [24, 0, 0, -24]
  );

  const alignmentClasses = {
    center: 'items-center text-center max-w-3xl mx-auto',
    left: isAr
      ? 'items-start text-right max-w-xl mr-8 md:mr-24 ml-auto'
      : 'items-start text-left max-w-xl ml-8 md:ml-24 mr-auto',
    right: isAr
      ? 'items-end text-left max-w-xl ml-8 md:ml-24 mr-auto'
      : 'items-end text-right max-w-xl mr-8 md:mr-24 ml-auto',
  }[align];

  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute inset-0 flex flex-col justify-center px-6 ${alignmentClasses}`}
    >
      <span
        className="mb-3 inline-block text-[12px] font-semibold uppercase tracking-[0.25em] drop-shadow-md text-[#d4af37]"
        style={{
          fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
        }}
      >
        {isAr ? badge.ar : badge.en}
      </span>

      <h2
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.15] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
        style={{
          fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
        }}
      >
        {isAr ? title.ar : title.en}
      </h2>

      <p
        className="mt-4 text-sm sm:text-base md:text-xl font-light leading-relaxed text-white/80 max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
        style={{
          fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
        }}
      >
        {isAr ? subtitle.ar : subtitle.en}
      </p>
    </motion.div>
  );
}

interface TowerHeroScrollytellingProps {
  onNavigate?: (page: 'home' | 'about' | 'projects' | 'careers' | 'contact') => void;
}

export default function TowerHeroScrollytelling({ onNavigate }: TowerHeroScrollytellingProps) {
  const { isAr, t } = useLang();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isHeroActive, setIsHeroActive] = useState<boolean>(true);
  const [isFinaleActive, setIsFinaleActive] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const exploreIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  // Above The Fold Hero transforms (visible at start, smoothly fades out on scroll)
  const heroContentOpacity = useTransform(
    smoothProgress,
    [0.0, 0.07, 0.14],
    [1, 0.85, 0]
  );
  const heroContentY = useTransform(
    smoothProgress,
    [0.0, 0.14],
    [0, -28]
  );
  const heroContentScale = useTransform(
    smoothProgress,
    [0.0, 0.14],
    [1, 0.96]
  );

  // Logo Reveal Animation at the end of the scroll (after all text beats finish)
  const logoOpacity = useTransform(
    smoothProgress,
    [0.82, 0.88, 0.98, 1.0],
    [0, 1, 1, 1]
  );
  const logoScale = useTransform(
    smoothProgress,
    [0.82, 0.88, 0.98, 1.0],
    [0.92, 1, 1.03, 1.03]
  );
  const logoY = useTransform(
    smoothProgress,
    [0.82, 0.88, 0.98, 1.0],
    [30, 0, 0, 0]
  );

  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Enable high-quality image smoothing & bicubic scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = width / height;

    let drawWidth = width;
    let drawHeight = height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = width;
      drawHeight = width / imgRatio;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgRatio;
      offsetX = (width - drawWidth) / 2;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(3, '0');
      img.src = `/sequence/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
          handleResize();
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setImagesLoaded(true);
          handleResize();
        }
      };

      images.push(img);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest: number) => {
      const heroActive = latest < 0.15;
      const finaleActive = latest >= 0.82;
      setIsHeroActive(prev => (prev !== heroActive ? heroActive : prev));
      setIsFinaleActive(prev => (prev !== finaleActive ? finaleActive : prev));

      if (!imagesLoaded) return;
      const targetIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(latest * (TOTAL_FRAMES - 1)))
      );

      if (targetIndex !== currentFrameRef.current) {
        currentFrameRef.current = targetIndex;
        renderFrame(targetIndex);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, imagesLoaded, renderFrame]);

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
        {/* Dynamic HTML5 Canvas with Contrast & Sharpness Grading */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full pointer-events-none"
          style={{
            filter: 'contrast(1.12) brightness(0.94) saturate(1.15)',
          }}
        />

        {/* 🎬 35MM CINEMATIC FILM GRAIN */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-35 mix-blend-overlay">
          <filter id="hero-film-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-film-grain)" />
        </svg>

        {/* 🌿 LUXURY BOTANICAL TRANSLUCENT GREEN EFFECT OVERLAY */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-80"
          style={{
            background:
              'radial-gradient(ellipse at 50% 45%, rgba(35, 62, 42, 0.6) 0%, rgba(18, 35, 23, 0.8) 60%, rgba(5, 10, 7, 0.96) 100%)',
          }}
        />

        {/* Soft Center Dream Glow & Sage Vignette */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen opacity-20"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(143, 160, 137, 0.5) 0%, transparent 60%)',
          }}
        />

        {/* Deep Contrast Vignette & Edge Softener */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, transparent 40%, rgba(5, 5, 5, 0.7) 80%, #050505 100%)',
          }}
        />

        {/* Top/Bottom Dark Blends */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#050505] opacity-90" />

        {/* ════════════════════════════════════════════════════
            ✨ HERO SECTION (ABOVE THE FOLD)
        ════════════════════════════════════════════════════ */}
        <motion.div
          style={{
            opacity: heroContentOpacity,
            y: heroContentY,
            scale: heroContentScale,
          }}
          className={`absolute inset-0 z-30 flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-24 sm:pt-28 pb-5 md:pb-7 ${
            isHeroActive ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Subtle top breathing space */}
          <div className="flex-1 max-h-8 md:max-h-16" />

          {/* Main Hero Center Content */}
          <div className="flex flex-col items-center max-w-2xl mx-auto my-auto w-full">
            {/* Badge / Eyebrow: Gardenia Heights Developments */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/10 backdrop-blur-md mb-3 md:mb-4 shadow-[0_2px_14px_rgba(212,175,55,0.25)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] animate-pulse" />
              <span
                className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#f0d886]"
                style={{
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                }}
              >
                {t('Gardenia Heights Developments', 'جاردينيا هايتس للتطوير العقاري')}
              </span>
            </div>

            {/* Main Headline: LIFE YOU DESERVE / حياة تليق بك */}
            <h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.2] text-white tracking-[0.02em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] max-w-xl"
              style={{
                fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
                letterSpacing: isAr ? '0' : '0.04em',
                textTransform: isAr ? 'none' : 'uppercase',
              }}
            >
              {isAr ? 'حياة تليق بك' : 'LIFE YOU DESERVE'}
            </h1>

            {/* Sub-headline */}
            <p
              className="mt-3 md:mt-4 text-xs sm:text-sm md:text-base text-white/80 max-w-lg mx-auto font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
              style={{
                fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
              }}
            >
              {t(
                'Developing visionary New Classic communities and high-yield commercial landmarks across 10th of Ramadan and New Sohag. Where refined craftsmanship meets serene modern luxury.',
                'تطوير مجتمعات نيو كلاسيك ملهمة ومعالم تجارية عالية العائد في العاشر من رمضان وسوهاج الجديدة. حيث تلتقي الحرفية الرفيعة بالفخامة العصرية الهادئة.'
              )}
            </p>
          </div>

          {/* Trust Bar / Metrics Strip: (Multi-Regional, 100% Commitment, Ecosystems) */}
          <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 mt-auto mb-2 md:mb-4 pointer-events-auto">
            <div className="relative overflow-hidden rounded-2xl md:rounded-full bg-[#080d09]/85 backdrop-blur-2xl border border-[#d4af37]/40 shadow-[0_16px_48px_rgba(0,0,0,0.8)] py-3 px-4 md:px-7">
              {/* Golden Ambient highlight line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-0 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-[#d4af37]/25 text-start">
                {/* Metric 1: Multi-Regional Footprint: 10th of Ramadan & New Sohag */}
                <div className="flex items-center gap-3 pt-1.5 md:pt-0 first:pt-0 px-2 md:px-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold"
                      style={{ fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)' }}
                    >
                      {t('Multi-Regional Footprint', 'توسع جغرافي متعدد')}
                    </div>
                    <div
                      className="text-xs sm:text-[13px] text-[#FFFDF8] font-medium truncate"
                      style={{ fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)', color: '#FFFDF8' }}
                    >
                      {t('10th of Ramadan & New Sohag', 'العاشر من رمضان وسوهاج الجديدة')}
                    </div>
                  </div>
                </div>

                {/* Metric 2: 100% Commitment to Architectural Delivery & Quality */}
                <div className="flex items-center gap-3 pt-2.5 md:pt-0 px-2 md:px-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold"
                      style={{ fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)' }}
                    >
                      {t('100% Commitment', 'التزام 100%')}
                    </div>
                    <div
                      className="text-xs sm:text-[13px] text-[#FFFDF8] font-medium truncate"
                      style={{ fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)', color: '#FFFDF8' }}
                    >
                      {t('Architectural Delivery & Quality', 'بالتسليم المعماري والجودة')}
                    </div>
                  </div>
                </div>

                {/* Metric 3: Fully Integrated Ecosystems: Residential, Medical & Commercial */}
                <div className="flex items-center gap-3 pt-2.5 md:pt-0 px-2 md:px-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div
                      className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold"
                      style={{ fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)' }}
                    >
                      {t('Fully Integrated Ecosystems', 'منظومات متكاملة')}
                    </div>
                    <div
                      className="text-xs sm:text-[13px] text-[#FFFDF8] font-medium truncate"
                      style={{ fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)', color: '#FFFDF8' }}
                    >
                      {t('Residential, Medical & Commercial', 'سكني، طبي وتجاري')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clean, Non-overlapping Scroll Indicator below the bar */}
            <div className="mt-3 flex items-center justify-center gap-2 text-white/70">
              <span
                className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.25em]"
                style={{ fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)' }}
              >
                {t('Scroll to Explore', 'مرر لأسفل للاستكشاف')}
              </span>
              <div className="h-3.5 w-[1px] bg-gradient-to-b from-[#d4af37] to-transparent animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════
            SCROLLYTELLING TEXT BEATS (18% -> 78%)
        ════════════════════════════════════════════════════ */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Beat 1: 18% – 36% */}
          <ScrollyBeat
            progress={smoothProgress}
            range={[0.18, 0.22, 0.32, 0.36]}
            badge={{ en: 'Architectural Vision', ar: 'الرؤية المعمارية' }}
            title={{ en: 'Monumental Living', ar: 'حياة استثنائية راقية' }}
            subtitle={{
              en: 'Architectural brilliance sculpted into the twilight sky.',
              ar: 'براعة معمارية متفردة تعانق سماء الغسق بكل فخامة.',
            }}
            isAr={isAr}
          />

          {/* Beat 2: 39% – 57% */}
          <ScrollyBeat
            progress={smoothProgress}
            range={[0.39, 0.43, 0.53, 0.57]}
            badge={{ en: 'Biophilic Sanctuary', ar: 'ملاذ بيئي مستدام' }}
            title={{ en: 'Living In Harmony', ar: 'تناغم الطبيعة والعمارة' }}
            subtitle={{
              en: 'Lush vertical terraces designed for serene elevated living.',
              ar: 'تراسات خضراء معلقة صُممت لتوفر أسلوب حياة هادئ ومتميز.',
            }}
            isAr={isAr}
          />

          {/* Beat 3: 60% – 78% */}
          <ScrollyBeat
            progress={smoothProgress}
            range={[0.60, 0.64, 0.74, 0.78]}
            badge={{ en: 'Master Craftsmanship', ar: 'حرفية وإتقان' }}
            title={{ en: 'Refined Interiors', ar: 'تصاميم داخلية فاخرة' }}
            subtitle={{
              en: 'Natural timber, honed marble, and warm bespoke finishes.',
              ar: 'أخشاب طبيعية ورخام مصقول مع تشطيبات راقية مصممة خصيصاً.',
            }}
            isAr={isAr}
          />
        </div>

        {/* ════════════════════════════════════════════════════
            ✨ FINALE: LOGO REVEAL AFTER ALL TEXT FINISHES (82% -> 100%)
        ════════════════════════════════════════════════════ */}
        <motion.div
          style={{ opacity: logoOpacity, scale: logoScale, y: logoY }}
          className={`absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center ${
            isFinaleActive ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          {/* Subtle Ambient Backlight Glow behind Logo */}
          <div
            className="pointer-events-none absolute h-64 w-64 md:h-80 md:w-80 rounded-full blur-3xl opacity-40"
            style={{
              background: 'radial-gradient(circle, #d4af37 0%, #8FA089 50%, transparent 70%)',
            }}
          />

          {/* Golden Badge Accent */}
          <span
            className="mb-4 inline-block text-[11px] md:text-[13px] font-semibold tracking-[0.35em] uppercase text-[#d4af37] drop-shadow-md"
            style={{
              fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
            }}
          >
            {t('Gardenia Heights Developments', 'جاردينيا هايتس للتطوير العقاري')}
          </span>

          {/* Official Logo Display */}
          <div className="relative mb-6 max-w-[220px] sm:max-w-[280px] md:max-w-[320px] drop-shadow-[0_8px_32px_rgba(212,175,55,0.45)]">
            <img
              src={isAr ? gardeniaLogoAr : gardeniaLogoEn}
              alt="Gardenia Heights Logo"
              className="h-auto w-full object-contain brightness-0 invert sepia hue-rotate-[5deg] saturate-[2.5]"
              style={{
                filter:
                  'drop-shadow(0 0 16px rgba(212,175,55,0.35)) brightness(1.2) contrast(1.1)',
              }}
            />
          </div>

          {/* Slogan underneath the Logo */}
          <p
            className="max-w-lg text-sm sm:text-base md:text-xl font-light text-white/90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
            style={{
              fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
            }}
          >
            {t(
              'A developer that plants roots, not just buildings.',
              'مطوّر يزرع جذوراً في المستقبل، مش مجرد مباني.'
            )}
          </p>

          {/* Elegant Gold Divider */}
          <div className="mt-4 h-[1px] w-24 bg-gradient-to-r from-transparent via-[#d4af37]/80 to-transparent" />

          {/* Interactive CTA Buttons in the finale (with Logo) */}
          {onNavigate && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pointer-events-auto relative z-30">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-[13px] md:text-[14px] font-semibold text-[#0b1510] cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_4px_24px_rgba(212,175,55,0.45)]"
                style={{
                  background: 'linear-gradient(135deg, #f3de96 0%, #d4af37 60%, #b8905a 100%)',
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                }}
              >
                <span>{t('Explore Our Projects', 'استكشف مشروعاتنا')}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                  {isAr ? '←' : '→'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="group relative inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-[13px] md:text-[14px] font-medium cursor-pointer transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: 'rgba(255, 253, 248, 0.12)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(255, 253, 248, 0.55)',
                  color: '#FFFDF8',
                  fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.25)';
                  e.currentTarget.style.borderColor = '#d4af37';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 253, 248, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 253, 248, 0.55)';
                }}
              >
                <span>{t('Book a Private Consultation', 'احجز استشارة خاصة')}</span>
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
