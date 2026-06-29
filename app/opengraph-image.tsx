import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'LORVA Fine Chocolate — Handcrafted artisan chocolate'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#242121',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
        {/* Gold border frame */}
        <div style={{
          position: 'absolute',
          inset: '20px',
          border: '1px solid rgba(201, 169, 97, 0.3)',
          display: 'flex',
        }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', padding: '60px' }}>
          <p style={{ color: 'rgba(201, 169, 97, 0.7)', fontSize: '12px', letterSpacing: '0.5em', textTransform: 'uppercase', margin: 0 }}>
            Fine Chocolate
          </p>
          <h1 style={{ color: '#F6EFE9', fontSize: '80px', fontWeight: 300, margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            LORVA
          </h1>
          <div style={{ width: '60px', height: '1px', backgroundColor: 'rgba(201, 169, 97, 0.5)' }} />
          <p style={{ color: 'rgba(246, 239, 233, 0.6)', fontSize: '18px', fontWeight: 300, margin: 0, letterSpacing: '0.05em', textAlign: 'center', maxWidth: '600px' }}>
            Handcrafted artisan chocolate — bonbons, breakable hearts, wedding favours, and custom gift boxes
          </p>
        </div>
      </div>
    ),
    { ...size }
  )
}
