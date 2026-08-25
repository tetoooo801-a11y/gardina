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
      {/* Badge / Eyebrow */}
      <span
        className="mb-3 inline-block text-[12px] font-semibold uppercase tracking-[0.25em] drop-shadow-md text-[#d4af37]"
        style={{
          fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
        }}
      >
        {isAr ? badge.ar : badge.en}
      </span>

      {/* Main Title with Site Display Font */}
      <h2
        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.15] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        style={{
          fontFamily: isAr ? 'var(--font-ar-display)' : 'var(--font-en-display)',
        }}
      >
        {isAr ? title.ar : title.en}
      </h2>

      {/* Subtitle with Site Body Font */}
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

export default function TowerHeroScrollytelling() {
  const { isAr, t } = useLang();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const [loadProgress, setLoadProgress] = useState<number>(0);

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

  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

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

    const dpr = window.devicePixelRatio || 1;
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
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505]">
        {/* Preloader Overlay */}
        <AnimatePresence>
          {!imagesLoaded && (
            <motion.div
              key="preloader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
            >
              <div className="flex flex-col items-center space-y-4">
                <span
                  className="text-[12px] font-semibold tracking-[0.3em] uppercase text-[#d4af37]"
                  style={{
                    fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
                  }}
                >
                  {t('Gardenia Heights', 'جاردينيا هايتس')}
                </span>
                <span className="text-3xl font-light tabular-nums tracking-tight text-white/90">
                  {loadProgress}%
                </span>
                <div className="h-[2px] w-32 overflow-hidden bg-white/10 rounded-full">
                  <div
                    className="h-full bg-gradient-to-r from-[#8FA089] to-[#d4af37] transition-all duration-150 ease-out"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic HTML5 Canvas for Sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full pointer-events-none"
        />

        {/* 🌿 LUXURY BOTANICAL TRANSLUCENT GREEN EFFECT OVERLAY */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-75"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(37, 66, 45, 0.55) 0%, rgba(20, 38, 26, 0.75) 60%, rgba(5, 10, 7, 0.95) 100%)',
          }}
        />

        {/* Subtle Ambient Sage / Emerald Glow */}
        <div
          className="pointer-events-none absolute inset-0 mix-blend-screen opacity-25"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(143, 160, 137, 0.4) 0%, transparent 65%)',
          }}
        />

        {/* Bottom Fade to Content & Top Nav Shadow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#050505] opacity-80" />

        {/* Scrollytelling Story Beats (Bilingual + Project Fonts) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Beat A: 0% – 20% */}
          <ScrollyBeat
            progress={smoothProgress}
            range={[0.0, 0.05, 0.18, 0.23]}
            badge={{ en: 'The Vision', ar: 'الرؤية المعمارية' }}
            title={{ en: 'Monumental Living', ar: 'حياة استثنائية راقية' }}
            subtitle={{
              en: 'Architectural brilliance sculpted into the twilight sky.',
              ar: 'براعة معمارية متفردة تعانق سماء الغسق بكل فخامة.',
            }}
            isAr={isAr}
          />

          {/* Beat B: 25% – 45% */}
          <ScrollyBeat
            progress={smoothProgress}
            range={[0.26, 0.31, 0.43, 0.48]}
            badge={{ en: 'Biophilic Sanctuary', ar: 'ملاذ بيئي مستدام' }}
            title={{ en: 'Living In Harmony', ar: 'تناغم الطبيعة والعمارة' }}
            subtitle={{
              en: 'Lush vertical terraces designed for serene elevated living.',
              ar: 'تراسات خضراء معلقة صُممت لتوفر أسلوب حياة هادئ ومتميز.',
            }}
            isAr={isAr}
          />

          {/* Beat C: 50% – 70% */}
          <ScrollyBeat
            progress={smoothProgress}
            range={[0.51, 0.56, 0.68, 0.73]}
            badge={{ en: 'Master Craftsmanship', ar: 'حرفية وإتقان' }}
            title={{ en: 'Refined Interiors', ar: 'تصاميم داخلية فاخرة' }}
            subtitle={{
              en: 'Natural timber, honed marble, and warm bespoke finishes.',
              ar: 'أخشاب طبيعية ورخام مصقول مع تشطيبات راقية مصممة خصيصاً.',
            }}
            isAr={isAr}
          />

          {/* Beat D: 75% – 95% */}
          <ScrollyBeat
            progress={smoothProgress}
            range={[0.76, 0.81, 0.93, 0.98]}
            badge={{ en: 'Sky Residences', ar: 'أجنحة السحاب' }}
            title={{ en: 'Claim Your Horizon', ar: 'امتلك أفقك الخاص' }}
            subtitle={{
              en: 'Exclusive sky penthouses now available for private booking.',
              ar: 'بنتهاوس وأجنحة سحابية حصرية متاحة الآن للحجز الخاص.',
            }}
            isAr={isAr}
          />
        </div>

        {/* "Scroll to Explore" / "مرر للاستكشاف" Indicator */}
        <motion.div
          style={{ opacity: exploreIndicatorOpacity }}
          className="pointer-events-none absolute bottom-10 z-20 flex flex-col items-center gap-2"
        >
          <span
            className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/70"
            style={{
              fontFamily: isAr ? 'var(--font-ar-body)' : 'var(--font-en-body)',
            }}
          >
            {t('Scroll to Explore', 'مرر لأسفل للاستكشاف')}
          </span>
          <div className="h-6 w-[1px] bg-gradient-to-b from-[#d4af37] via-[#8FA089] to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
