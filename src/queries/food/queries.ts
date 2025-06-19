import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/query-client'
import { FoodResponse, FoodItem } from './types'

// Query keys for consistent cache management
export const foodQueryKeys = {
  all: ['food'] as const,
  lists: () => [...foodQueryKeys.all, 'list'] as const,
  list: (filters?: Record<string, any>) => [...foodQueryKeys.lists(), filters] as const,
  search: (searchTerm?: string) => [...foodQueryKeys.all, 'search', searchTerm] as const,
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

// Search food items by name (main filtering functionality)
export const useSearchFoodItems = (searchTerm?: string) => {
  return useQuery({
    queryKey: foodQueryKeys.search(searchTerm),
    queryFn: () => {
      const endpoint = searchTerm && searchTerm.trim() 
        ? `/Food?name=${encodeURIComponent(searchTerm.trim())}`
        : '/Food'
      return apiClient<FoodResponse>(endpoint)
    },
    staleTime: 2 * 60 * 1000, // 2 minutes (shorter for search results)
  })
}

// Get food items with custom filters
export const useGetFoodItemsWithFilters = (filters?: Record<string, any>) => {
  return useQuery({
    queryKey: foodQueryKeys.list(filters),
    queryFn: () => {
      const searchParams = new URLSearchParams()
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value))
          }
        })
      }
      const queryString = searchParams.toString()
      const endpoint = queryString ? `/Food?${queryString}` : '/Food'
      return apiClient<FoodResponse>(endpoint)
    },
    staleTime: 2 * 60 * 1000, // 2 minutes for filtered results
  })
}

// Advanced search with multiple parameters
export const useAdvancedFoodSearch = (searchParams: {
  name?: string
  rating?: string
  open?: boolean
  minPrice?: number
  maxPrice?: number
}) => {
  return useQuery({
    queryKey: foodQueryKeys.list(searchParams),
    queryFn: () => {
      const params = new URLSearchParams()
      
      // Add name filter if provided
      if (searchParams.name && searchParams.name.trim()) {
        params.append('name', searchParams.name.trim())
      }
      
      // Add other filters
      if (searchParams.rating) params.append('rating', searchParams.rating)
      if (searchParams.open !== undefined) params.append('open', String(searchParams.open))
      if (searchParams.minPrice) params.append('minPrice', String(searchParams.minPrice))
      if (searchParams.maxPrice) params.append('maxPrice', String(searchParams.maxPrice))
      
      const queryString = params.toString()
      const endpoint = queryString ? `/Food?${queryString}` : '/Food'
      return apiClient<FoodResponse>(endpoint)
    },
    enabled: Object.values(searchParams).some(val => val !== undefined && val !== null && val !== ''),
    staleTime: 2 * 60 * 1000,
  })
}
