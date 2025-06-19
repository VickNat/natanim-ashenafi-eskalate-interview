'use client'

import { useFoodStore } from '@/store/food-store'
import MealCard from './MealCard'
import React from 'react'
import { Button } from '../ui/button'
import { MoveRightIcon } from 'lucide-react'

const FeaturedMeals = () => {
  const foodItems = useFoodStore((state) => state.foodItems)
  
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Featured Meals
          </h2>
          <p className="text-gray-600 text-lg">
            Let&apos;s see the trending meals
          </p>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foodItems.map((food) => (
            <MealCard key={food.id} food={food} />
          ))}
        </div>
        <div className='my-8 flex justify-center mt-10'>
          <Button className='bg-gradient-to-r from-primary to-[#FF9A0E] hover:from-primary/90 hover:to-[#FF9A0E]/90 text-white font-medium'>
            Load More Meals <MoveRightIcon className='w-4 h-4' />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedMeals