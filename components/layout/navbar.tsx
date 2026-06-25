'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  content?: Record<string, string>
}

export function Navbar({ content = {} }: NavbarProps) {
  const navLinks = [
    { href: content.nav_link_1_href || '/products', label: content.nav_link_1_label || 'Shop' },
    { href: content.nav_link_2_href || '/gallery',  label: content.nav_link_2_label || 'Gallery' },
    { href: content.nav_link_3_href || '/favors',   label: content.nav_link_3_label || 'Favors' },
    { href: content.nav_link_4_href || '/breakable',label: content.nav_link_4_label || 'Breakable Hearts' },
    { href: content.nav_link_5_href || '/contact',  label: content.nav_link_5_label || 'Contact' },
  ]
  const ctaLabel = content.nav_cta_label || 'Order Now'

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const useLightStyle = scrolled || !isHome

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        useLightStyle
          ? 'bg-cream/95 backdrop-blur-md shadow-sm border-b border-taupe/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
            <Image
              src={useLightStyle ? '/logo-wine.svg' : '/logo.svg'}
              alt="Lorva Fine Chocolate"
              width={120}
              height={40}
              className="h-10 w-auto object-contain transition-all duration-300"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-inter text-sm transition-colors duration-200 tracking-wide ${
                  useLightStyle ? 'text-deep-cocoa hover:text-cocoa-wine' : 'text-cream/80 hover:text-cream'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href="/products"
              className={`px-6 py-2.5 font-inter text-[11px] tracking-[0.4em] uppercase rounded-none border transition-all duration-500 ${
                useLightStyle
                  ? 'border-deep-cocoa text-deep-cocoa hover:bg-deep-cocoa hover:text-cream'
                  : 'border-cream/40 text-cream hover:bg-cream/10'
              }`}
            >
              {ctaLabel}
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 transition-colors ${
              useLightStyle ? 'text-deep-cocoa hover:text-cocoa-wine' : 'text-cream hover:text-champagne-gold'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden bg-cream/98 backdrop-blur-md border-t border-taupe/20 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 py-6 space-y-1">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-3 border-b border-taupe/10"
          >
            <Image src="/logo-wine.png" alt="Lorva Fine Chocolate" width={80} height={27} className="h-7 w-auto object-contain" />
          </Link>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block font-inter text-deep-cocoa hover:text-cocoa-wine text-base py-3 border-b border-taupe/10 last:border-0 tracking-wide transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className="block mt-4 px-6 py-3 border border-deep-cocoa text-deep-cocoa font-inter text-center text-[11px] rounded-none hover:bg-deep-cocoa hover:text-cream transition-all duration-500 tracking-[0.4em] uppercase"
          >
            {ctaLabel}
          </Link>
        </nav>
      </div>
    </header>
  )
}
