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

const TOTAL_FRAMES = 232;

interface ScrollyBeatProps {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  badge?: string;
  title: string;
  subtitle: string;
  align?: 'center' | 'left' | 'right';
}

function ScrollyBeat({
  progress,
  range,
  badge,
  title,
  subtitle,
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
    left: 'items-start text-left max-w-xl ml-8 md:ml-24 mr-auto',
    right: 'items-end text-right max-w-xl mr-8 md:mr-24 ml-auto',
  }[align];

  return (
    <motion.div
      style={{ opacity, y }}
      className={`pointer-events-none absolute inset-0 flex flex-col justify-center px-6 ${alignmentClasses}`}
    >
      {badge && (
        <span className="mb-3 inline-block text-[11px] font-medium tracking-[0.35em] uppercase text-amber-300/90 drop-shadow-md">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-white/95 uppercase leading-[1.08] drop-shadow-lg">
        {title}
      </h2>
      <p className="mt-4 text-sm sm:text-base md:text-xl font-light tracking-wide text-white/70 max-w-xl leading-relaxed drop-shadow">
        {subtitle}
      </p>
    </motion.div>
  );
}

export default function TowerHeroScrollytelling() {
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

    // Aspect-ratio cover fit to fill screen beautifully
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
        <AnimatePresence>
          {!imagesLoaded && (
            <motion.div
              key="preloader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white"
            >
              <div className="flex flex-col items-center space-y-4">
                <span className="text-[11px] font-medium tracking-[0.35em] text-amber-300/90 uppercase">
                  The Lumina
                </span>
                <span className="text-3xl font-light tabular-nums tracking-tight text-white/90">
                  {loadProgress}%
                </span>
                <div className="h-[1px] w-28 overflow-hidden bg-white/10">
                  <div
                    className="h-full bg-amber-300/90 transition-all duration-150 ease-out"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <canvas
          ref={canvasRef}
          className="absolute inset-0 block h-full w-full pointer-events-none"
        />

        <div className="absolute inset-0 pointer-events-none z-10">
          <ScrollyBeat
            progress={smoothProgress}
            range={[0.0, 0.05, 0.18, 0.23]}
            badge="The Vision"
            title="Monumental Living"
            subtitle="Architectural brilliance sculpted into the twilight sky."
          />

          <ScrollyBeat
            progress={smoothProgress}
            range={[0.26, 0.31, 0.43, 0.48]}
            badge="Architecture & Nature"
            title="Biophilic Sanctuary"
            subtitle="Lush vertical terraces designed for serene elevated living."
          />

          <ScrollyBeat
            progress={smoothProgress}
            range={[0.51, 0.56, 0.68, 0.73]}
            badge="Craftsmanship"
            title="Refined Interiors"
            subtitle="Natural timber, honed marble, and warm bespoke finishes."
          />

          <ScrollyBeat
            progress={smoothProgress}
            range={[0.76, 0.81, 0.93, 0.98]}
            badge="Sky Residences"
            title="Claim Your Horizon"
            subtitle="Exclusive sky penthouses now available for private booking."
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40 opacity-70" />

        <motion.div
          style={{ opacity: exploreIndicatorOpacity }}
          className="pointer-events-none absolute bottom-10 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/60">
            Scroll to Explore
          </span>
          <div className="h-6 w-[1px] bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
