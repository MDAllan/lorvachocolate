import Link from 'next/link'
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-deep-cocoa flex flex-col items-center justify-center px-6 text-center">
      <Image
        src="/logo.svg"
        alt="LORVA Fine Chocolate"
        width={120}
        height={40}
        className="h-10 w-auto object-contain mb-12 opacity-80"
      />

      <p className="font-inter text-[10px] tracking-[0.5em] uppercase text-champagne-gold/60 mb-4">
        404
      </p>

      <h1 className="font-cormorant text-5xl md:text-6xl text-cream font-light leading-tight mb-4">
        Lost in the chocolate
      </h1>

      <div className="w-10 h-px bg-champagne-gold/40 mx-auto my-6" />

      <p className="font-inter text-sm text-cream/50 leading-relaxed max-w-xs mb-10">
        This page seems to have melted. Let&rsquo;s take you somewhere sweeter.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="px-8 py-3.5 bg-champagne-gold hover:bg-champagne-gold/90 text-deep-cocoa font-inter text-[11px] tracking-[0.35em] uppercase transition-all duration-300"
        >
          Go Home
        </Link>
        <Link
          href="/products"
          className="px-8 py-3.5 border border-cream/20 hover:border-cream/50 text-cream font-inter text-[11px] tracking-[0.35em] uppercase transition-all duration-300"
        >
          Shop Bonbons
        </Link>
      </div>
    </div>
  )
}
