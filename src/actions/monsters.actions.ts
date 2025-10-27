'use server'

import { connectMongooseToDatabase } from '@/db'
import Monster from '@/db/models/monster.model'
import { auth } from '@/lib/auth'
import type { CreateMonsterFormValues } from '@/types/forms/create-monster-form'
import type { DBMonster } from '@/types/monster'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { Types } from 'mongoose'

/**
 * Crée un nouveau monstre dans la base de données
 *
 * Actions effectuées :
 * - Vérifie l'authentification de l'utilisateur
 * - Connecte à la base de données MongoDB
 * - Crée et enregistre le monstre avec l'ID du propriétaire
 * - Revalide le cache de la page dashboard
 *
 * @param monsterData - Données du monstre à créer (nom, traits, état, niveau)
 * @throws {Error} Si l'utilisateur n'est pas authentifié
 *
 * @example
 * await createMonster({
 *   name: 'Pikachu',
 *   traits: '{"bodyColor": "#FFB5E8", ...}',
 *   state: 'happy',
 *   level: 1
 * })
 */
export async function createMonster (monsterData: CreateMonsterFormValues): Promise<void> {
  await connectMongooseToDatabase()

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session === null || session === undefined) throw new Error('User not authenticated')

  const monster = new Monster({
    ownerId: session.user.id,
    name: monsterData.name,
    traits: monsterData.traits,
    state: monsterData.state,
    level: monsterData.level
  })

  await monster.save()
  revalidatePath('/dashboard')
}

/**
 * Récupère tous les monstres appartenant à l'utilisateur connecté
 *
 * Actions effectuées :
 * - Vérifie l'authentification de l'utilisateur
 * - Connecte à la base de données MongoDB
 * - Recherche tous les monstres avec l'ID du propriétaire
 * - Retourne un tableau vide en cas d'erreur
 *
 * @returns Liste des monstres de l'utilisateur ou tableau vide en cas d'erreur
 *
 * @example
 * const monsters = await getMonsters()
 * console.log(`Vous avez ${monsters.length} monstres`)
 */
export async function getMonsters (): Promise<DBMonster[]> {
  try {
    await connectMongooseToDatabase()

    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (session === null || session === undefined) throw new Error('User not authenticated')

    const { user } = session

    const monsters = await Monster.find({ ownerId: user.id }).exec()
    return JSON.parse(JSON.stringify(monsters))
  } catch (error) {
    console.error('Error fetching monsters:', error)
    return []
  }
}

/**
 * Récupère un monstre spécifique par son ID
 *
 * Actions effectuées :
 * - Vérifie l'authentification de l'utilisateur
 * - Valide le format de l'ID MongoDB
 * - Recherche le monstre appartenant à l'utilisateur avec cet ID
 * - Retourne null si le monstre n'existe pas ou en cas d'erreur
 *
 * Sécurité :
 * - Vérifie que le monstre appartient bien à l'utilisateur connecté
 *
 * @param id - Identifiant MongoDB du monstre (premier élément du tableau de route)
 * @returns Monstre trouvé ou null si inexistant/erreur
 *
 * @example
 * const monster = await getMonsterById('507f1f77bcf86cd799439011')
 * if (monster) {
 *   console.log(`Monstre trouvé: ${monster.name}`)
 * }
 */
export async function getMonsterById (id: string): Promise<DBMonster | null> {
  try {
    await connectMongooseToDatabase()

    const session = await auth.api.getSession({
      headers: await headers()
    })
    if (session === null || session === undefined) throw new Error('User not authenticated')

    const { user } = session

    const _id = id[0]

    if (!Types.ObjectId.isValid(_id)) {
      console.error(`Invalid monster ID format: "${_id}". Expected a valid MongoDB ObjectId.`)
      return null
    }

    const monster = await Monster.findOne({ ownerId: user.id, _id }).exec()
    return JSON.parse(JSON.stringify(monster))
  } catch (error) {
    console.error('Error fetching monster by ID:', error)
    return null
  }
}
