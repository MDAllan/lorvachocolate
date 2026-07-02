import { db } from '@/lib/db/client'
import { orderRequests, orderCostOverrides } from '@/lib/db/schema'
import { eq, and, gte, sql } from 'drizzle-orm'

export type ProfitSummary = {
  allTime: { revenue: number; cogs: number; profit: number; margin: number }
  thisMonth: { revenue: number; cogs: number; profit: number; margin: number }
  belowThresholdCount: number
  missingCostCount: number
}

async function fetchProfitRows(since?: Date) {
  const rows = await db
    .select({
      total: orderRequests.total,
      status: orderRequests.status,
      computedCost: orderCostOverrides.computedCost,
      manualCost: orderCostOverrides.manualCost,
    })
    .from(orderRequests)
    .leftJoin(orderCostOverrides, eq(orderCostOverrides.orderRequestId, orderRequests.id))
    .where(since ? gte(orderRequests.createdAt, since) : undefined)

  return rows
}

function summarize(rows: Awaited<ReturnType<typeof fetchProfitRows>>) {
  let revenue = 0, cogs = 0
  for (const r of rows) {
    if (r.status === 'completed' && r.total) {
      const rev = parseFloat(r.total)
      const cost = r.manualCost ? parseFloat(r.manualCost) : r.computedCost ? parseFloat(r.computedCost) : null
      revenue += rev
      if (cost !== null) cogs += cost
    }
  }
  const profit = revenue - cogs
  const margin = revenue > 0 ? profit / revenue : 0
  return { revenue, cogs, profit, margin }
}

export async function getProfitSummary(): Promise<ProfitSummary> {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [allRows, monthRows] = await Promise.all([
    fetchProfitRows(),
    fetchProfitRows(startOfMonth),
  ])

  const missingCostCount = allRows.filter(
    r => r.status !== 'cancelled' && !r.manualCost && !r.computedCost
  ).length

  const belowThresholdCount = allRows.filter(r => {
    if (!r.total || (!r.manualCost && !r.computedCost)) return false
    const rev = parseFloat(r.total)
    const cost = r.manualCost ? parseFloat(r.manualCost) : parseFloat(r.computedCost!)
    const margin = rev > 0 ? (rev - cost) / rev : 0
    return margin < 0.30
  }).length

  return {
    allTime: summarize(allRows),
    thisMonth: summarize(monthRows),
    belowThresholdCount,
    missingCostCount,
  }
}
