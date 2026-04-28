'use client'

import type { AccessoryItem } from '@/types/accessories'
import RarityBadge from './rarity-badge'
import { buyAccessory } from '@/actions/accessories.actions'
import { toast } from 'react-toastify'
import { useState } from 'react'

interface AccessoryCardProps {
  item: AccessoryItem
  owned: boolean
  onBought?: () => void
}

export default function AccessoryCard ({ item, owned, onBought }: AccessoryCardProps): React.ReactNode {
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    if (owned || loading) return
    setLoading(true)
    const result = await buyAccessory(item.id)
    if (result.success) {
      toast.success(`${item.emoji} ${item.name} acheté !`, { position: 'top-center', autoClose: 2000 })
      onBought?.()
    } else {
      toast.error(result.error ?? 'Erreur', { position: 'top-center' })
    }
    setLoading(false)
  }

  return (
    <div className={`relative bg-white rounded-2xl border-2 p-4 flex flex-col items-center gap-2 transition-all ${owned ? 'border-green-400 bg-green-50' : 'border-purple-200 hover:border-purple-400 hover:shadow-md'}`}>
      {owned && (
        <div className='absolute top-2 right-2 text-green-500 text-xs font-bold'>✓</div>
      )}
      <div className='text-4xl'>{item.emoji}</div>
      <div className='text-center'>
        <p className='font-bold text-sm text-gray-800'>{item.name}</p>
        <div className='mt-1'>
          <RarityBadge rarity={item.rarity} />
        </div>
      </div>
      <button
        onClick={handleBuy}
        disabled={owned || loading}
        className={`mt-1 px-4 py-1.5 rounded-xl text-sm font-bold transition-all ${
          owned
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-purple-500 text-white hover:bg-purple-600 active:scale-95'
        }`}
      >
        {loading ? '...' : owned ? 'Possédé' : `🪙 ${item.price}`}
      </button>
    </div>
  )
}
