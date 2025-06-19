'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import AddMeal from './AddMeal'
import logo from '@/../public/assets/Logo (1).svg'

const Header = () => {
  const [isAddMealOpen, setIsAddMealOpen] = useState(false)

  return (
    <>
      <header className="w-full bg-white px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Image 
              src={logo} 
              alt="FoodWagen Logo" 
              width={40} 
              height={40}
              className="w-[197px] h-[40px]"
            />
          </div>

          {/* Add Meal Button */}
          <Button 
            variant="secondary"
            onClick={() => setIsAddMealOpen(true)}
            className="bg-gradient-to-r from-primary to-[#FF9A0E] text-white font-medium px-6 py-2 rounded-lg shadow-sm transition-colors"
          >
            Add Meal
          </Button>
        </div>
      </header>

      {/* Add Meal Dialog */}
      <AddMeal 
        open={isAddMealOpen} 
        onOpenChange={setIsAddMealOpen} 
      />
    </>
  )
}

export default Header