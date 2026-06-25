'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface DripConfig {
  path: string
  cx: number
  cy: number
  r: number
  strokeColor: string
  fillColor: string
  strokeWidth: number
  delay: number
}

const drips: DripConfig[] = [
  {
    path: 'M 12 0 C 12 18 8 36 14 54 C 18 67 10 80 15 92',
    cx: 15, cy: 97, r: 5.5,
    strokeColor: '#F6EFE9', fillColor: '#C9A961',
    strokeWidth: 3.5, delay: 0,
  },
  {
    path: 'M 30 0 C 30 14 36 32 30 52 C 24 68 33 82 28 94',
    cx: 28, cy: 99, r: 7,
    strokeColor: '#F5E0C0', fillColor: '#F6EFE9',
    strokeWidth: 5, delay: 0.45,
  },
  {
    path: 'M 55 0 C 55 22 50 40 57 60 C 62 74 54 87 60 98',
    cx: 60, cy: 103, r: 6,
    strokeColor: '#C9A961', fillColor: '#F5E0C0',
    strokeWidth: 3, delay: 0.8,
  },
  {
    path: 'M 78 0 C 78 16 84 34 78 56 C 72 72 80 85 76 96',
    cx: 76, cy: 101, r: 8,
    strokeColor: '#F6EFE9', fillColor: '#C9A961',
    strokeWidth: 5.5, delay: 1.2,
  },
  {
    path: 'M 44 0 C 44 20 48 38 43 58 C 38 74 46 88 41 99',
    cx: 41, cy: 104, r: 4.5,
    strokeColor: '#F5E0C0', fillColor: '#F6EFE9',
    strokeWidth: 2.5, delay: 1.6,
  },
]

export function ChocolateDrip() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const paths = svg.querySelectorAll<SVGPathElement>('.drip-path')
    const circles = svg.querySelectorAll<SVGCircleElement>('.bonbon')

    gsap.set(circles, { scale: 0, transformOrigin: 'center center' })

    paths.forEach((path, i) => {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power2.inOut',
        delay: drips[i].delay + 0.5,
        onComplete() {
          gsap.to(circles[i], {
            scale: 1,
            duration: 0.45,
            ease: 'back.out(1.7)',
          })
        },
      })
    })
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 100 115"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {drips.map((drip, i) => (
        <g key={i}>
          <path
            d={drip.path}
            stroke={drip.strokeColor}
            strokeWidth={drip.strokeWidth}
            fill="none"
            strokeLinecap="round"
            className="drip-path"
          />
          <circle
            cx={drip.cx}
            cy={drip.cy}
            r={drip.r}
            fill={drip.fillColor}
            stroke={drip.strokeColor}
            strokeWidth={0.6}
            className="bonbon"
          />
          <circle
            cx={drip.cx - drip.r * 0.25}
            cy={drip.cy - drip.r * 0.3}
            r={drip.r * 0.2}
            fill="white"
            fillOpacity={0.5}
            className="bonbon"
          />
        </g>
      ))}
    </svg>
  )
}
