'use client'

import { useState, useTransition } from 'react'
import { useToast } from '@/hooks/use-toast'
import { updateOrderStatus } from '@/lib/actions/order-actions'

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
  createdAt: Date
}

const STATUS_OPTIONS = ['new', 'contacted', 'confirmed', 'completed', 'cancelled']

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-champagne-gold/20 text-deep-cocoa',
  contacted: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-taupe/20 text-taupe',
  cancelled: 'bg-red-100 text-red-800',
}

function OrderRow({ order }: { order: Order }) {
  const [status, setStatus] = useState(order.status)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

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
    <tr className="border-b border-taupe/10 hover:bg-taupe/5">
      <td className="px-4 py-4">
        <p className="font-inter text-sm font-medium text-deep-cocoa">{order.customerName}</p>
        {order.customerEmail && (
          <p className="font-inter text-xs text-taupe mt-0.5">{order.customerEmail}</p>
        )}
        {order.customerPhone && (
          <p className="font-inter text-xs text-taupe">{order.customerPhone}</p>
        )}
      </td>
      <td className="px-4 py-4">
        <p className="font-inter text-sm text-deep-cocoa">{order.productInterest || '—'}</p>
        {order.boxSize && (
          <p className="font-inter text-xs text-taupe mt-0.5">{order.boxSize} · qty {order.quantity ?? 1}</p>
        )}
      </td>
      <td className="px-4 py-4">
        <p className="font-inter text-sm text-deep-cocoa max-w-xs truncate">{order.notes || '—'}</p>
      </td>
      <td className="px-4 py-4">
        <p className="font-inter text-sm text-deep-cocoa">{order.total ? `$${order.total}` : '—'}</p>
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
          {new Date(order.createdAt).toLocaleDateString('en-CA', {
            month: 'short', day: 'numeric', year: 'numeric'
          })}
        </p>
      </td>
    </tr>
  )
}

export function OrdersTable({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-20 border border-taupe/20">
        <p className="font-cormorant text-2xl text-taupe mb-2">No orders yet</p>
        <p className="font-inter text-sm text-taupe/60">
          Orders submitted through your website will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto border border-taupe/20">
      <table className="w-full">
        <thead>
          <tr className="border-b border-taupe/20 bg-cream/50">
            <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Customer</th>
            <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Product</th>
            <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Notes</th>
            <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Total</th>
            <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Status</th>
            <th className="px-4 py-3 text-right font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
