'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Package, Images, FileText, ShoppingBag, LogOut } from 'lucide-react'
import { signOut } from '@/lib/auth/client'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/gallery', label: 'Gallery', icon: Images },
  { href: '/admin/content', label: 'Site Content', icon: FileText },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="flex h-full w-56 shrink-0 flex-col bg-deep-cocoa">
      {/* Brand */}
      <div className="px-6 py-7 border-b border-white/10">
        <p className="font-cormorant text-xl text-cream tracking-widest">LORVA</p>
        <p className="font-inter text-[9px] tracking-[0.4em] text-champagne-gold/60 uppercase mt-0.5">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-sm font-inter text-sm transition-colors duration-200',
                active
                  ? 'bg-cocoa-wine text-cream'
                  : 'text-cream/60 hover:text-cream hover:bg-white/10'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Sign out */}
      <div className="px-3 py-5 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-sm font-inter text-sm text-cream/50 hover:text-cream hover:bg-white/10 transition-colors duration-200"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
