import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/query-client'
import { FoodResponse, FoodItem } from './types'

// Query keys for consistent cache management
export const foodQueryKeys = {
  all: ['food'] as const,
  lists: () => [...foodQueryKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...foodQueryKeys.lists(), filters] as const,
  details: () => [...foodQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...foodQueryKeys.details(), id] as const,
}

// Get all food items
export const useGetFoodItems = () => {
  return useQuery({
    queryKey: foodQueryKeys.lists(),
    queryFn: () => apiClient<FoodResponse>('/Food'),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Get single food item by ID
export const useGetFoodItem = (id: string) => {
  return useQuery({
    queryKey: foodQueryKeys.detail(id),
    queryFn: () => apiClient<FoodItem>(`/Food/${id}`),
    enabled: !!id, // Only run if ID is provided
  })
}

// Get food items with filters (for future use)
export const useGetFoodItemsWithFilters = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: foodQueryKeys.list(filters),
    queryFn: () => {
      const searchParams = new URLSearchParams()
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value))
          }
        })
      }
      const queryString = searchParams.toString()
      const endpoint = queryString ? `/Food?${queryString}` : '/Food'
      return apiClient<FoodResponse>(endpoint)
    },
  })
}
