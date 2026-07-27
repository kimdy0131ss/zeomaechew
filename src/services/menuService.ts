import type { Decision, Menu } from '../types/menu'
import { supabase } from '../lib/supabase'

export async function findRecommendedMenus(decision: Decision): Promise<Menu[]> {
  if (!supabase) return []

  const { data, error } = await supabase.from('menus').select('*')
  if (error) throw error

  const menus = (data ?? []) as Array<{
    id: string
    name: string
    category: string
    price_from: number
    price_to: number
    weight: string
    temperature: string
    spicy_level: string
    meal_time: string
    company: string
    main_ingredient: string
    meal_format: string
    description: string
  }>

  // Rank instead of requiring every branch to match, so a small menu database still returns choices.
  return menus
    .map((menu) => ({
      id: menu.id,
      name: menu.name,
      category: menu.category,
      priceFrom: menu.price_from,
      priceTo: menu.price_to,
      weight: menu.weight,
      temperature: menu.temperature,
      spicyLevel: menu.spicy_level,
      mealTime: menu.meal_time,
      company: menu.company,
      mainIngredient: menu.main_ingredient,
      mealFormat: menu.meal_format,
      description: menu.description,
      score: scoreMenu(menu, decision),
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(({ score: _, ...menu }) => menu)
}

function scoreMenu(menu: { category: string; price_from: number; price_to: number; weight: string; temperature: string; spicy_level: string; meal_time: string; company: string; main_ingredient: string; meal_format: string }, decision: Decision) {
  let score = 0
  if (menu.temperature === decision.temperature) score += 3
  if (menu.weight === decision.weight) score += 3
  if (menu.spicy_level === decision.spicyLevel) score += 2
  if (menu.category === decision.category) score += 2
  if (matchesBudget(menu.price_from, menu.price_to, decision.budget)) score += 3
  if (menu.meal_time === decision.mealTime) score += 2
  if (menu.main_ingredient === decision.mainIngredient) score += 2
  if (menu.company === decision.company) score += 1
  if (menu.meal_format === decision.mealFormat) score += 3
  return score
}

function matchesBudget(priceFrom: number, priceTo: number, budget?: string) {
  if (!budget) return false

  const ranges: Record<string, [number, number]> = {
    under_10000: [0, 10000],
    '10000_to_15000': [10000, 15000],
    over_15000: [15000, Number.POSITIVE_INFINITY],
  }
  const range = ranges[budget]
  if (!range) return false

  // A menu matches when its displayed price range overlaps the selected price branch.
  return priceFrom <= range[1] && priceTo >= range[0]
}
