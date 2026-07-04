'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X, ShoppingBag, User } from 'lucide-react'

interface NavbarProps {
  content?: Record<string, string>
}

export function Navbar({ content = {} }: NavbarProps) {
  const navLinks = [
    { href: '/products',  label: 'Bonbons' },
    { href: '/breakable', label: 'Breakable Hearts' },
    { href: '/favors',    label: 'Favours & Custom' },
    { href: '/gallery',   label: 'Gallery' },
    { href: '/about',     label: 'About' },
    { href: '/contact',   label: 'Contact' },
  ]

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
          ? 'bg-[#F5E8D0]/95 backdrop-blur-md shadow-sm border-b border-[#C9A961]/15'
          : 'bg-transparent'
      }`}
    >
      <div className="pl-0 lg:pl-[60px] pr-2 lg:pr-[100px]">
        <div className="flex items-center justify-between md:grid md:grid-cols-3 h-14">
          {/* Left — logo */}
          <div className="flex items-center justify-start -ml-2 lg:ml-0">
            <Link href="/" className="flex items-center">
              <Image
                src={useLightStyle ? '/logo-wine.svg' : '/logo.svg'}
                alt="Lorva Fine Chocolate"
                width={90}
                height={30}
                className="h-8 w-auto object-contain transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Centre — nav links */}
          <nav className="hidden md:flex items-center justify-center gap-7">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`font-inter text-[11px] tracking-[0.12em] whitespace-nowrap transition-colors duration-200 ${
                  useLightStyle ? 'text-deep-cocoa/80 hover:text-cocoa-wine' : 'text-cream/75 hover:text-cream'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right — icons + mobile hamburger */}
          <div className="flex items-center justify-end gap-5">
            <button
              aria-label="Sign in"
              className={`hidden md:block transition-colors ${
                useLightStyle ? 'text-deep-cocoa/70 hover:text-cocoa-wine' : 'text-cream/60 hover:text-cream'
              }`}
            >
              <User size={16} strokeWidth={1.5} />
            </button>
            <button
              aria-label="Cart"
              className={`transition-colors ${
                useLightStyle ? 'text-deep-cocoa/70 hover:text-cocoa-wine' : 'text-cream/60 hover:text-cream'
              }`}
            >
              <ShoppingBag size={16} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 transition-colors ${
                useLightStyle ? 'text-deep-cocoa hover:text-cocoa-wine' : 'text-cream hover:text-champagne-gold'
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#F5E8D0] border-t border-[#C9A961]/15 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 py-5 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="block font-inter text-deep-cocoa/80 hover:text-cocoa-wine text-[12px] tracking-[0.1em] py-3 border-b border-taupe/10 transition-colors"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 w-full font-inter text-deep-cocoa/80 hover:text-cocoa-wine text-[12px] tracking-[0.1em] py-3 border-b border-taupe/10 transition-colors"
          >
            <ShoppingBag size={14} strokeWidth={1.5} /> Cart
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 w-full font-inter text-deep-cocoa/80 hover:text-cocoa-wine text-[12px] tracking-[0.1em] py-3 transition-colors"
          >
            <User size={14} strokeWidth={1.5} /> Sign In
          </button>
        </nav>
      </div>
    </header>
  )
}
