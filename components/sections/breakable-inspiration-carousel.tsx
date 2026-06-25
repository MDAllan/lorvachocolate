'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion'
import Image from 'next/image'

const SPEED = 0.55

interface Item {
  src: string
  alt: string
  label: string
}

export function BreakableInspirationCarousel({ items }: { items: Item[] }) {
  const x = useMotionValue(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)

  const doubled = [...items, ...items]

  useAnimationFrame(() => {
    if (paused) return
    const halfWidth = (trackRef.current?.scrollWidth ?? 0) / 2
    if (halfWidth === 0) return
    const next = x.get() - SPEED
    x.set(next <= -halfWidth ? 0 : next)
  })

  return (
    <div
      className="overflow-hidden cursor-default"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div ref={trackRef} style={{ x }} className="flex">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="group relative flex-none w-72 mx-2 aspect-square overflow-hidden rounded-sm"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="288px"
            />
            <div className="absolute inset-0 bg-deep-cocoa/0 group-hover:bg-deep-cocoa/40 transition-colors duration-300 flex items-end p-4">
              <span className="font-cormorant text-cream text-xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
