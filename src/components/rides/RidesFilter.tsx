'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import mockData from '@/data/mock-data.json'

/**
 * RidesFilter Component
 * Filter sidebar for rides page
 */

export default function RidesFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number[]>([0, 500])

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="sticky top-32 space-y-6">
      {/* Categories */}
      <div className="bg-white dark:bg-savanna-brown-light p-6 rounded-2xl shadow-float">
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {mockData.categories.map(category => (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategories.includes(category.id)
                  ? 'bg-savanna-sunset text-white'
                  : 'bg-savanna-sand/50 dark:bg-savanna-brown hover:bg-savanna-gold/20'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white dark:bg-savanna-brown-light p-6 rounded-2xl shadow-float">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            min={0}
            max={500}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Difficulty */}
      <div className="bg-white dark:bg-savanna-brown-light p-6 rounded-2xl shadow-float">
        <h3 className="font-semibold mb-4">Difficulty</h3>
        <div className="space-y-2">
          {['easy', 'moderate', 'challenging'].map(difficulty => (
            <label key={difficulty} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-sm capitalize">{difficulty}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}