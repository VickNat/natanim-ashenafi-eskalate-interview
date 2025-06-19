'use client'

import FeaturedMeals from "@/components/features/FeaturedMeals";
import LandingSection from "@/components/features/LandingSection";
import { useGetFoodItems } from "@/queries/food";
import { useFoodStore } from "@/store/food-store";
import { useEffect } from "react";

export default function Home() {
  const { data: foodItemsData, isLoading, error, isError } = useGetFoodItems()
  const setFoodItems = useFoodStore((state) => state.setFoodItems)

  useEffect(() => {
    if (foodItemsData) {
      setFoodItems(foodItemsData)
    }
  }, [foodItemsData])

  return (
    <div className="min-h-screen">
      <LandingSection />
      <FeaturedMeals />
    </div>
  );
}
