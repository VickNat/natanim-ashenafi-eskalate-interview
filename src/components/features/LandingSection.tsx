"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { useSearchFoodItems } from "@/queries/food"
import { useFoodStore } from "@/store/food-store"

const LandingSection = () => {
  const [activeTab, setActiveTab] = useState("delivery")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeSearchQuery, setActiveSearchQuery] = useState("")
  
  // Get zustand store actions
  const setFoodItems = useFoodStore((state) => state.setFoodItems)
  
  // Search query hook
  const { data: searchResults, isLoading: isSearching, error } = useSearchFoodItems(activeSearchQuery)

  // Update zustand store when search results change
  useEffect(() => {
    if (searchResults) {
      setFoodItems(searchResults)
    }
  }, [searchResults, setFoodItems])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setActiveSearchQuery(searchQuery.trim())
    } else {
      // If empty search, reset to show all items
      setActiveSearchQuery("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <section className="relative h-[500px] bg-gradient-to-br from-[#FFB30E] to-yellow-400 overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="flex flex-row justify-center md:gap-x-32 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8 lg:space-y-12">
            <div className="space-y-4">
              <h1 className="text-2xl md:text-5xl font-bold leading-tight">
                Are you starving?
              </h1>
              <p className="text-lg md:text-xl opacity-90 font-light">
                Within a few clicks, find meals that are accessible near you
              </p>
            </div>

            {/* Search Section */}
            <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-xl">
              {/* Tabs */}
              <div className="flex mb-6">
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === "delivery" ? "bg-orange-100 text-orange-600" : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  Delivery
                </button>
                <button
                  onClick={() => setActiveTab("pickup")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-4 ${
                    activeTab === "pickup" ? "bg-orange-100 text-orange-600" : "text-gray-600 hover:text-orange-600"
                  }`}
                >
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                  Pickup
                </button>
              </div>

              {/* Search Input */}
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="What do you like to eat today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                    disabled={isSearching}
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSearching ? "Searching..." : "Find Meal"}
                </button>
              </div>

              {/* Search Status */}
              {activeSearchQuery && (
                <div className="mt-3 text-sm text-gray-600">
                  {isSearching ? (
                    "Searching for meals..."
                  ) : (
                    `Showing results for "${activeSearchQuery}"`
                  )}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-3 text-sm text-red-600">
                  Error searching for meals. Please try again.
                </div>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative md:-mb-56">
              <div className="w-80 h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full bg-black/10 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
                <Image
                  src="/assets/Meal.svg"
                  alt="Delicious meal with noodles and vegetables"
                  width={350}
                  height={350}
                  className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
                  priority
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-white/30 rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
    </section>
  )
}

export default LandingSection
