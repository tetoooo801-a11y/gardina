"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "@/lib/utils";

export interface GalleryImage {
  src: string;
  alt: string;
}

const defaultGalleryImages: GalleryImage[] = Array.from({ length: 21 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    src: `/images/gallery/gallery-${num}.jpg`,
    alt: `Gardenia Heights Portfolio ${num}`,
  };
});

interface Skiper49Props {
  images?: GalleryImage[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  slideHeight?: string | number;
  slideWidth?: string | number;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

const Carousel_003 = ({
  images = defaultGalleryImages,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = false,
  spaceBetween = 20,
  slideHeight = 440,
  slideWidth = 340,
  onImageClick,
}: {
  images?: GalleryImage[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
  slideHeight?: string | number;
  slideWidth?: string | number;
  onImageClick?: (image: GalleryImage, index: number) => void;
}) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    padding-top: 20px !important;
    padding-bottom: 55px !important;
    overflow: visible !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: ${typeof slideWidth === 'number' ? `${slideWidth}px` : slideWidth};
    height: ${typeof slideHeight === 'number' ? `${slideHeight}px` : slideHeight};
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid rgba(212, 175, 55, 0.35);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
    transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
  }

  .Carousal_003 .swiper-slide-active {
    border-color: rgba(212, 175, 55, 0.85);
    box-shadow: 0 24px 60px rgba(212, 175, 55, 0.25), 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .Carousal_003 .swiper-pagination {
    bottom: 10px !important;
  }

  .Carousal_003 .swiper-pagination-bullet {
    background-color: #d4af37 !important;
    opacity: 0.35;
    width: 9px;
    height: 9px;
    margin: 0 5px !important;
    transition: all 0.3s ease;
  }

  .Carousal_003 .swiper-pagination-bullet-active {
    opacity: 1 !important;
    width: 24px !important;
    border-radius: 999px !important;
    background: linear-gradient(135deg, #f2dd95 0%, #d4af37 100%) !important;
    box-shadow: 0 0 12px rgba(212, 175, 55, 0.6);
  }

  .Carousal_003-nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(14, 26, 18, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(212, 175, 55, 0.45);
    color: #FFFDF8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20;
    transition: all 0.25s ease;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }

  .Carousal_003-nav-btn:hover {
    background: rgba(212, 175, 55, 0.95);
    color: #0b1510;
    border-color: #d4af37;
    transform: translateY(-50%) scale(1.08);
  }

  .Carousal_003-prev {
    left: 8px;
  }

  .Carousal_003-next {
    right: 8px;
  }

  [dir="rtl"] .Carousal_003-prev {
    right: 8px;
    left: auto;
  }

  [dir="rtl"] .Carousal_003-next {
    left: 8px;
    right: auto;
  }

  [dir="rtl"] .Carousal_003-prev svg {
    transform: rotate(180deg);
  }

  [dir="rtl"] .Carousal_003-next svg {
    transform: rotate(180deg);
  }

  @media (max-width: 640px) {
    .Carousal_003 .swiper-slide {
      width: 280px;
      height: 380px;
    }
    .Carousal_003-nav-btn {
      width: 36px;
      height: 36px;
    }
  }
`;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.2,
      }}
      className={cn("relative w-full max-w-6xl mx-auto px-4 sm:px-8", className)}
    >
      <style>{css}</style>

      <div className="relative w-full overflow-hidden">
        <Swiper
          key={images.map(img => img.src).join(',')}
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 2500,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop && images.length > 2}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 140,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".Carousal_003-next",
                  prevEl: ".Carousal_003-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              onClick={() => onImageClick?.(image, index)}
              className="cursor-pointer group"
            >
              <img
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                src={image.src}
                alt={image.alt || `Gardenia Heights Gallery Image ${index + 1}`}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              className="Carousal_003-nav-btn Carousal_003-prev"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              className="Carousal_003-nav-btn Carousal_003-next"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

const Skiper49 = ({
  images = defaultGalleryImages,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = true,
  slideHeight,
  slideWidth,
  onImageClick,
}: Skiper49Props) => {
  return (
    <div className={cn("w-full flex items-center justify-center py-6", className)}>
      <Carousel_003
        images={images}
        showPagination={showPagination}
        showNavigation={showNavigation}
        loop={loop}
        autoplay={autoplay}
        slideHeight={slideHeight}
        slideWidth={slideWidth}
        onImageClick={onImageClick}
      />
    </div>
  );
};

export { Skiper49, Carousel_003 };
export default Skiper49;
