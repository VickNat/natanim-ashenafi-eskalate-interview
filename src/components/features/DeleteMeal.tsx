'use client'

import React from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useDeleteFoodItem, FoodItem } from '@/queries/food'

interface DeleteMealProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  meal: FoodItem | null
}

const DeleteMeal: React.FC<DeleteMealProps> = ({ open, onOpenChange, meal }) => {
  const deleteMutation = useDeleteFoodItem()

  const handleDelete = async () => {
    if (!meal) return

    try {
      await deleteMutation.mutateAsync(meal.id)
      
      toast.success('Meal deleted successfully!', {
        description: `${meal.name} has been removed from the menu.`,
      })
      
      onOpenChange(false)
    } catch (error) {
      toast.error('Failed to delete meal', {
        description: 'There was an error deleting the meal. Please try again.',
      })
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  if (!meal) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold text-primary">
            Delete Meal
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-center text-gray-600 mb-6">
            Are you sure you want to delete this meal? Actions cannot be reversed.
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="flex-1 bg-gradient-to-r from-primary to-[#FF9A0E] hover:from-primary/90 hover:to-[#FF9A0E]/90 text-white font-medium"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Yes'}
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={deleteMutation.isPending}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteMeal