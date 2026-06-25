'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const LABELS: Record<string, string> = {
  products: 'Products',
  gallery: 'Gallery',
  content: 'Site Content',
  new: 'New',
}

export function AdminTopbar({ userName }: { userName: string }) {
  const pathname = usePathname()
  const segments = pathname.replace('/admin', '').split('/').filter(Boolean)

  return (
    <header className="flex items-center justify-between h-14 px-6 bg-cream border-b border-taupe/20 shrink-0">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 font-inter text-xs text-taupe">
        <Link href="/admin/products" className="hover:text-deep-cocoa transition-colors">
          Admin
        </Link>
        {segments.map((seg, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3" />
            <span className={i === segments.length - 1 ? 'text-deep-cocoa font-medium' : ''}>
              {LABELS[seg] ?? seg}
            </span>
          </span>
        ))}
      </nav>

      {/* User */}
      <p className="font-inter text-xs text-taupe">
        Welcome, <span className="text-deep-cocoa font-medium">{userName}</span>
      </p>
    </header>
  )
}
