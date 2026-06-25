'use client'

import { useState } from 'react'
import type { DbProduct } from '@/lib/data/products-db'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { OrderForm } from '@/components/forms/order-form'
import { BoxSizeSelector } from '@/components/ui/box-size-selector'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}


export function ProductCard({ product }: { product: DbProduct }) {
  const [boxSize, setBoxSize] = useState<'12pc' | '16pc'>('12pc')
  const isBar = product.category === 'bars'

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '1XXXXXXXXXX'
  const waText = isBar
    ? `Hi Lorva! I'd like to order the ${product.name}.`
    : `Hi Lorva! I'd like to order the ${product.name} (${boxSize}).`

  return (
    <div className="group flex flex-col bg-cream border border-taupe/15 hover:border-taupe/30 hover:shadow-xl transition-all duration-500">
      {product.imageUrl && (
        <div className="relative aspect-square overflow-hidden">
          {isBar && (
            <div className="absolute top-4 left-4 z-10">
              <span className="font-inter text-[9px] tracking-[0.4em] uppercase text-taupe border border-taupe/30 px-2 py-1">
                Bar
              </span>
            </div>
          )}
          <div className="w-full h-full group-hover:scale-[1.02] transition-transform duration-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {isBar && !product.imageUrl && (
          <div className="mb-2">
            <span className="font-inter text-[9px] tracking-[0.4em] uppercase text-taupe border border-taupe/30 px-2 py-1">Bar</span>
          </div>
        )}
        <h3 className="font-cormorant text-2xl text-deep-cocoa mb-2 group-hover:text-cocoa-wine transition-colors duration-300">
          {product.name}
        </h3>
        <p className="font-inter text-sm text-taupe leading-relaxed mb-4 flex-1 line-clamp-3">
          {product.description}
        </p>

        {/* Bonbon flavors — comma-separated italic text */}
        {!isBar && product.flavors && product.flavors.length > 0 && (
          <p className="font-cormorant text-sm text-taupe/70 mb-5 leading-relaxed">
            {product.flavors.join(' · ')}
          </p>
        )}

        {/* Bonbon: box size selector */}
        {!isBar && (
          <BoxSizeSelector
            value={boxSize}
            onChange={setBoxSize}
            price12={product.price12 ?? 0}
            price16={product.price16 ?? 0}
          />
        )}

        {/* Bar: single price */}
        {isBar && (
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-cormorant text-3xl text-deep-cocoa">
              ${product.priceEach?.toFixed(2)}
            </span>
            <span className="font-inter text-[10px] text-taupe tracking-widest uppercase">per bar</span>
          </div>
        )}

        <div className="mt-5 flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex-1 py-3 border border-deep-cocoa text-deep-cocoa font-inter text-[11px] tracking-[0.35em] uppercase hover:bg-deep-cocoa hover:text-cream transition-all duration-500">
                Order Now
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-cormorant text-2xl text-deep-cocoa">
                  {product.name}
                </DialogTitle>
              </DialogHeader>
              <OrderForm defaultProduct={product.name} />
            </DialogContent>
          </Dialog>

          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 border border-taupe/30 hover:border-taupe/60 transition-colors duration-300 flex items-center justify-center text-taupe hover:text-deep-cocoa"
            aria-label="Order via WhatsApp"
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </div>
  )
}
