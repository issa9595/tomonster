'use client'

import { BACKGROUNDS_CATALOG } from '@/config/backgrounds.config'
import BackgroundCard from '@/components/backgrounds/background-card'
import { useState } from 'react'

interface BackgroundsShopSectionProps {
  ownedBackgrounds: string[]
}

export default function BackgroundsShopSection ({ ownedBackgrounds }: BackgroundsShopSectionProps): React.ReactNode {
  const [owned, setOwned] = useState<string[]>(ownedBackgrounds)

  return (
    <div className='bg-white rounded-3xl border-2 border-purple-100 p-6'>
      <h2 className='text-2xl font-black text-gray-800 mb-4'>🖼️ Arrière-plans</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {BACKGROUNDS_CATALOG.map(item => (
          <BackgroundCard
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
