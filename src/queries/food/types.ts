export interface FoodItem {
  id: string
  createdAt: string
  name: string
  avatar: string
  rating: string
  open: boolean
  logo: string
  Price: string
  // Additional optional fields that might be present
  food_name?: string
  food_rating?: number
  food_image?: string
  restaurant_name?: string
  restaurant_logo?: string
  restaurant_status?: string
}

export type FoodResponse = FoodItem[]

// For mutations and other operations
export interface CreateFoodData {
  name: string
  avatar: string
  rating: string
  Price: string
  open?: boolean
  logo?: string
}

export interface UpdateFoodData extends Partial<CreateFoodData> {
  id: string
}
