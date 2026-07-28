export type Menu = {
  id: string
  name: string
  category: string
  priceFrom: number
  priceTo: number
  weight: string
  temperature: string
  spicyLevel: string
  mealTime: string
  company: string
  mainIngredient: string
  mealFormat: string
  description: string
}

export type Decision = {
  temperature?: string
  weight?: string
  spicyLevel?: string
  budget?: string
  category?: string
  mealTime?: string
  company?: string
  mainIngredient?: string
  mealFormat?: string
}
