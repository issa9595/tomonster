'use server'

import { connectMongooseToDatabase } from '@/db'
import DailyQuest from '@/db/models/daily-quest.model'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { pickDailyQuests } from '@/config/quests.config'
import type { DBDailyQuest, QuestType } from '@/types/quests'
import { addKoins } from '@/actions/wallet.actions'
import { revalidatePath } from 'next/cache'

function todayString (): string {
  return new Date().toISOString().slice(0, 10)
}

export async function getTodayQuests (): Promise<DBDailyQuest | null> {
  try {
    await connectMongooseToDatabase()
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return null

    const today = todayString()
    let doc = await DailyQuest.findOne({ ownerId: session.user.id, date: today }).exec()

    if (!doc) {
      const templates = pickDailyQuests(`${session.user.id}-${today}`)
      doc = await DailyQuest.create({
        ownerId: session.user.id,
        date: today,
        quests: templates.map(t => ({
          templateId: t.id,
          title: t.title,
          description: t.description,
          type: t.type,
          target: t.target,
          progress: 0,
          reward: t.reward,
          emoji: t.emoji,
          completed: false,
        })),
      })
    }

    return JSON.parse(JSON.stringify(doc))
  } catch {
    return null
  }
}

export async function progressQuest (userId: string, actionType: QuestType): Promise<void> {
  try {
    await connectMongooseToDatabase()
    const today = todayString()
    const doc = await DailyQuest.findOne({ ownerId: userId, date: today }).exec()
    if (!doc) return

    let changed = false
    for (const quest of doc.quests) {
      if (quest.completed) continue
      const matches =
        quest.type === actionType ||
        quest.type === 'any_action'
      if (!matches) continue

      quest.progress = Math.min(quest.progress + 1, quest.target)
      if (quest.progress >= quest.target && !quest.completed) {
        quest.completed = true
        await addKoins(quest.reward)
      }
      changed = true
    }

    if (changed) {
      doc.markModified('quests')
      await doc.save()
    }
  } catch (error) {
    console.error('Error progressing quest:', error)
  }
}

export async function resetAllDailyQuests (): Promise<{ deleted: number }> {
  await connectMongooseToDatabase()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().slice(0, 10)
  const result = await DailyQuest.deleteMany({ date: { $lte: yesterdayStr } })
  revalidatePath('/app')
  return { deleted: result.deletedCount }
}
