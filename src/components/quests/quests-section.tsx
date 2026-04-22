import type { DBDailyQuest } from '@/types/quests'
import QuestCard from './quest-card'

interface QuestsSectionProps {
  dailyQuest: DBDailyQuest | null
}

export default function QuestsSection ({ dailyQuest }: QuestsSectionProps): React.ReactNode {
  if (!dailyQuest) return null

  const completedCount = dailyQuest.quests.filter(q => q.completed).length
  const totalReward = dailyQuest.quests.reduce((acc, q) => acc + (q.completed ? q.reward : 0), 0)

  return (
    <div className='max-w-4xl mx-auto px-4 py-6'>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <h2 className='text-2xl font-black text-gray-800'>🎯 Quêtes du jour</h2>
          <p className='text-sm text-gray-500 mt-0.5'>
            {completedCount}/{dailyQuest.quests.length} complétées
            {totalReward > 0 && <span className='ml-2 text-yellow-600 font-bold'>• +{totalReward} 🪙 gagnés</span>}
          </p>
        </div>
        {completedCount === dailyQuest.quests.length && (
          <div className='bg-green-100 text-green-700 font-black text-sm px-3 py-1.5 rounded-xl'>
            🏆 Tout complété !
          </div>
        )}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
        {dailyQuest.quests.map((quest, i) => (
          <QuestCard key={quest.templateId ?? i} quest={quest} />
        ))}
      </div>
    </div>
  )
}
