'use client'

import { BACKGROUNDS_CATALOG } from '@/config/backgrounds.config'
import { equipBackground } from '@/actions/backgrounds.actions'
import { toast } from 'react-toastify'
import { useCallback, useState } from 'react'

interface BackgroundSelectorProps {
  monsterId: string
  ownedBackgrounds: string[]
  equippedId: string | null
}

export default function BackgroundSelector ({
  monsterId,
  ownedBackgrounds,
  equippedId: initialEquippedId,
}: BackgroundSelectorProps): React.ReactNode {
  const [loading, setLoading] = useState(false)
  const [equipped, setEquipped] = useState<string | null>(initialEquippedId)

  const ownedItems = BACKGROUNDS_CATALOG.filter(b => ownedBackgrounds.includes(b.id))

  const handleEquip = useCallback(async (backgroundId: string | null) => {
    if (loading) return
    setLoading(true)
    const result = await equipBackground(monsterId, backgroundId)
    if (result.success) {
      setEquipped(backgroundId)
      toast.success(backgroundId ? 'Arrière-plan appliqué !' : 'Arrière-plan retiré !', {
        position: 'top-center',
        autoClose: 1500,
      })
    } else {
      toast.error(result.error ?? 'Erreur', { position: 'top-center' })
    }
    setLoading(false)
  }, [loading, monsterId])

  return (
    <div className='bg-gray-50 rounded-2xl p-4'>
      <h4 className='font-bold text-gray-700 mb-3'>🖼️ Arrière-plan</h4>
      {ownedItems.length === 0 ? (
        <p className='text-sm text-gray-400'>Aucun arrière-plan possédé — visitez la boutique !</p>
      ) : (
        <div className='flex flex-wrap gap-2'>
          <button
            onClick={() => { void handleEquip(null) }}
            className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${
              equipped === null ? 'bg-gray-300 text-gray-700' : 'bg-white border border-gray-200 hover:bg-gray-100'
            }`}
          >
            Par défaut
          </button>
          {ownedItems.map(item => (
            <button
              key={item.id}
              onClick={() => { void handleEquip(item.id) }}
              disabled={loading}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${
                equipped === item.id ? 'bg-purple-500 text-white' : 'bg-white border border-purple-200 hover:border-purple-400'
              }`}
            >
              <span
                className='w-4 h-4 rounded-full inline-block flex-shrink-0'
                style={{ background: item.cssValue }}
              />
              {item.emoji} {item.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
