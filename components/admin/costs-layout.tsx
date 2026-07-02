'use client'

import { useState } from 'react'
import { IngredientsManager } from './ingredients-manager'
import { RecipesManager } from './recipes-manager'

type Ingredient = { id: string; name: string; unit: string; costPerUnit: string; notes: string | null }
type RecipeIngredientRow = { id: string; quantity: string; ingredientId: string; ingredient: Ingredient | null }
type Recipe = {
  id: string; name: string; productType: string | null; description: string | null
  yieldQty: number; yieldUnit: string; recipeIngredients: RecipeIngredientRow[]
}

export function CostsLayout({
  ingredients,
  recipes,
}: {
  ingredients: Ingredient[]
  recipes: Recipe[]
}) {
  const [tab, setTab] = useState<'ingredients' | 'recipes'>('ingredients')

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex border-b border-taupe/20">
        {(['ingredients', 'recipes'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 font-inter text-sm capitalize transition-colors border-b-2 -mb-px ${
              tab === t
                ? 'border-cocoa-wine text-cocoa-wine'
                : 'border-transparent text-taupe hover:text-deep-cocoa'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'ingredients' && <IngredientsManager initialIngredients={ingredients} />}
      {tab === 'recipes' && <RecipesManager initialRecipes={recipes} allIngredients={ingredients} />}
    </div>
  )
}
