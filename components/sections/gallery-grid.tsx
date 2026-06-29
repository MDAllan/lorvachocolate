'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { galleryImages } from '@/lib/db/schema'
import type { InferSelectModel } from 'drizzle-orm'
import { GALLERY_META } from '@/lib/data/gallery-metadata'
import { cn } from '@/lib/utils'

type GalleryImage = InferSelectModel<typeof galleryImages>

const TYPE_LABEL: Record<string, string> = {
  'bonbon':         'Bonbon',
  'breakable-heart': 'Breakable Heart',
  'smash-box':      'Smash Box',
  'favor':          'Wedding Favour',
  'assorted':       'Collection',
  'process':        'Process',
}

const FILTER_TABS = [
  { key: 'all',              label: 'All' },
  { key: 'bonbon',           label: 'Bonbons' },
  { key: 'breakable-heart',  label: 'Breakable Hearts' },
  { key: 'favor',            label: 'Favours' },
  { key: 'assorted',         label: 'Collections' },
  { key: 'process',          label: 'Process' },
]

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

interface LightboxProps {
  images: GalleryImage[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const img = images[index]
  const meta = GALLERY_META[getFilename(img.url)]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[9990] bg-deep-cocoa/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 text-cream/60 hover:text-cream transition-colors z-10"
      >
        <X size={22} strokeWidth={1.5} />
      </button>

      {/* Counter */}
      <p className="absolute top-5 left-1/2 -translate-x-1/2 font-inter text-xs text-cream/40 tracking-widest">
        {index + 1} / {images.length}
      </p>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        aria-label="Previous image"
        className="absolute left-4 text-cream/50 hover:text-cream transition-colors z-10 p-2"
      >
        <ChevronLeft size={28} strokeWidth={1.5} />
      </button>

      {/* Image */}
      <motion.div
        key={img.id}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.22 }}
        className="relative max-h-[80vh] max-w-[90vw] flex flex-col items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img.url}
          alt={img.altText || 'Lorva chocolate'}
          className="max-h-[72vh] max-w-[85vw] object-contain shadow-2xl"
        />
        {meta && (
          <div className="text-center space-y-1">
            <p className="font-inter text-[9px] tracking-[0.4em] uppercase text-champagne-gold">
              {TYPE_LABEL[meta.type] ?? meta.type}
            </p>
            <p className="font-cormorant text-xl text-cream">{meta.title}</p>
            {meta.flavor && (
              <p className="font-inter text-xs text-cream/50">{meta.flavor}</p>
            )}
          </div>
        )}
      </motion.div>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        aria-label="Next image"
        className="absolute right-4 text-cream/50 hover:text-cream transition-colors z-10 p-2"
      >
        <ChevronRight size={28} strokeWidth={1.5} />
      </button>
    </motion.div>
  )
}

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const setFilter = useCallback((key: string) => {
    setActiveFilter(key)
    setLightboxIndex(null)
  }, [])

  const filtered = activeFilter === 'all'
    ? images
    : images.filter(img => {
        const meta = GALLERY_META[getFilename(img.url)]
        return meta?.type === activeFilter
      })

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null), [filtered.length])
  const nextImage = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null), [filtered.length])

  if (images.length === 0) {
    return (
      <div className="text-center py-32">
        <p className="font-cormorant text-3xl text-taupe/50">No gallery images yet.</p>
        <p className="font-inter text-sm text-taupe/40 mt-3">Check back soon.</p>
      </div>
    )
  }

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={cn(
              'font-inter text-[10px] tracking-[0.25em] uppercase px-4 py-2 border transition-all duration-200',
              activeFilter === tab.key
                ? 'bg-deep-cocoa text-cream border-deep-cocoa'
                : 'bg-transparent text-deep-cocoa/60 hover:text-deep-cocoa border-taupe/20 hover:border-taupe/50',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => {
            const meta = GALLERY_META[getFilename(img.url)]
            return (
              <motion.button
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: (i % 8) * 0.04 }}
                onClick={() => openLightbox(i)}
                className="group relative aspect-square overflow-hidden bg-cream cursor-pointer text-left"
                aria-label={img.altText || 'View image'}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.altText || 'Lorva chocolate'}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140c06]/90 via-[#140c06]/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none">
                  {meta ? (
                    <>
                      <p className="font-inter text-[7px] sm:text-[8px] tracking-[0.45em] uppercase text-champagne-gold mb-0.5">
                        {TYPE_LABEL[meta.type]}
                      </p>
                      <h3 className="font-cormorant text-base sm:text-xl text-cream leading-tight">{meta.title}</h3>
                      <p className="font-inter text-[9px] text-cream/65 mt-0.5 leading-snug">{meta.flavor}</p>
                      <ShellIndicator shell={meta.shell} />
                    </>
                  ) : (
                    <p className="font-inter text-[10px] text-cream/70 leading-snug">{img.altText}</p>
                  )}
                </div>
              </motion.button>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevImage}
            onNext={nextImage}
          />
        )}
      </AnimatePresence>
    </>
  )
}
