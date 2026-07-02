export function computeRecipeCost(
  recipeIngredients: Array<{ quantity: string; costPerUnit: string }>,
  yieldQty: number
): { totalCost: number; costPerUnit: number } {
  const totalCost = recipeIngredients.reduce(
    (sum, ri) => sum + parseFloat(ri.quantity) * parseFloat(ri.costPerUnit),
    0
  )
  return { totalCost, costPerUnit: yieldQty > 0 ? totalCost / yieldQty : 0 }
}

export function computeOrderProfit(order: {
  total: string | null
  computedCost: string | null
  manualCost: string | null
}): { revenue: number; cogs: number; profit: number; margin: number } | null {
  const revenue = order.total ? parseFloat(order.total) : null
  const cogs = order.manualCost
    ? parseFloat(order.manualCost)
    : order.computedCost
      ? parseFloat(order.computedCost)
      : null
  if (revenue === null || cogs === null) return null
  const profit = revenue - cogs
  const margin = revenue > 0 ? profit / revenue : 0
  return { revenue, cogs, profit, margin }
}

export function profitVsAverage(
  orderMargin: number,
  avgMargin: number
): 'above' | 'below' | 'at' {
  if (orderMargin > avgMargin + 0.05) return 'above'
  if (orderMargin < avgMargin - 0.05) return 'below'
  return 'at'
}

export function computeAverageMargin(
  rows: Array<{ total: string | null; computedCost: string | null; manualCost: string | null }>
): number {
  const profits = rows
    .map(r => computeOrderProfit(r))
    .filter((p): p is NonNullable<typeof p> => p !== null)
  if (profits.length === 0) return 0
  return profits.reduce((sum, p) => sum + p.margin, 0) / profits.length
}
