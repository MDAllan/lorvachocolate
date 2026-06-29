'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

const STATS = [
  { value: 500, suffix: '+', label: 'Happy Customers' },
  { value: 1200, suffix: '+', label: 'Boxes Delivered' },
  { value: 8, suffix: '', label: 'Unique Flavours' },
  { value: 100, suffix: '%', label: 'Handcrafted' },
]

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1600
    const step = 16
    const steps = duration / step
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, step)
    return () => clearInterval(interval)
  }, [active, target])

  return (
    <span className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="bg-cream border-y border-taupe/15 py-14">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-taupe/20">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <p className="font-cormorant text-4xl md:text-5xl text-cocoa-wine font-light">
                <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
              </p>
              <p className="font-inter text-[11px] tracking-[0.2em] uppercase text-taupe">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
