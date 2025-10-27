import type { DBMonster } from '@/types/monster'
import type { DashboardMonster } from '@/components/monsters/monsters-list'

/**
 * Transforme un monstre de type DBMonster en DashboardMonster
 *
 * Cette fonction convertit les dates en chaînes ISO et normalise la structure
 * pour l'affichage dans le dashboard.
 *
 * @param dbMonster - Monstre au format base de données
 * @returns Monstre au format dashboard
 *
 * @example
 * const dashboardMonster = transformDBMonsterToDashboardMonster(dbMonster)
 */
export function transformDBMonsterToDashboardMonster (dbMonster: DBMonster): DashboardMonster {
  return {
    _id: dbMonster._id,
    name: dbMonster.name,
    traits: dbMonster.traits,
    level: dbMonster.level,
    state: dbMonster.state,
    ownerId: dbMonster.ownerId,
    createdAt: typeof dbMonster.createdAt === 'string'
      ? dbMonster.createdAt
      : dbMonster.createdAt.toISOString(),
    updatedAt: typeof dbMonster.updatedAt === 'string'
      ? dbMonster.updatedAt
      : dbMonster.updatedAt.toISOString()
  }
}

/**
 * Transforme un tableau de monstres DashboardMonster en DBMonster
 *
 * Cette fonction filtre les monstres invalides (sans ID MongoDB valide)
 * et convertit les dates string en objets Date.
 *
 * @param dashboardMonsters - Liste des monstres au format dashboard
 * @returns Liste des monstres au format base de données, filtrée
 *
 * @example
 * const dbMonsters = transformDashboardMonstersToDBMonsters(dashboardMonsters)
 */
export function transformDashboardMonstersToDBMonsters (dashboardMonsters: DashboardMonster[]): DBMonster[] {
  return dashboardMonsters
    .filter((monster) => {
      // Ne garder que les monstres qui ont un ID MongoDB valide
      const validId = monster._id ?? monster.id
      return validId !== undefined && validId !== null && validId.trim().length > 0
    })
    .map((monster) => ({
      _id: monster._id ?? monster.id ?? '',
      name: monster.name,
      level: monster.level ?? 1,
      traits: monster.traits,
      state: (monster.state as any) ?? 'happy',
      ownerId: monster.ownerId,
      createdAt: monster.createdAt !== undefined && monster.createdAt !== null
        ? new Date(monster.createdAt)
        : new Date(),
      updatedAt: monster.updatedAt !== undefined && monster.updatedAt !== null
        ? new Date(monster.updatedAt)
        : new Date()
    }))
}
