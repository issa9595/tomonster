import type { DBMonster } from '@/types/monster'
import { ACCESSORIES_CATALOG } from '@/config/accessories.config'
import { BACKGROUNDS_CATALOG } from '@/config/backgrounds.config'

const STATE_EMOJIS: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  angry: '😠',
  hungry: '😋',
  sleepy: '😴',
}

interface GalleryCardProps {
  monster: DBMonster
}

export default function GalleryCard ({ monster }: GalleryCardProps): React.ReactNode {
  const bg = monster.equippedBackground
    ? BACKGROUNDS_CATALOG.find(b => b.id === monster.equippedBackground)
    : null

  const hat = monster.equippedAccessories?.hat
    ? ACCESSORIES_CATALOG.find(a => a.id === monster.equippedAccessories?.hat)
    : null
  const glasses = monster.equippedAccessories?.glasses
    ? ACCESSORIES_CATALOG.find(a => a.id === monster.equippedAccessories?.glasses)
    : null
  const shoes = monster.equippedAccessories?.shoes
    ? ACCESSORIES_CATALOG.find(a => a.id === monster.equippedAccessories?.shoes)
    : null

  return (
    <div className='bg-white rounded-3xl border-2 border-purple-100 overflow-hidden hover:shadow-lg hover:border-purple-300 transition-all'>
      <div
        className='h-32 flex items-center justify-center relative'
        style={{ background: bg ? bg.cssValue : 'linear-gradient(135deg, #f3e8ff, #fce7f3)' }}
      >
        <div className='absolute top-2 left-2 flex gap-1 text-xl'>
          {hat && <span title={hat.name}>{hat.emoji}</span>}
          {glasses && <span title={glasses.name}>{glasses.emoji}</span>}
        </div>
        {shoes && (
          <div className='absolute bottom-2 left-2 text-xl'>
            <span title={shoes.name}>{shoes.emoji}</span>
          </div>
        )}
        <div className='text-5xl'>{STATE_EMOJIS[monster.state] ?? '👾'}</div>
      </div>

      <div className='p-4'>
        <h3 className='font-black text-gray-800 text-lg truncate'>{monster.name}</h3>
        <div className='flex items-center justify-between mt-1'>
          <span className='text-sm text-purple-600 font-bold'>Niv. {monster.level}</span>
          <span className='text-sm text-gray-500'>{STATE_EMOJIS[monster.state]} {monster.state}</span>
        </div>
      </div>
    </div>
  )
}
