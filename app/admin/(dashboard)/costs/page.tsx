import { db } from '@/lib/db/client'
import { ingredients, recipes, recipeIngredients } from '@/lib/db/schema'
import { asc, eq } from 'drizzle-orm'
import { CostsLayout } from '@/components/admin/costs-layout'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Costs & Recipes | Admin' }

export default async function AdminCostsPage() {
  const [allIngredients, recipeRows] = await Promise.all([
    db.select().from(ingredients).orderBy(asc(ingredients.name)),
    db
      .select({
        recipeId: recipes.id,
        recipeName: recipes.name,
        productType: recipes.productType,
        description: recipes.description,
        yieldQty: recipes.yieldQty,
        yieldUnit: recipes.yieldUnit,
        riId: recipeIngredients.id,
        riQty: recipeIngredients.quantity,
        riIngredientId: recipeIngredients.ingredientId,
        ingId: ingredients.id,
        ingName: ingredients.name,
        ingUnit: ingredients.unit,
        ingCost: ingredients.costPerUnit,
        ingNotes: ingredients.notes,
      })
      .from(recipes)
      .leftJoin(recipeIngredients, eq(recipeIngredients.recipeId, recipes.id))
      .leftJoin(ingredients, eq(ingredients.id, recipeIngredients.ingredientId))
      .orderBy(asc(recipes.name)),
  ])

  // Group recipeRows into structured Recipe objects
  const recipeMap = new Map<string, {
    id: string; name: string; productType: string | null; description: string | null
    yieldQty: number; yieldUnit: string
    recipeIngredients: Array<{ id: string; quantity: string; ingredientId: string; ingredient: { id: string; name: string; unit: string; costPerUnit: string; notes: string | null } | null }>
  }>()

  for (const row of recipeRows) {
    if (!recipeMap.has(row.recipeId)) {
      recipeMap.set(row.recipeId, {
        id: row.recipeId,
        name: row.recipeName,
        productType: row.productType,
        description: row.description,
        yieldQty: row.yieldQty,
        yieldUnit: row.yieldUnit,
        recipeIngredients: [],
      })
    }
    if (row.riId) {
      recipeMap.get(row.recipeId)!.recipeIngredients.push({
        id: row.riId,
        quantity: row.riQty!,
        ingredientId: row.riIngredientId!,
        ingredient: row.ingId ? { id: row.ingId, name: row.ingName!, unit: row.ingUnit!, costPerUnit: row.ingCost!, notes: row.ingNotes ?? null } : null,
      })
    }
  }

  const structuredRecipes = Array.from(recipeMap.values())

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-cormorant text-3xl text-deep-cocoa">Costs & Recipes</h1>
        <p className="font-inter text-sm text-taupe mt-1">
          Track your ingredient costs and build recipes to calculate profit margins.
        </p>
      </div>
      <CostsLayout ingredients={allIngredients} recipes={structuredRecipes} />
    </div>
  )
}
