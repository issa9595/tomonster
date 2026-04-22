'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { MONSTER_STATES } from '@/types/monster'

export default function GalleryFilters (): React.ReactNode {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value !== null) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    router.push(`/app/gallery?${params.toString()}`)
  }

  const activeState = searchParams.get('state')

  return (
    <div className='flex flex-wrap gap-2 mb-6'>
      <span className='text-sm font-bold text-gray-600 self-center'>État :</span>
      <button
        onClick={() => setFilter('state', null)}
        className={`px-3 py-1 rounded-xl text-sm font-bold transition-all ${!activeState ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
      >
        Tous
      </button>
      {MONSTER_STATES.map(state => (
        <button
          key={state}
          onClick={() => setFilter('state', state)}
          className={`px-3 py-1 rounded-xl text-sm font-bold transition-all ${activeState === state ? 'bg-purple-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
        >
          {state}
        </button>
      ))}
    </div>
  )
}
