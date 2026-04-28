import { NextResponse } from 'next/server'
import { resetAllDailyQuests } from '@/actions/quests.actions'

export async function GET (request: Request): Promise<NextResponse> {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const result = await resetAllDailyQuests()
  return NextResponse.json({ success: true, ...result })
}
