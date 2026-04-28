import type { QuestTemplate } from '@/types/quests'

export const QUEST_TEMPLATES: QuestTemplate[] = [
  { id: 'feed_5', title: 'Festin du jour', description: "Nourris ton monstre 5 fois aujourd'hui", type: 'feed', target: 5, reward: 20, emoji: '🍖' },
  { id: 'feed_3', title: 'Bon appétit', description: "Nourris ton monstre 3 fois aujourd'hui", type: 'feed', target: 3, reward: 12, emoji: '🍗' },
  { id: 'hug_3', title: 'Câlinothérapie', description: "Câline ton monstre 3 fois aujourd'hui", type: 'hug', target: 3, reward: 15, emoji: '🤗' },
  { id: 'comfort_3', title: 'Grand consolateur', description: "Réconforte ton monstre 3 fois aujourd'hui", type: 'comfort', target: 3, reward: 15, emoji: '🫂' },
  { id: 'wake_3', title: 'Réveille-matin', description: "Réveille ton monstre 3 fois aujourd'hui", type: 'wake', target: 3, reward: 15, emoji: '⏰' },
  { id: 'any_action_10', title: 'Maître du jeu', description: 'Effectue 10 actions sur tes monstres', type: 'any_action', target: 10, reward: 30, emoji: '🎮' },
  { id: 'any_action_5', title: 'Bon compagnon', description: 'Effectue 5 actions sur tes monstres', type: 'any_action', target: 5, reward: 15, emoji: '⭐' },
  { id: 'make_public', title: 'Montre ta créature', description: 'Rends un monstre public dans la galerie', type: 'make_public', target: 1, reward: 15, emoji: '📸' },
]

export const DAILY_QUEST_COUNT = 3

export function pickDailyQuests (seed: string): QuestTemplate[] {
  const hash = seed.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const shuffled = [...QUEST_TEMPLATES].sort((a, b) => {
    const ha = (hash * a.id.length) % QUEST_TEMPLATES.length
    const hb = (hash * b.id.length) % QUEST_TEMPLATES.length
    return ha - hb
  })
  return shuffled.slice(0, DAILY_QUEST_COUNT)
}
