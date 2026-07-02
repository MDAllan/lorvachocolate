import Link from 'next/link'

export function AdminEditBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] bg-cocoa-wine text-cream flex items-center justify-between px-4 py-1.5 text-xs font-inter">
      <span className="tracking-wider">
        <span className="text-champagne-gold font-medium">Admin Mode</span>
        {' '}— Hover sections to edit content.
      </span>
      <Link
        href="/admin"
        className="border border-cream/30 hover:border-cream px-3 py-0.5 transition-colors tracking-[0.15em] uppercase text-[10px]"
      >
        ← Back to Admin
      </Link>
    </div>
  )
}
