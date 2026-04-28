'use client'

import { ACCESSORIES_CATALOG } from '@/config/accessories.config'
import { equipAccessory } from '@/actions/accessories.actions'
import type { AccessoryCategory } from '@/types/accessories'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'react'

interface AccessorySelectorProps {
  monsterId: string
  category: AccessoryCategory
  ownedAccessories: string[]
  equippedId: string | null
}

const CATEGORY_LABELS: Record<AccessoryCategory, string> = {
  hat: '🎩 Chapeau',
  glasses: '😎 Lunettes',
  shoes: '👟 Chaussures',
}

export default function AccessorySelector ({
  monsterId,
  category,
  ownedAccessories,
  equippedId: initialEquippedId,
}: AccessorySelectorProps): React.ReactNode {
  const [loading, setLoading] = useState(false)
  const [equipped, setEquipped] = useState<string | null>(initialEquippedId)

  const ownedInCategory = ACCESSORIES_CATALOG.filter(
    a => a.category === category && ownedAccessories.includes(a.id)
  )

  const handleEquip = useCallback(async (accessoryId: string | null) => {
    if (loading) return
    setLoading(true)
    const result = await equipAccessory(monsterId, accessoryId, category)
    if (result.success) {
      setEquipped(accessoryId)
      toast.success(accessoryId ? 'Accessoire équipé !' : 'Accessoire retiré !', {
        position: 'top-center',
        autoClose: 1500,
      })
    } else {
      toast.error(result.error ?? 'Erreur', { position: 'top-center' })
    }
    setLoading(false)
  }, [loading, monsterId, category])

  return (
    <div className='bg-gray-50 rounded-2xl p-4'>
      <h4 className='font-bold text-gray-700 mb-3'>{CATEGORY_LABELS[category]}</h4>
      {ownedInCategory.length === 0 ? (
        <p className='text-sm text-gray-400'>Aucun accessoire possédé — visitez la boutique !</p>
      ) : (
        <div className='flex flex-wrap gap-2'>
          <button
            onClick={() => { void handleEquip(null) }}
            className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${
              equipped === null ? 'bg-gray-300 text-gray-700' : 'bg-white border border-gray-200 hover:bg-gray-100'
            }`}
          >
            Aucun
          </button>
          {ownedInCategory.map(item => (
            <button
              key={item.id}
              onClick={() => { void handleEquip(item.id) }}
              disabled={loading}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${
                equipped === item.id
                  ? 'bg-purple-500 text-white'
                  : 'bg-white border border-purple-200 hover:border-purple-400'
              }`}
            >
              {item.emoji} {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
