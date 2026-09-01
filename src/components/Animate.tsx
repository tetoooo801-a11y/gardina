/**
 * Gardenia animation primitives — Prisma-style cinematic motion.
 * All animations are scroll-triggered (once), performance-friendly (transform + opacity only),
 * and use the Prisma easing curve [0.16, 1, 0.3, 1].
 */
import { useRef, type ReactNode, type CSSProperties } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/* ─── FadeUp ─────────────────────────────────────────────────────────────── */
interface FadeUpProps {
  children: ReactNode
  delay?: number
  duration?: number
  distance?: number
  className?: string
  style?: CSSProperties
  amount?: number
}

export function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  distance = 28,
  className,
  style,
  amount = 0.15,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  return (
    <motion.div
      ref={ref}
      initial={{ y: distance, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ─── WordPullUp ─────────────────────────────────────────────────────────── */
interface WordPullUpProps {
  text: string
  className?: string
  style?: CSSProperties
  delay?: number
  stagger?: number
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

export function WordPullUp({
  text,
  className = '',
  style,
  delay = 0,
  stagger = 0.07,
  tag = 'div',
}: WordPullUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const words = text.split(' ')

  const Tag = tag as keyof JSX.IntrinsicElements

  return (
    // @ts-ignore — polymorphic ref
    <Tag
      ref={ref}
      className={`inline-flex flex-wrap items-center justify-center ${className}`}
      style={{
        rowGap: '0.2em',
        columnGap: '0.35em',
        ...style,
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'baseline',
            padding: '0.1em 0.05em 0.15em',
            margin: '-0.1em -0.05em -0.15em',
          }}
        >
          <motion.span
            initial={{ y: '115%', opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: delay + i * stagger, ease: EASE }}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* ─── Stagger container ──────────────────────────────────────────────────── */
const staggerContainer: Variants = {
  hidden: {},
  show: (stagger: number = 0.1) => ({
    transition: { staggerChildren: stagger },
  }),
}

const staggerChild: Variants = {
  hidden: { y: 32, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: EASE },
  },
}

interface StaggerProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  stagger?: number
  delay?: number
  amount?: number
}

export function Stagger({
  children,
  className,
  style,
  stagger = 0.1,
  delay = 0,
  amount = 0.1,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      custom={stagger}
      style={{ transitionDelay: `${delay}s`, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <motion.div variants={staggerChild} className={className} style={style}>
      {children}
    </motion.div>
  )
}

/* ─── ImageReveal ────────────────────────────────────────────────────────── */
interface ImageRevealProps {
  src: string
  alt: string
  className?: string
  style?: CSSProperties
  imgStyle?: CSSProperties
  delay?: number
  zoom?: boolean
}

export function ImageReveal({
  src,
  alt,
  className,
  style,
  imgStyle,
  delay = 0,
  zoom = true,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: 'hidden', ...style }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: zoom ? 1.08 : 1, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.1, delay, ease: EASE }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', ...imgStyle }}
      />
    </div>
  )
}

/* ─── ParallaxImage ──────────────────────────────────────────────────────── */
interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  containerStyle?: CSSProperties
  strength?: number   // px of vertical travel
}

export function ParallaxImage({
  src,
  alt,
  className,
  containerStyle,
  strength = 60,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength / 2}px`, `${strength / 2}px`])

  return (
    <div ref={ref} style={{ overflow: 'hidden', ...containerStyle }} className={className}>
      <motion.img
        src={src}
        alt={alt}
        style={{
          y,
          marginTop: `-${strength / 2}px`,
          width: '100%',
          height: `calc(100% + ${strength}px)`,
          objectFit: 'cover',
        }}
      />
    </div>
  )
}

/* ─── FadeIn (opacity only, for overlays/subtle elements) ─────────────────── */
export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
  style,
  amount = 0.1,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ─── HoverScale — subtle interactive scale ──────────────────────────────── */
export function HoverScale({
  children,
  scale = 1.03,
  className,
  style,
  onClick,
}: {
  children: ReactNode
  scale?: number
  className?: string
  style?: CSSProperties
  onClick?: () => void
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: EASE }}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
