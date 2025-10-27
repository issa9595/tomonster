import { useMemo } from 'react'
import type { DBMonster } from '@/types/monster'

/**
 * Interface représentant les statistiques calculées du dashboard
 */
export interface DashboardStats {
  /** Nombre total de monstres */
  totalMonsters: number
  /** Niveau le plus élevé parmi tous les monstres */
  highestLevel: number
  /** Date de la dernière adoption (updatedAt le plus récent) */
  latestAdoption: Date | null
  /** Humeur la plus fréquente parmi tous les monstres */
  favoriteMood: string | null
  /** Nombre d'humeurs uniques détectées */
  moodVariety: number
}

/**
 * Hook personnalisé qui calcule les statistiques du dashboard à partir d'une liste de monstres
 *
 * @param monsters - Liste des monstres de l'utilisateur
 * @returns Objet contenant toutes les statistiques calculées
 *
 * @example
 * const stats = useDashboardStats(monsters)
 * console.log(stats.totalMonsters) // 5
 */
export function useDashboardStats (monsters: DBMonster[]): DashboardStats {
  return useMemo(() => {
    if (!Array.isArray(monsters) || monsters.length === 0) {
      return {
        totalMonsters: 0,
        highestLevel: 1,
        latestAdoption: null,
        favoriteMood: null,
        moodVariety: 0
      }
    }

    let highestLevel = 1
    let latestAdoption: Date | null = null
    const moodCounter: Record<string, number> = {}
    const moodSet = new Set<string>()

    monsters.forEach((monster) => {
      // Calcul du niveau le plus élevé
      const level = monster.level
      if (level > highestLevel) {
        highestLevel = level
      }

      // Calcul de la dernière adoption
      const parsed = monster.updatedAt instanceof Date
        ? monster.updatedAt
        : new Date(monster.updatedAt)

      if (!Number.isNaN(parsed.getTime()) && (latestAdoption === null || parsed > latestAdoption)) {
        latestAdoption = parsed
      }

      // Comptage des humeurs
      const mood = monster.state
      if (mood !== null && mood.length > 0) {
        moodCounter[mood] = (moodCounter[mood] ?? 0) + 1
        moodSet.add(mood)
      }
    })

    // Détermination de l'humeur favorite (la plus fréquente)
    const favoriteMood = Object.entries(moodCounter)
      .sort((a, b) => b[1] - a[1])[0]?.[0] ?? null

    return {
      totalMonsters: monsters.length,
      highestLevel,
      latestAdoption,
      favoriteMood,
      moodVariety: moodSet.size
    }
  }, [monsters])
}
