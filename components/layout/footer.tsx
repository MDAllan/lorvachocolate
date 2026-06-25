import Link from 'next/link'
import Image from 'next/image'

const QUICK_LINK_DEFAULTS = [
  { href: '/products',  label: 'Shop' },
  { href: '/favors',    label: 'Favors & Gifts' },
  { href: '/breakable', label: 'Breakable Hearts' },
  { href: '/contact',   label: 'Contact Us' },
]

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  )
}

interface FooterProps {
  content?: Record<string, string>
}

export function Footer({ content = {} }: FooterProps) {
  const quickLinks = QUICK_LINK_DEFAULTS.map((d, i) => ({
    href:  content[`footer_link_${i + 1}_href`]  ?? d.href,
    label: content[`footer_link_${i + 1}_label`] ?? d.label,
  }))

  const waNumber = content.contact_whatsapp || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1XXXXXXXXXX'
  const waMessage = encodeURIComponent(content.footer_whatsapp_message || "Hi Lorva! I'd love to place an order.")
  const tagline = content.footer_tagline || "Crafted slowly. Savored deeply.\nPremium artisan chocolate made with intention."
  const instagramUrl = content.footer_instagram_url || 'https://instagram.com'
  const tiktokUrl = content.footer_tiktok_url || 'https://tiktok.com'
  const contactBlurb = content.footer_contact_blurb || 'Order via WhatsApp for the fastest response. We respond same-day.'
  const copyright = content.footer_copyright || 'Lorva Fine Chocolate. All rights reserved.'

  return (
    <footer className="bg-cocoa-wine text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-5">
            <Link href="/">
              <Image
                src="/logo-full.png"
                alt="Lorva Fine Chocolate"
                width={160}
                height={140}
                className="w-36 h-auto object-contain"
                style={{ filter: 'brightness(0) invert(1) sepia(1) saturate(0.4) brightness(1.1)' }}
              />
            </Link>
            <p className="font-inter text-sm text-cream/60 leading-relaxed max-w-xs whitespace-pre-line">
              {tagline}
            </p>
            <div className="flex gap-4 pt-1">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/50 hover:text-champagne-gold transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/50 hover:text-champagne-gold transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <h4 className="font-cormorant text-xl tracking-widest text-champagne-gold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-inter text-sm text-cream/60 hover:text-cream transition-colors tracking-wide"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h4 className="font-cormorant text-xl tracking-widest text-champagne-gold">Get in Touch</h4>
            <div className="space-y-4">
              <p className="font-inter text-sm text-cream/60 leading-relaxed">
                {contactBlurb}
              </p>
              <a
                href={`https://wa.me/${waNumber}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2.5 border border-champagne-gold text-champagne-gold hover:bg-champagne-gold hover:text-deep-cocoa rounded-none font-inter text-[11px] tracking-[0.4em] uppercase transition-all duration-500"
              >
                WHATSAPP US
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/15 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-xs text-cream/40">
            © {new Date().getFullYear()} {copyright}
          </p>
          <p className="font-cormorant text-sm text-cream/40">
            Crafted with love.
          </p>
        </div>
      </div>
    </footer>
  )
}
