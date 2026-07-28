import type { Menu } from '../types/menu'
import { supabase } from '../lib/supabase'

export async function fetchMenus(): Promise<Menu[]> {
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
    company: string | string[]
    main_ingredient: string
    meal_format: string
    description: string
  }>

  return menus.map((menu) => ({
    id: menu.id,
    name: menu.name,
    category: menu.category,
    priceFrom: menu.price_from,
    priceTo: menu.price_to,
    weight: menu.weight,
    temperature: menu.temperature,
    spicyLevel: menu.spicy_level,
    mealTime: menu.meal_time,
    company: normalizeCompanies(menu.company),
    mainIngredient: menu.main_ingredient,
    mealFormat: menu.meal_format,
    description: menu.description,
  }))
}

function normalizeCompanies(company: string | string[]) {
  if (Array.isArray(company)) return company

  // Existing text values remain valid while comma-separated values are supported.
  return company.split(',').map((value) => value.trim()).filter(Boolean)
}
