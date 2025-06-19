import { FoodItem } from '@/queries/food'
import { create } from 'zustand'

interface FoodStore {
  foodItems: FoodItem[]
  setFoodItems: (foodItems: FoodItem[]) => void
}

export const useFoodStore = create<FoodStore>((set) => ({
  foodItems: [],
  setFoodItems: (foodItems) => set({ foodItems }),
}))