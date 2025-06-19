'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCreateFoodItem } from '@/queries/food'

const addMealSchema = z.object({
  name: z.string().min(1, 'Field name is required'),
  rating: z.string().min(1, 'Food rating is required'),
  avatar: z.string().url('Please enter a valid image URL'),
  restaurantName: z.string().min(1, 'Restaurant name is required'),
  logo: z.string().url('Please enter a valid logo URL'),
  status: z.enum(['open', 'closed'], {
    required_error: 'Please select restaurant status',
  }),
})

type AddMealFormData = z.infer<typeof addMealSchema>

interface AddMealProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const AddMeal: React.FC<AddMealProps> = ({ open, onOpenChange }) => {
  const createMutation = useCreateFoodItem()

  const form = useForm<AddMealFormData>({
    resolver: zodResolver(addMealSchema),
    defaultValues: {
      name: '',
      rating: '',
      avatar: '',
      restaurantName: '',
      logo: '',
      status: undefined,
    },
  })

  const onSubmit = async (data: AddMealFormData) => {
    try {
      const createData = {
        createdAt: new Date().toISOString(),
        name: data.name,
        avatar: data.avatar,
        rating: data.rating,
        open: data.status === 'open',
        logo: data.logo,
      }

      await createMutation.mutateAsync(createData)
      
      toast.success('Meal added successfully!', {
        description: `${data.name} has been added to the menu.`,
      })
      
      form.reset()
      onOpenChange(false)
    } catch (error) {
      console.log(error)
      toast.error('Failed to add meal', {
        description: 'There was an error adding the meal. Please try again.',
      })
    }
  }

  const handleCancel = () => {
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Add a meal
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Food name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Food name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter food name"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Food rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Food rating</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter rating (1-5)"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Food image URL */}
            <FormField
              control={form.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Food image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter image URL"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Restaurant name */}
            <FormField
              control={form.control}
              name="restaurantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Restaurant name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter restaurant name"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Restaurant logo URL */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Restaurant logo URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter logo URL"
                      {...field}
                      className="h-10"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Restaurant status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-600">Restaurant status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 text-xs" />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="flex-1 bg-gradient-to-r from-primary to-[#FF9A0E] hover:from-primary/90 hover:to-[#FF9A0E]/90 text-white font-medium"
              >
                {createMutation.isPending ? 'Adding...' : 'Add'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={createMutation.isPending}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddMeal 