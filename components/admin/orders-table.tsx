'use client'

import { useState, useTransition } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { updateOrderStatus } from '@/lib/actions/order-actions'
import { setOrderCost } from '@/lib/actions/cost-actions'
import { computeOrderProfit, profitVsAverage } from '@/lib/utils/profit'

type CostRow = {
  computedCost: string | null
  manualCost: string | null
} | null

type Order = {
  id: string
  customerName: string
  customerEmail: string | null
  customerPhone: string | null
  productInterest: string | null
  boxSize: string | null
  quantity: number | null
  notes: string | null
  total: string | null
  status: string
  orderType: string
  createdAt: Date
  cost: CostRow
}

type Recipe = { id: string; name: string }

const STATUS_OPTIONS = ['new', 'contacted', 'confirmed', 'completed', 'cancelled']

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-champagne-gold/20 text-deep-cocoa',
  contacted: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-taupe/20 text-taupe',
  cancelled: 'bg-red-100 text-red-800',
}

const TYPE_BADGE: Record<string, string> = {
  favour: 'bg-champagne-gold/25 text-deep-cocoa',
  breakable: 'bg-cocoa-wine/15 text-cocoa-wine',
  custom: 'bg-taupe/15 text-taupe',
}

const TYPE_LABELS: Record<string, string> = {
  favour: 'Favour',
  breakable: 'Breakable',
  custom: 'Custom',
}

const FILTER_TYPES = ['all', 'custom', 'favour', 'breakable'] as const
const FILTER_STATUSES = ['all', ...STATUS_OPTIONS] as const

function MarginDot({ margin, avgMargin }: { margin: number; avgMargin: number }) {
  const rel = profitVsAverage(margin, avgMargin)
  const pct = (margin * 100).toFixed(0)
  if (rel === 'above') return <span className="flex items-center gap-1 text-green-600 font-inter text-xs">🟢 {pct}%</span>
  if (rel === 'below') return <span className="flex items-center gap-1 text-red-500 font-inter text-xs">🔴 {pct}%</span>
  return <span className="flex items-center gap-1 text-amber-500 font-inter text-xs">🟡 {pct}%</span>
}

function SetCostPanel({ order, recipes, onSaved }: { order: Order; recipes: Recipe[]; onSaved: () => void }) {
  const [recipeId, setRecipeId] = useState('')
  const [unitCount, setUnitCount] = useState(String(order.quantity ?? 1))
  const [manualCost, setManualCost] = useState('')
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  function handleSave() {
    startTransition(async () => {
      try {
        await setOrderCost(order.id, {
          recipeId: recipeId || undefined,
          unitCount: parseInt(unitCount) || 1,
          manualCost: manualCost || undefined,
        })
        toast({ title: 'Cost saved' })
        onSaved()
      } catch {
        toast({ title: 'Failed to save cost', variant: 'destructive' })
      }
    })
  }

  return (
    <div className="absolute right-0 top-8 z-20 bg-white border border-taupe/30 shadow-lg p-3 w-64 space-y-2">
      <p className="font-inter text-[10px] tracking-[0.3em] uppercase text-taupe">Set Cost</p>
      {recipes.length > 0 && (
        <select value={recipeId} onChange={e => setRecipeId(e.target.value)} className="w-full font-inter text-xs border border-taupe/30 px-2 py-1.5 bg-white">
          <option value="">No recipe (manual cost)</option>
          {recipes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
        </select>
      )}
      <div className="flex gap-2">
        <input value={unitCount} onChange={e => setUnitCount(e.target.value)} type="number" min="1" placeholder="Units" className="w-16 font-inter text-xs border border-taupe/30 px-2 py-1.5" />
        <input value={manualCost} onChange={e => setManualCost(e.target.value)} type="number" step="0.01" placeholder="$ manual cost" className="flex-1 font-inter text-xs border border-taupe/30 px-2 py-1.5" />
      </div>
      <button onClick={handleSave} disabled={isPending} className="w-full py-1.5 bg-deep-cocoa text-cream font-inter text-xs hover:bg-cocoa-wine transition-colors disabled:opacity-40">
        Save
      </button>
    </div>
  )
}

function OrderRow({ order, avgMargin, recipes }: { order: Order; avgMargin: number; recipes: Recipe[] }) {
  const [status, setStatus] = useState(order.status)
  const [showCostPanel, setShowCostPanel] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const profit = computeOrderProfit({
    total: order.total,
    computedCost: order.cost?.computedCost ?? null,
    manualCost: order.cost?.manualCost ?? null,
  })
  const isLowMargin = profit && profit.margin < 0.30

  function handleStatusChange(newStatus: string) {
    startTransition(async () => {
      try {
        await updateOrderStatus(order.id, newStatus)
        setStatus(newStatus)
        toast({ title: 'Status updated' })
      } catch {
        toast({ title: 'Failed to update status', variant: 'destructive' })
      }
    })
  }

  return (
    <tr className={`border-b border-taupe/10 hover:bg-taupe/5 ${isLowMargin ? 'bg-amber-50/40' : ''}`}>
      <td className="px-4 py-4">
        <p className="font-inter text-sm font-medium text-deep-cocoa">{order.customerName}</p>
        {order.customerEmail && <p className="font-inter text-xs text-taupe mt-0.5">{order.customerEmail}</p>}
        {order.customerPhone && <p className="font-inter text-xs text-taupe">{order.customerPhone}</p>}
      </td>
      <td className="px-4 py-4">
        <div className="flex items-start gap-2">
          <span className={`shrink-0 font-inter text-[9px] px-1.5 py-0.5 tracking-wider uppercase ${TYPE_BADGE[order.orderType] ?? TYPE_BADGE.custom}`}>
            {TYPE_LABELS[order.orderType] ?? order.orderType}
          </span>
          <div>
            <p className="font-inter text-sm text-deep-cocoa">{order.productInterest || '—'}</p>
            {order.boxSize && <p className="font-inter text-xs text-taupe mt-0.5">{order.boxSize} · qty {order.quantity ?? 1}</p>}
          </div>
        </div>
      </td>
      <td className="px-4 py-4 max-w-[180px]">
        <p className="font-inter text-sm text-deep-cocoa truncate">{order.notes || '—'}</p>
      </td>
      <td className="px-4 py-4">
        <p className="font-inter text-sm text-deep-cocoa">{order.total ? `$${order.total}` : '—'}</p>
      </td>
      <td className="px-4 py-4">
        <div className="relative flex items-center gap-1">
          {profit ? (
            <div className="flex items-center gap-1">
              <MarginDot margin={profit.margin} avgMargin={avgMargin} />
              {isLowMargin && <AlertTriangle className="h-3 w-3 text-amber-500" />}
            </div>
          ) : (
            <button
              onClick={() => setShowCostPanel(v => !v)}
              className="font-inter text-[10px] text-taupe/60 hover:text-cocoa-wine underline underline-offset-2 transition-colors"
            >
              Set cost
            </button>
          )}
          {showCostPanel && (
            <SetCostPanel
              order={order}
              recipes={recipes}
              onSaved={() => setShowCostPanel(false)}
            />
          )}
        </div>
      </td>
      <td className="px-4 py-4">
        <select
          value={status}
          onChange={e => handleStatusChange(e.target.value)}
          disabled={isPending}
          className={`font-inter text-xs px-2 py-1 rounded-full border-0 cursor-pointer ${STATUS_STYLES[status] ?? 'bg-taupe/10'}`}
        >
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s} className="bg-white text-deep-cocoa">
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </td>
      <td className="px-4 py-4 text-right">
        <p className="font-inter text-xs text-taupe">
          {new Date(order.createdAt).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </td>
    </tr>
  )
}

export function OrdersTable({ orders, avgMargin, recipes }: { orders: Order[]; avgMargin: number; recipes: Recipe[] }) {
  const [typeFilter, setTypeFilter] = useState<typeof FILTER_TYPES[number]>('all')
  const [statusFilter, setStatusFilter] = useState<typeof FILTER_STATUSES[number]>('all')

  const filtered = orders.filter(o => {
    if (typeFilter !== 'all' && o.orderType !== typeFilter) return false
    if (statusFilter !== 'all' && o.status !== statusFilter) return false
    return true
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex gap-1">
          {FILTER_TYPES.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`font-inter text-xs px-3 py-1.5 transition-colors capitalize ${
                typeFilter === t ? 'bg-deep-cocoa text-cream' : 'border border-taupe/30 text-taupe hover:border-taupe/60'
              }`}
            >
              {t === 'all' ? 'All Types' : TYPE_LABELS[t]}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          {FILTER_STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`font-inter text-xs px-3 py-1.5 transition-colors capitalize ${
                statusFilter === s ? 'bg-deep-cocoa text-cream' : 'border border-taupe/30 text-taupe hover:border-taupe/60'
              }`}
            >
              {s === 'all' ? 'All Statuses' : s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20 border border-taupe/20">
          <p className="font-cormorant text-2xl text-taupe mb-2">No orders found</p>
          <p className="font-inter text-sm text-taupe/60">Try a different filter.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-taupe/20">
          <table className="w-full">
            <thead>
              <tr className="border-b border-taupe/20 bg-cream/50">
                <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Customer</th>
                <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Order</th>
                <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Notes</th>
                <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Total</th>
                <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Margin</th>
                <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Status</th>
                <th className="px-4 py-3 text-right font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <OrderRow key={order.id} order={order} avgMargin={avgMargin} recipes={recipes} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
