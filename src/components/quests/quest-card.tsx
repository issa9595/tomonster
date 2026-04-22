import type { ActiveQuest } from '@/types/quests'

interface QuestCardProps {
  quest: ActiveQuest
}

export default function QuestCard ({ quest }: QuestCardProps): React.ReactNode {
  const progressPct = Math.min((quest.progress / quest.target) * 100, 100)

  return (
    <div className={`bg-white rounded-2xl border-2 p-4 transition-all ${quest.completed ? 'border-green-300 bg-green-50' : 'border-purple-100'}`}>
      <div className='flex items-start justify-between gap-2'>
        <div className='flex items-center gap-2 flex-1 min-w-0'>
          <span className='text-2xl flex-shrink-0'>{quest.emoji}</span>
          <div className='min-w-0'>
            <p className='font-black text-gray-800 text-sm truncate'>{quest.title}</p>
            <p className='text-xs text-gray-500 mt-0.5'>{quest.description}</p>
          </div>
        </div>
        <div className='flex-shrink-0 flex items-center gap-1 text-yellow-600 font-black text-sm'>
          <span>🪙</span>
          <span>{quest.reward}</span>
        </div>
      </div>

      <div className='mt-3'>
        <div className='flex justify-between text-xs text-gray-500 mb-1'>
          <span>{quest.completed ? '✓ Complétée !' : 'Progression'}</span>
          <span>{quest.progress}/{quest.target}</span>
        </div>
        <div className='h-2 bg-gray-100 rounded-full overflow-hidden'>
          <div
            className={`h-full rounded-full transition-all duration-500 ${quest.completed ? 'bg-green-400' : 'bg-gradient-to-r from-purple-400 to-pink-500'}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  )
}
