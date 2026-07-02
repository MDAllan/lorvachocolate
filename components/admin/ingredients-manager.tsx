'use client'

import { useState, useTransition } from 'react'
import { Pencil, Trash2, Check, X, Plus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { createIngredient, updateIngredient, deleteIngredient } from '@/lib/actions/cost-actions'

type Ingredient = {
  id: string
  name: string
  unit: string
  costPerUnit: string
  notes: string | null
}

const UNITS = ['g', 'kg', 'ml', 'L', 'each', 'tsp', 'tbsp', 'cup', 'oz']

function IngredientRow({ ingredient, onDelete }: { ingredient: Ingredient; onDelete: (id: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(ingredient.name)
  const [unit, setUnit] = useState(ingredient.unit)
  const [cost, setCost] = useState(ingredient.costPerUnit)
  const [notes, setNotes] = useState(ingredient.notes ?? '')
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  function handleSave() {
    if (!name || !unit || !cost) return
    startTransition(async () => {
      try {
        await updateIngredient(ingredient.id, { name, unit, costPerUnit: cost, notes: notes || undefined })
        setEditing(false)
        toast({ title: 'Ingredient updated' })
      } catch {
        toast({ title: 'Failed to update', variant: 'destructive' })
      }
    })
  }

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteIngredient(ingredient.id)
        onDelete(ingredient.id)
        toast({ title: 'Ingredient deleted' })
      } catch {
        toast({ title: 'Cannot delete — may be used in a recipe', variant: 'destructive' })
      }
    })
  }

  if (editing) {
    return (
      <tr className="border-b border-taupe/10 bg-vanilla/20">
        <td className="px-4 py-3">
          <input value={name} onChange={e => setName(e.target.value)} className="w-full font-inter text-sm border border-taupe/30 px-2 py-1 bg-white" />
        </td>
        <td className="px-4 py-3">
          <select value={unit} onChange={e => setUnit(e.target.value)} className="font-inter text-sm border border-taupe/30 px-2 py-1 bg-white">
            {UNITS.map(u => <option key={u}>{u}</option>)}
            <option value={unit}>{unit}</option>
          </select>
        </td>
        <td className="px-4 py-3">
          <input value={cost} onChange={e => setCost(e.target.value)} type="number" step="0.0001" className="w-24 font-inter text-sm border border-taupe/30 px-2 py-1 bg-white" />
        </td>
        <td className="px-4 py-3">
          <input value={notes} onChange={e => setNotes(e.target.value)} className="w-full font-inter text-sm border border-taupe/30 px-2 py-1 bg-white" placeholder="Optional note" />
        </td>
        <td className="px-4 py-3">
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={isPending} className="p-1 text-green-700 hover:bg-green-50 rounded">
              <Check className="h-4 w-4" />
            </button>
            <button onClick={() => setEditing(false)} className="p-1 text-taupe hover:bg-taupe/10 rounded">
              <X className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className="border-b border-taupe/10 hover:bg-taupe/5 group">
      <td className="px-4 py-3 font-inter text-sm text-deep-cocoa">{ingredient.name}</td>
      <td className="px-4 py-3 font-inter text-sm text-taupe">{ingredient.unit}</td>
      <td className="px-4 py-3 font-inter text-sm text-deep-cocoa">${parseFloat(ingredient.costPerUnit).toFixed(4)}</td>
      <td className="px-4 py-3 font-inter text-xs text-taupe">{ingredient.notes ?? '—'}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => setEditing(true)} className="p-1 text-taupe hover:text-deep-cocoa">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button onClick={handleDelete} disabled={isPending} className="p-1 text-taupe hover:text-red-600">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  )
}

export function IngredientsManager({ initialIngredients }: { initialIngredients: Ingredient[] }) {
  const [items, setItems] = useState(initialIngredients)
  const [newName, setNewName] = useState('')
  const [newUnit, setNewUnit] = useState('g')
  const [newCost, setNewCost] = useState('')
  const [newNotes, setNewNotes] = useState('')
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  function handleAdd() {
    if (!newName || !newUnit || !newCost) return
    startTransition(async () => {
      try {
        await createIngredient({ name: newName, unit: newUnit, costPerUnit: newCost, notes: newNotes || undefined })
        setNewName(''); setNewCost(''); setNewNotes('')
        toast({ title: 'Ingredient added' })
        // Optimistic: page will revalidate
      } catch {
        toast({ title: 'Failed to add ingredient', variant: 'destructive' })
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto border border-taupe/20">
        <table className="w-full">
          <thead>
            <tr className="border-b border-taupe/20 bg-cream/50">
              <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Ingredient</th>
              <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Unit</th>
              <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Cost / Unit</th>
              <th className="px-4 py-3 text-left font-inter text-[10px] tracking-[0.3em] text-taupe uppercase">Notes</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map(ing => (
              <IngredientRow
                key={ing.id}
                ingredient={ing}
                onDelete={id => setItems(prev => prev.filter(i => i.id !== id))}
              />
            ))}
            {/* Add row */}
            <tr className="border-b border-taupe/10 bg-champagne-gold/5">
              <td className="px-4 py-3">
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Dark Couverture" className="w-full font-inter text-sm border border-taupe/30 px-2 py-1 bg-white placeholder:text-taupe/40" />
              </td>
              <td className="px-4 py-3">
                <select value={newUnit} onChange={e => setNewUnit(e.target.value)} className="font-inter text-sm border border-taupe/30 px-2 py-1 bg-white">
                  {UNITS.map(u => <option key={u}>{u}</option>)}
                </select>
              </td>
              <td className="px-4 py-3">
                <input value={newCost} onChange={e => setNewCost(e.target.value)} type="number" step="0.0001" placeholder="0.0450" className="w-24 font-inter text-sm border border-taupe/30 px-2 py-1 bg-white placeholder:text-taupe/40" />
              </td>
              <td className="px-4 py-3">
                <input value={newNotes} onChange={e => setNewNotes(e.target.value)} placeholder="Optional" className="w-full font-inter text-sm border border-taupe/30 px-2 py-1 bg-white placeholder:text-taupe/40" />
              </td>
              <td className="px-4 py-3">
                <button onClick={handleAdd} disabled={isPending || !newName || !newCost} className="flex items-center gap-1 px-3 py-1.5 bg-deep-cocoa text-cream font-inter text-xs disabled:opacity-40 hover:bg-cocoa-wine transition-colors">
                  <Plus className="h-3 w-3" /> Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {items.length === 0 && (
        <p className="font-inter text-sm text-taupe/60 text-center py-4">No ingredients yet. Add your first one above.</p>
      )}
    </div>
  )
}
