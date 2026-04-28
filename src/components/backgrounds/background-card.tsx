'use client'

import type { BackgroundItem } from '@/types/accessories'
import { buyBackground } from '@/actions/backgrounds.actions'
import { toast } from 'react-toastify'
import { useState } from 'react'

interface BackgroundCardProps {
  item: BackgroundItem
  owned: boolean
  onBought?: () => void
}

export default function BackgroundCard ({ item, owned, onBought }: BackgroundCardProps): React.ReactNode {
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    if (owned || loading) return
    setLoading(true)
    const result = await buyBackground(item.id)
    if (result.success) {
      toast.success(`${item.emoji} ${item.name} acheté !`, { position: 'top-center', autoClose: 2000 })
      onBought?.()
    } else {
      toast.error(result.error ?? 'Erreur', { position: 'top-center' })
    }
    setLoading(false)
  }

  return (
    <div className={`relative rounded-2xl border-2 p-4 flex flex-col gap-3 transition-all overflow-hidden bg-white ${owned ? 'border-green-400' : 'border-purple-200 hover:border-purple-400 hover:shadow-md'}`}>
      {owned && (
        <div className='absolute top-2 right-2 text-green-500 text-sm font-bold z-10'>✓</div>
      )}
      <div
        className='w-full h-16 rounded-xl'
        style={{ background: item.cssValue }}
      />
      <div className='flex items-center justify-between'>
        <div>
          <span className='text-lg mr-1'>{item.emoji}</span>
          <span className='font-bold text-sm text-gray-800'>{item.name}</span>
        </div>
        <button
          onClick={handleBuy}
          disabled={owned || loading}
          className={`px-3 py-1.5 rounded-xl text-sm font-bold transition-all ${
            owned
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-purple-500 text-white hover:bg-purple-600 active:scale-95'
          }`}
        >
          {loading ? '...' : owned ? '✓' : `🪙 ${item.price}`}
        </button>
      </div>
    </div>
  )
}
