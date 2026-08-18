import React, { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"

interface CursorPosition {
  left: number
  width: number
  opacity: number
}

interface TabProps {
  children: React.ReactNode
  setPosition: (pos: CursorPosition) => void
  onClick: () => void
}

interface SlideTabsProps {
  tabs: string[]
  selected?: number
  onChange?: (index: number) => void
  className?: string
}

export const SlideTabs = ({ tabs, selected: controlledSelected, onChange, className }: SlideTabsProps) => {
  const [position, setPosition] = useState<CursorPosition>({ left: 0, width: 0, opacity: 0 })
  const [selected, setSelected] = useState(controlledSelected ?? 0)
  const tabsRef = useRef<(HTMLLIElement | null)[]>([])

  const activeIndex = controlledSelected ?? selected

  useEffect(() => {
    const selectedTab = tabsRef.current[activeIndex]
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect()
      setPosition({ left: selectedTab.offsetLeft, width, opacity: 1 })
    }
  }, [activeIndex])

  const handleSelect = (i: number) => {
    setSelected(i)
    onChange?.(i)
  }

  return (
    <ul
      onMouseLeave={() => {
        const selectedTab = tabsRef.current[activeIndex]
        if (selectedTab) {
          const { width } = selectedTab.getBoundingClientRect()
          setPosition({ left: selectedTab.offsetLeft, width, opacity: 1 })
        }
      }}
      className={`relative mx-auto flex w-fit rounded-full border border-black/20 bg-white p-1 ${className ?? ""}`}
      style={{ gap: 0 }}
    >
      {tabs.map((tab, i) => (
        <Tab
          key={tab}
          ref={(el) => { tabsRef.current[i] = el }}
          setPosition={setPosition}
          onClick={() => handleSelect(i)}
        >
          {tab}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  )
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(({ children, setPosition, onClick }, ref) => {
  return (
    <li
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => {
        const el = (ref as React.RefObject<HTMLLIElement>)?.current
        if (!el) return
        const { width } = el.getBoundingClientRect()
        setPosition({ left: el.offsetLeft, width, opacity: 1 })
      }}
      className="relative z-10 block cursor-pointer px-4 py-1.5 text-xs uppercase tracking-widest text-white mix-blend-difference md:px-6 md:py-2 md:text-sm"
    >
      {children}
    </li>
  )
})
Tab.displayName = "Tab"

const Cursor = ({ position }: { position: CursorPosition }) => (
  <motion.li
    animate={position}
    className="absolute z-0 h-7 rounded-full bg-black md:h-9"
    style={{ top: 4, bottom: 4 }}
  />
)

export default SlideTabs
