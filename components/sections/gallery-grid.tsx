'use client'

import { motion } from 'framer-motion'
import type { galleryImages } from '@/lib/db/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { GALLERY_META } from '@/lib/data/gallery-metadata'
import { cn } from '@/lib/utils'

type GalleryImage = InferSelectModel<typeof galleryImages>

const TYPE_LABEL: Record<string, string> = {
  'bonbon': 'Bonbon',
  'breakable-heart': 'Breakable Heart',
  'smash-box': 'Smash Box',
  'favor': 'Wedding Favour',
  'assorted': 'Collection',
}

function ShellIndicator({ shell }: { shell: string }) {
  const isMixed = shell.includes('·')

  const dotClass = isMixed ? 'hidden' : cn(
    'w-2 h-2 rounded-full flex-shrink-0 border border-white/15',
    shell.toLowerCase().includes('dark')  && 'bg-[#1e0e06]',
    shell.toLowerCase().includes('milk')  && 'bg-[#b07840]',
    shell.toLowerCase().includes('white') && 'bg-[#f0dfc8]',
    shell.toLowerCase().includes('ruby')  && 'bg-[#aa3353]',
  )

  return (
    <div className="mt-2 flex items-center gap-1.5">
      {!isMixed && <span className={dotClass} />}
      <span className="font-inter text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-cream/55">
        {shell}
      </span>
    </div>
  )
}

function getFilename(url: string): string {
  return url.split('/').pop() ?? ''
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  if (images.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="font-cormorant text-3xl text-taupe/50">No gallery images yet.</p>
        <p className="font-inter text-sm text-taupe/40 mt-3">Check back soon.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
      {images.map((img, i) => {
        const meta = GALLERY_META[getFilename(img.url)]

        return (
          <motion.div
            key={img.id}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (i % 8) * 0.05 }}
            className="group relative aspect-square overflow-hidden bg-cream"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.altText || 'Lorva chocolate'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#140c06]/90 via-[#140c06]/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Info panel */}
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">
              {meta ? (
                <>
                  <p className="font-inter text-[7px] sm:text-[8px] tracking-[0.45em] uppercase text-champagne-gold mb-0.5">
                    {TYPE_LABEL[meta.type]}
                  </p>
                  <h3 className="font-cormorant text-base sm:text-xl text-cream leading-tight">
                    {meta.title}
                  </h3>
                  <p className="font-inter text-[9px] text-cream/65 mt-0.5 leading-snug">
                    {meta.flavor}
                  </p>
                  <ShellIndicator shell={meta.shell} />
                </>
              ) : (
                <p className="font-inter text-[10px] text-cream/70 leading-snug">
                  {img.altText}
                </p>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
