'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calculator, Minus, AlertTriangle } from 'lucide-react'
import type { ProfitSummary } from '@/lib/data/profit-db'

function fmt(n: number) {
  return n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function ProfitCalculator({ initialData }: { initialData: ProfitSummary }) {
  const [collapsed, setCollapsed] = useState(false)
  const [period, setPeriod] = useState<'month' | 'all'>('month')

  useEffect(() => {
    const stored = localStorage.getItem('profit-calc-collapsed')
    if (stored) setCollapsed(stored === 'true')
    const storedPeriod = localStorage.getItem('profit-calc-period')
    if (storedPeriod === 'all' || storedPeriod === 'month') setPeriod(storedPeriod)
  }, [])

  function toggleCollapsed() {
    const next = !collapsed
    setCollapsed(next)
    localStorage.setItem('profit-calc-collapsed', String(next))
  }

  function togglePeriod() {
    const next = period === 'month' ? 'all' : 'month'
    setPeriod(next)
    localStorage.setItem('profit-calc-period', next)
  }

  const data = period === 'month' ? initialData.thisMonth : initialData.allTime
  const marginPct = (data.margin * 100).toFixed(1)
  const profitable = data.profit >= 0

  return (
    <div className="fixed bottom-5 right-5 z-40 w-72 shadow-2xl border border-champagne-gold/20 bg-deep-cocoa text-cream">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 cursor-pointer select-none" onClick={toggleCollapsed}>
        <div className="flex items-center gap-2">
          <Calculator className="h-3.5 w-3.5 text-champagne-gold" />
          <span className="font-inter text-[11px] tracking-[0.3em] uppercase text-champagne-gold">Profit Overview</span>
        </div>
        <Minus className="h-3.5 w-3.5 text-cream/40" />
      </div>

      {!collapsed && (
        <>
          {/* Period toggle */}
          <div className="flex border-b border-white/10">
            {(['month', 'all'] as const).map(p => (
              <button
                key={p}
                onClick={togglePeriod}
                className={`flex-1 py-2 font-inter text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  period === p ? 'bg-cocoa-wine text-cream' : 'text-cream/40 hover:text-cream/70'
                }`}
              >
                {p === 'month' ? 'This Month' : 'All Time'}
              </button>
            ))}
          </div>

          {/* Metrics */}
          <div className="px-4 py-4 space-y-3">
            <div className="flex justify-between">
              <span className="font-inter text-xs text-cream/60">Revenue</span>
              <span className="font-inter text-sm text-cream">${fmt(data.revenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-inter text-xs text-cream/60">COGS</span>
              <span className="font-inter text-sm text-cream">−${fmt(data.cogs)}</span>
            </div>
            <div className="border-t border-white/10 pt-3 flex justify-between">
              <span className="font-inter text-xs text-champagne-gold">Gross Profit</span>
              <div className="text-right">
                <span className={`font-inter text-sm font-medium ${profitable ? 'text-green-400' : 'text-red-400'}`}>
                  ${fmt(data.profit)}
                </span>
                <span className={`font-inter text-[10px] ml-1.5 ${profitable ? 'text-green-400/70' : 'text-red-400/70'}`}>
                  {profitable ? '▲' : '▼'} {marginPct}%
                </span>
              </div>
            </div>
          </div>

          {/* Warnings */}
          {(initialData.belowThresholdCount > 0 || initialData.missingCostCount > 0) && (
            <div className="px-4 pb-4 space-y-1.5">
              {initialData.belowThresholdCount > 0 && (
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  <span className="font-inter text-[10px]">{initialData.belowThresholdCount} order{initialData.belowThresholdCount !== 1 ? 's' : ''} below 30% margin</span>
                </div>
              )}
              {initialData.missingCostCount > 0 && (
                <div className="flex items-center gap-2 text-cream/40">
                  <AlertTriangle className="h-3 w-3 shrink-0" />
                  <span className="font-inter text-[10px]">{initialData.missingCostCount} order{initialData.missingCostCount !== 1 ? 's' : ''} missing cost data</span>
                </div>
              )}
            </div>
          )}

          {/* Link */}
          <div className="border-t border-white/10 px-4 py-3">
            <Link href="/admin/orders" className="font-inter text-[10px] tracking-[0.2em] uppercase text-champagne-gold/70 hover:text-champagne-gold transition-colors">
              → Go to Orders
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
