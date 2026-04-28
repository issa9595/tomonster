'use server'

import { connectMongooseToDatabase } from '@/db'
import Monster from '@/db/models/monster.model'
import Inventory from '@/db/models/inventory.model'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { subtractKoins } from '@/actions/wallet.actions'
import { ACCESSORIES_CATALOG } from '@/config/accessories.config'
import { Types } from 'mongoose'
import type { DBInventory } from '@/types/accessories'

async function getSession () {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) throw new Error('User not authenticated')
  return session
}

export async function getInventory (): Promise<DBInventory | null> {
  try {
    await connectMongooseToDatabase()
    const session = await getSession()
    let inventory = await Inventory.findOne({ ownerId: session.user.id }).exec()
    if (!inventory) {
      inventory = new Inventory({ ownerId: session.user.id, accessories: [], backgrounds: [] })
      await inventory.save()
    }
    return JSON.parse(JSON.stringify(inventory))
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return null
  }
}

export async function buyAccessory (accessoryId: string): Promise<{ success: boolean; error?: string }> {
  try {
    await connectMongooseToDatabase()
    const session = await getSession()

    const item = ACCESSORIES_CATALOG.find(a => a.id === accessoryId)
    if (!item) return { success: false, error: 'Accessoire introuvable' }

    let inventory = await Inventory.findOne({ ownerId: session.user.id }).exec()
    if (!inventory) {
      inventory = new Inventory({ ownerId: session.user.id, accessories: [], backgrounds: [] })
    }

    if ((inventory.accessories as string[]).includes(accessoryId)) {
      return { success: false, error: 'Déjà possédé' }
    }

    await subtractKoins(item.price)
    ;(inventory.accessories as string[]).push(accessoryId)
    inventory.markModified('accessories')
    await inventory.save()

    revalidatePath('/app/wallet')
    return { success: true }
  } catch (error) {
    console.error('Error buying accessory:', error)
    return { success: false, error: "Erreur lors de l'achat" }
  }
}

export async function equipAccessory (
  monsterId: string,
  accessoryId: string | null,
  category: 'hat' | 'glasses' | 'shoes'
): Promise<{ success: boolean; error?: string }> {
  try {
    await connectMongooseToDatabase()
    const session = await getSession()

    if (!Types.ObjectId.isValid(monsterId)) {
      return { success: false, error: 'ID monstre invalide' }
    }

    if (accessoryId !== null) {
      const inventory = await Inventory.findOne({ ownerId: session.user.id }).exec()
      if (!inventory || !(inventory.accessories as string[]).includes(accessoryId)) {
        return { success: false, error: 'Accessoire non possédé' }
      }
    }

    const monster = await Monster.findOne({ ownerId: session.user.id, _id: monsterId }).exec()
    if (!monster) return { success: false, error: 'Monstre introuvable' }

    if (!monster.equippedAccessories) {
      monster.equippedAccessories = { hat: null, glasses: null, shoes: null }
    }
    monster.equippedAccessories[category] = accessoryId
    monster.markModified('equippedAccessories')
    await monster.save()

    revalidatePath(`/app/creatures/${monsterId}`)
    revalidatePath('/app')
    return { success: true }
  } catch (error) {
    console.error('Error equipping accessory:', error)
    return { success: false, error: "Erreur lors de l'équipement" }
  }
}
