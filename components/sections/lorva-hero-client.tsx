'use client'
import dynamic from 'next/dynamic'

// ssr:false: renders hero only on the client — prevents Framer Motion
// animation state from causing React hydration mismatches.
export const LorvaHero = dynamic(
  () => import('./lorva-hero-framer'),
  {
    ssr: false,
    loading: () => <div style={{ width: '100%', height: '100vh', background: '#0C0102' }} />,
  }
)
