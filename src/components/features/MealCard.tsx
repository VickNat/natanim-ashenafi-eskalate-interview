import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MoreVertical, Star, Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { FoodItem } from '@/queries/food'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import EditMeal from './EditMeal'
import DeleteMeal from './DeleteMeal'

interface MealCardProps {
  food: FoodItem
}

const MealCard: React.FC<MealCardProps> = ({ food }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleEdit = () => {
    setIsPopoverOpen(false)
    setIsEditDialogOpen(true)
  }

  const handleDelete = () => {
    setIsPopoverOpen(false)
    setIsDeleteDialogOpen(true)
  }

  return (
    <>
      <Card className="bg-white rounded-2xl border-none shadow-none hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer">
        <div className="relative">
          {/* Food Image */}
          <div className="relative h-48 overflow-hidden rounded-t-2xl">
            <Image
              src={food.avatar}
              alt={food.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {/* Price Tag */}
            <div className="absolute top-3 left-3">
              <Badge className="bg-gradient-to-r from-primary to-[#FF9A0E] text-white px-3 py-1 rounded-full font-semibold text-sm">
                ${food.Price}
              </Badge>
            </div>
          </div>

          {/* Card Content */}
          <CardContent className="p-4">
            {/* Restaurant Info Row */}
            <div className="flex items-center gap-2 mb-3">
              {/* Restaurant Logo */}
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={food.logo}
                  alt="Restaurant logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Food Name */}
              <h3 className="font-semibold text-gray-900 text-sm flex-1 truncate">
                {food.name}
              </h3>
              
              {/* More Options */}
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2 h-8 w-8 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="end">
                  <div className="flex flex-col space-y-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEdit}
                      className="justify-start h-8 px-2 text-sm font-normal"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDelete}
                      className="justify-start h-8 px-2 text-sm font-normal text-red-600 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Rating and Status Row */}
            <div className="flex items-center justify-between">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">
                  {food.rating}
                </span>
              </div>

              {/* Status */}
              <Badge 
                variant={food.open ? "default" : "secondary"}
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  food.open 
                    ? "bg-green-100 text-green-700 hover:bg-green-100" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {food.open ? "Open" : "Closed"}
              </Badge>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* Edit Meal Dialog */}
      <EditMeal 
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        meal={food}
      />

      {/* Delete Meal Dialog */}
      <DeleteMeal 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        meal={food}
      />
    </>
  )
}

export default MealCard