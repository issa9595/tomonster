import { getMonsters } from '@/actions/monsters.actions'
import { getTodayQuests } from '@/actions/quests.actions'
import DashboardContent from '@/components/dashboard/dashboard-content'
import QuestsSection from '@/components/quests/quests-section'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

async function AppPage (): Promise<React.ReactNode> {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (session === null || session === undefined) {
    throw new Error('Session should exist at this point')
  }

  const [monsters, dailyQuest] = await Promise.all([
    getMonsters(),
    getTodayQuests(),
  ])

  return (
    <>
      <DashboardContent session={session} monsters={monsters} />
      <QuestsSection dailyQuest={dailyQuest} />
    </>
  )
}

export default AppPage
