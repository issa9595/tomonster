'use client'

import { ACCESSORIES_CATALOG } from '@/config/accessories.config'
import type { AccessoryCategory } from '@/types/accessories'
import AccessoryCard from '@/components/accessories/accessory-card'
import { useMemo, useState } from 'react'

const CATEGORY_LABELS: Record<AccessoryCategory, string> = {
  hat: '🎩 Chapeaux',
  glasses: '😎 Lunettes',
  shoes: '👟 Chaussures',
}

interface AccessoriesShopSectionProps {
  ownedAccessories: string[]
}

export default function AccessoriesShopSection ({ ownedAccessories }: AccessoriesShopSectionProps): React.ReactNode {
  const [activeCategory, setActiveCategory] = useState<AccessoryCategory>('hat')
  const [owned, setOwned] = useState<string[]>(ownedAccessories)

  const filtered = useMemo(
    () => ACCESSORIES_CATALOG.filter(a => a.category === activeCategory),
    [activeCategory]
  )

  return (
    <div className='bg-white rounded-3xl border-2 border-purple-100 p-6'>
      <h2 className='text-2xl font-black text-gray-800 mb-4'>🛍️ Accessoires</h2>

      <div className='flex gap-2 mb-6 overflow-x-auto pb-1'>
        {(Object.keys(CATEGORY_LABELS) as AccessoryCategory[]).map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-purple-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
        {filtered.map(item => (
          <AccessoryCard
            key={item.id}
            item={item}
            owned={owned.includes(item.id)}
            onBought={() => setOwned(prev => [...prev, item.id])}
          />
        ))}
      </div>
    </div>
  )
}
