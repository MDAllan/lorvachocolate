'use client'

import { cn } from '@/lib/utils'

interface BoxSizeSelectorProps {
  value: '12pc' | '16pc'
  onChange: (size: '12pc' | '16pc') => void
  price12: number
  price16: number
}

export function BoxSizeSelector({ value, onChange, price12, price16 }: BoxSizeSelectorProps) {
  const sizes = [
    { id: '12pc' as const, label: '12 pc', price: price12 },
    { id: '16pc' as const, label: '16 pc', price: price16 },
  ]

  return (
    <div className="flex gap-3">
      {sizes.map(({ id, label, price }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            'flex-1 py-2 px-2 sm:py-3 sm:px-4 rounded-none border font-inter text-xs sm:text-sm transition-all duration-300',
            value === id
              ? 'border-deep-cocoa bg-deep-cocoa text-cream'
              : 'border-taupe/30 bg-transparent text-deep-cocoa hover:border-deep-cocoa/50'
          )}
        >
          <span className="block font-medium">{label}</span>
          <span className="block text-xs opacity-80 mt-0.5">${price}</span>
        </button>
      ))}
    </div>
  )
}
