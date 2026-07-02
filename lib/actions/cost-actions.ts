'use server'

import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth/config'
import { db } from '@/lib/db/client'
import { ingredients, recipes, recipeIngredients, orderCostOverrides } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error('Unauthorized')
  return session
}

// ── Ingredients ───────────────────────────────────────────────────────────────

export async function createIngredient(data: {
  name: string; unit: string; costPerUnit: string; notes?: string
}) {
  await requireAdmin()
  await db.insert(ingredients).values({
    name: data.name,
    unit: data.unit,
    costPerUnit: data.costPerUnit,
    notes: data.notes ?? null,
  })
  revalidatePath('/admin/costs')
}

export async function updateIngredient(id: string, data: {
  name: string; unit: string; costPerUnit: string; notes?: string
}) {
  await requireAdmin()
  await db.update(ingredients).set({
    name: data.name,
    unit: data.unit,
    costPerUnit: data.costPerUnit,
    notes: data.notes ?? null,
    updatedAt: new Date(),
  }).where(eq(ingredients.id, id))
  revalidatePath('/admin/costs')
}

export async function deleteIngredient(id: string) {
  await requireAdmin()
  await db.delete(ingredients).where(eq(ingredients.id, id))
  revalidatePath('/admin/costs')
}

// ── Recipes ───────────────────────────────────────────────────────────────────

export async function createRecipe(data: {
  name: string; productType?: string; description?: string; yieldQty: number; yieldUnit: string
}) {
  await requireAdmin()
  const [row] = await db.insert(recipes).values({
    name: data.name,
    productType: data.productType ?? null,
    description: data.description ?? null,
    yieldQty: data.yieldQty,
    yieldUnit: data.yieldUnit,
  }).returning({ id: recipes.id })
  revalidatePath('/admin/costs')
  return row.id
}

export async function updateRecipe(id: string, data: {
  name: string; productType?: string; description?: string; yieldQty: number; yieldUnit: string
}) {
  await requireAdmin()
  await db.update(recipes).set({
    name: data.name,
    productType: data.productType ?? null,
    description: data.description ?? null,
    yieldQty: data.yieldQty,
    yieldUnit: data.yieldUnit,
    updatedAt: new Date(),
  }).where(eq(recipes.id, id))
  revalidatePath('/admin/costs')
}

export async function deleteRecipe(id: string) {
  await requireAdmin()
  await db.delete(recipes).where(eq(recipes.id, id))
  revalidatePath('/admin/costs')
}

// ── Recipe Ingredients ────────────────────────────────────────────────────────

export async function addRecipeIngredient(data: {
  recipeId: string; ingredientId: string; quantity: string
}) {
  await requireAdmin()
  await db.insert(recipeIngredients).values({
    recipeId: data.recipeId,
    ingredientId: data.ingredientId,
    quantity: data.quantity,
  })
  revalidatePath('/admin/costs')
}

export async function updateRecipeIngredientQty(id: string, quantity: string) {
  await requireAdmin()
  await db.update(recipeIngredients).set({ quantity }).where(eq(recipeIngredients.id, id))
  revalidatePath('/admin/costs')
}

export async function removeRecipeIngredient(id: string) {
  await requireAdmin()
  await db.delete(recipeIngredients).where(eq(recipeIngredients.id, id))
  revalidatePath('/admin/costs')
}

// ── Order Cost ────────────────────────────────────────────────────────────────

export async function setOrderCost(orderRequestId: string, data: {
  recipeId?: string; unitCount: number; manualCost?: string; notes?: string
}) {
  await requireAdmin()

  // Upsert: delete existing then insert
  await db.delete(orderCostOverrides).where(eq(orderCostOverrides.orderRequestId, orderRequestId))
  await db.insert(orderCostOverrides).values({
    orderRequestId,
    recipeId: data.recipeId ?? null,
    unitCount: data.unitCount,
    manualCost: data.manualCost ?? null,
    notes: data.notes ?? null,
  })
  revalidatePath('/admin/orders')
}
