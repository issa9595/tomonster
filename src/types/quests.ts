export type QuestType = 'feed' | 'hug' | 'comfort' | 'wake' | 'any_action' | 'make_public'

export interface QuestTemplate {
  id: string
  title: string
  description: string
  type: QuestType
  target: number
  reward: number
  emoji: string
}

export interface ActiveQuest {
  templateId: string
  title: string
  description: string
  type: QuestType
  target: number
  progress: number
  reward: number
  emoji: string
  completed: boolean
}

export interface DBDailyQuest {
  _id: string
  ownerId: string
  date: string
  quests: ActiveQuest[]
  createdAt: Date
  updatedAt: Date
}
