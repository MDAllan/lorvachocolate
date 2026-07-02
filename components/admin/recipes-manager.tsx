'use client'

import { useState, useTransition } from 'react'
import { Plus, Trash2, ChevronRight } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { createRecipe, deleteRecipe, addRecipeIngredient, removeRecipeIngredient } from '@/lib/actions/cost-actions'
import { computeRecipeCost } from '@/lib/utils/profit'

type Ingredient = { id: string; name: string; unit: string; costPerUnit: string; notes: string | null }
type RecipeIngredientRow = { id: string; quantity: string; ingredientId: string; ingredient: Ingredient | null }
type Recipe = {
  id: string; name: string; productType: string | null
  description: string | null; yieldQty: number; yieldUnit: string
  recipeIngredients: RecipeIngredientRow[]
}

const PRODUCT_TYPES = ['bonbon', 'breakable_heart', 'breakable_ball', 'bar', 'favour_box', 'other']

export function RecipesManager({
  initialRecipes,
  allIngredients,
}: {
  initialRecipes: Recipe[]
  allIngredients: Ingredient[]
}) {
  const [recipes, setRecipes] = useState(initialRecipes)
  const [selectedId, setSelectedId] = useState<string | null>(initialRecipes[0]?.id ?? null)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  // New recipe form
  const [newName, setNewName] = useState('')
  const [newType, setNewType] = useState('')
  const [newYield, setNewYield] = useState('1')
  const [newYieldUnit, setNewYieldUnit] = useState('pieces')

  // Add ingredient to recipe
  const [addIngId, setAddIngId] = useState(allIngredients[0]?.id ?? '')
  const [addQty, setAddQty] = useState('')

  const selected = recipes.find(r => r.id === selectedId) ?? null

  function handleCreateRecipe() {
    if (!newName) return
    startTransition(async () => {
      try {
        const id = await createRecipe({ name: newName, productType: newType || undefined, yieldQty: parseInt(newYield) || 1, yieldUnit: newYieldUnit })
        const newRecipe: Recipe = { id, name: newName, productType: newType || null, description: null, yieldQty: parseInt(newYield) || 1, yieldUnit: newYieldUnit, recipeIngredients: [] }
        setRecipes(prev => [...prev, newRecipe])
        setSelectedId(id)
        setNewName(''); setNewType(''); setNewYield('1')
        toast({ title: 'Recipe created' })
      } catch {
        toast({ title: 'Failed to create recipe', variant: 'destructive' })
      }
    })
  }

  function handleDeleteRecipe(id: string) {
    startTransition(async () => {
      try {
        await deleteRecipe(id)
        setRecipes(prev => prev.filter(r => r.id !== id))
        if (selectedId === id) setSelectedId(recipes.find(r => r.id !== id)?.id ?? null)
        toast({ title: 'Recipe deleted' })
      } catch {
        toast({ title: 'Failed to delete recipe', variant: 'destructive' })
      }
    })
  }

  function handleAddIngredient() {
    if (!selectedId || !addIngId || !addQty) return
    startTransition(async () => {
      try {
        await addRecipeIngredient({ recipeId: selectedId, ingredientId: addIngId, quantity: addQty })
        const ing = allIngredients.find(i => i.id === addIngId) ?? null
        const newRI: RecipeIngredientRow = { id: crypto.randomUUID(), quantity: addQty, ingredientId: addIngId, ingredient: ing }
        setRecipes(prev => prev.map(r => r.id === selectedId ? { ...r, recipeIngredients: [...r.recipeIngredients, newRI] } : r))
        setAddQty('')
        toast({ title: 'Ingredient added to recipe' })
      } catch {
        toast({ title: 'Failed to add ingredient', variant: 'destructive' })
      }
    })
  }

  function handleRemoveIngredient(riId: string) {
    startTransition(async () => {
      try {
        await removeRecipeIngredient(riId)
        setRecipes(prev => prev.map(r => r.id === selectedId
          ? { ...r, recipeIngredients: r.recipeIngredients.filter(ri => ri.id !== riId) }
          : r
        ))
      } catch {
        toast({ title: 'Failed to remove', variant: 'destructive' })
      }
    })
  }

  const costSummary = selected
    ? computeRecipeCost(
        selected.recipeIngredients
          .filter(ri => ri.ingredient)
          .map(ri => ({ quantity: ri.quantity, costPerUnit: ri.ingredient!.costPerUnit })),
        selected.yieldQty
      )
    : null

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left: Recipe list */}
      <div className="space-y-3">
        <p className="font-inter text-[10px] tracking-[0.3em] text-taupe uppercase mb-2">Your Recipes</p>
        {recipes.map(r => (
          <div
            key={r.id}
            className={`flex items-center justify-between p-3 border cursor-pointer transition-colors group ${
              selectedId === r.id ? 'border-cocoa-wine bg-cocoa-wine/5' : 'border-taupe/20 hover:border-taupe/40'
            }`}
            onClick={() => setSelectedId(r.id)}
          >
            <div>
              <p className="font-inter text-sm text-deep-cocoa">{r.name}</p>
              {r.productType && <p className="font-inter text-[10px] text-taupe capitalize">{r.productType.replace('_', ' ')}</p>}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={e => { e.stopPropagation(); handleDeleteRecipe(r.id) }}
                className="p-1 text-taupe/40 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="h-3 w-3" />
              </button>
              <ChevronRight className={`h-4 w-4 ${selectedId === r.id ? 'text-cocoa-wine' : 'text-taupe/40'}`} />
            </div>
          </div>
        ))}

        {/* New recipe mini form */}
        <div className="border border-dashed border-taupe/30 p-3 space-y-2">
          <p className="font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">New Recipe</p>
          <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Recipe name" className="w-full font-inter text-sm border border-taupe/30 px-2 py-1.5 bg-white placeholder:text-taupe/40" />
          <select value={newType} onChange={e => setNewType(e.target.value)} className="w-full font-inter text-sm border border-taupe/30 px-2 py-1.5 bg-white text-taupe">
            <option value="">Product type (optional)</option>
            {PRODUCT_TYPES.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
          </select>
          <div className="flex gap-2">
            <input value={newYield} onChange={e => setNewYield(e.target.value)} type="number" min="1" placeholder="Yield qty" className="w-20 font-inter text-sm border border-taupe/30 px-2 py-1.5 bg-white" />
            <input value={newYieldUnit} onChange={e => setNewYieldUnit(e.target.value)} placeholder="pieces" className="flex-1 font-inter text-sm border border-taupe/30 px-2 py-1.5 bg-white" />
          </div>
          <button onClick={handleCreateRecipe} disabled={!newName || isPending} className="flex items-center gap-1 px-3 py-1.5 bg-deep-cocoa text-cream font-inter text-xs w-full justify-center disabled:opacity-40 hover:bg-cocoa-wine transition-colors">
            <Plus className="h-3 w-3" /> Create Recipe
          </button>
        </div>
      </div>

      {/* Right: Recipe detail */}
      <div className="md:col-span-2">
        {!selected ? (
          <div className="border border-taupe/20 p-8 text-center">
            <p className="font-inter text-sm text-taupe/60">Select a recipe to view its ingredients and cost breakdown.</p>
          </div>
        ) : (
          <div className="border border-taupe/20 p-6 space-y-5">
            <div>
              <h3 className="font-cormorant text-2xl text-deep-cocoa">{selected.name}</h3>
              <p className="font-inter text-xs text-taupe">Makes {selected.yieldQty} {selected.yieldUnit}</p>
            </div>

            {/* Ingredient list */}
            <table className="w-full">
              <thead>
                <tr className="border-b border-taupe/20">
                  <th className="pb-2 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Ingredient</th>
                  <th className="pb-2 text-right font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Qty</th>
                  <th className="pb-2 text-right font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Cost/unit</th>
                  <th className="pb-2 text-right font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Subtotal</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {selected.recipeIngredients.map(ri => {
                  const ing = ri.ingredient
                  const subtotal = ing ? parseFloat(ri.quantity) * parseFloat(ing.costPerUnit) : 0
                  return (
                    <tr key={ri.id} className="border-b border-taupe/10 group">
                      <td className="py-2 font-inter text-sm text-deep-cocoa">{ing?.name ?? '—'}</td>
                      <td className="py-2 text-right font-inter text-sm text-taupe">{ri.quantity} {ing?.unit}</td>
                      <td className="py-2 text-right font-inter text-sm text-taupe">${ing ? parseFloat(ing.costPerUnit).toFixed(4) : '—'}</td>
                      <td className="py-2 text-right font-inter text-sm text-deep-cocoa">${subtotal.toFixed(4)}</td>
                      <td className="py-2 pl-3">
                        <button onClick={() => handleRemoveIngredient(ri.id)} className="text-taupe/30 hover:text-red-500 opacity-0 group-hover:opacity-100">
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Cost summary */}
            {costSummary && (
              <div className="bg-deep-cocoa text-cream px-5 py-4 space-y-1">
                <div className="flex justify-between font-inter text-sm">
                  <span className="text-cream/70">Total Recipe Cost</span>
                  <span className="font-medium">${costSummary.totalCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-inter text-sm border-t border-white/10 pt-2 mt-2">
                  <span className="text-champagne-gold">Cost per {selected.yieldUnit.replace(/s$/, '')}</span>
                  <span className="text-champagne-gold font-medium">${costSummary.costPerUnit.toFixed(4)}</span>
                </div>
              </div>
            )}

            {/* Add ingredient */}
            <div className="border-t border-taupe/20 pt-4">
              <p className="font-inter text-[10px] tracking-[0.3em] text-taupe uppercase mb-3">Add Ingredient</p>
              <div className="flex gap-2">
                <select value={addIngId} onChange={e => setAddIngId(e.target.value)} className="flex-1 font-inter text-sm border border-taupe/30 px-2 py-1.5 bg-white">
                  {allIngredients.map(i => <option key={i.id} value={i.id}>{i.name} (/{i.unit})</option>)}
                </select>
                <input value={addQty} onChange={e => setAddQty(e.target.value)} type="number" step="0.01" placeholder="Qty" className="w-24 font-inter text-sm border border-taupe/30 px-2 py-1.5 bg-white" />
                <button onClick={handleAddIngredient} disabled={!addQty || isPending} className="px-3 py-1.5 bg-deep-cocoa text-cream font-inter text-xs disabled:opacity-40 hover:bg-cocoa-wine transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
