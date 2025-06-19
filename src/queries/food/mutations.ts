import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/lib/query-client'
import { CreateFoodData, UpdateFoodData, FoodItem } from './types'
import { foodQueryKeys } from './queries'

// Create a new food item
export const useCreateFoodItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateFoodData) =>
      apiClient<FoodItem>('/Food', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      // Invalidate and refetch food queries
      queryClient.invalidateQueries({ queryKey: foodQueryKeys.all })
    },
  })
}

// Update a food item
export const useUpdateFoodItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateFoodData) =>
      apiClient<FoodItem>(`/Food/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (data) => {
      // Update the specific item in cache
      queryClient.setQueryData(foodQueryKeys.detail(data.id), data)
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: foodQueryKeys.lists() })
    },
  })
}

// Delete a food item
export const useDeleteFoodItem = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      apiClient<{ id: string }>(`/Food/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ queryKey: foodQueryKeys.detail(deletedId) })
      // Invalidate list queries
      queryClient.invalidateQueries({ queryKey: foodQueryKeys.lists() })
    },
  })
}
