'use server'

import { connectMongooseToDatabase } from '@/db'
import Monster from '@/db/models/monster.model'
import Inventory from '@/db/models/inventory.model'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { subtractKoins } from '@/actions/wallet.actions'
import { BACKGROUNDS_CATALOG } from '@/config/backgrounds.config'
import { Types } from 'mongoose'

async function getSession () {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error('User not authenticated')
  return session
}

export async function buyBackground (backgroundId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await connectMongooseToDatabase()
    const session = await getSession()

    const item = BACKGROUNDS_CATALOG.find(b => b.id === backgroundId)
    if (!item) return { success: false, error: 'Arrière-plan introuvable' }

    let inventory = await Inventory.findOne({ ownerId: session.user.id }).exec()
    if (!inventory) {
      inventory = new Inventory({ ownerId: session.user.id, accessories: [], backgrounds: [] })
    }

    if ((inventory.backgrounds as string[]).includes(backgroundId)) {
      return { success: false, error: 'Déjà possédé' }
    }

    await subtractKoins(item.price)
    ;(inventory.backgrounds as string[]).push(backgroundId)
    inventory.markModified('backgrounds')
    await inventory.save()

    revalidatePath('/app/wallet')
    return { success: true }
  } catch (error) {
    console.error('Error buying background:', error)
    return { success: false, error: "Erreur lors de l'achat" }
  }
}

export async function equipBackground (
  monsterId: string,
  backgroundId: string | null
): Promise<{ success: boolean; error?: string }> {
  try {
    await connectMongooseToDatabase()
    const session = await getSession()

    if (!Types.ObjectId.isValid(monsterId)) {
      return { success: false, error: 'ID monstre invalide' }
    }

    if (backgroundId !== null) {
      const inventory = await Inventory.findOne({ ownerId: session.user.id }).exec()
      if (!inventory || !(inventory.backgrounds as string[]).includes(backgroundId)) {
        return { success: false, error: 'Arrière-plan non possédé' }
      }
    }

    const monster = await Monster.findOne({ ownerId: session.user.id, _id: monsterId }).exec()
    if (!monster) return { success: false, error: 'Monstre introuvable' }

    monster.equippedBackground = backgroundId
    monster.markModified('equippedBackground')
    await monster.save()

    revalidatePath(`/app/creatures/${monsterId}`)
    revalidatePath('/app')
    return { success: true }
  } catch (error) {
    console.error('Error equipping background:', error)
    return { success: false, error: "Erreur lors de l'application" }
  }
}
