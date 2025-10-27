import { useMemo } from 'react'
import type { DashboardStats } from './use-dashboard-stats'

/**
 * Interface représentant une quête du dashboard
 */
export interface DashboardQuest {
  /** Identifiant unique de la quête */
  id: string
  /** Libellé de la quête à afficher */
  label: string
  /** Indique si la quête est accomplie */
  complete: boolean
}

/**
 * Hook personnalisé qui génère la liste des quêtes du dashboard en fonction des statistiques
 *
 * Les quêtes sont dynamiques et s'adaptent aux progrès de l'utilisateur :
 * - Créer sa première créature (ou en créer une nouvelle)
 * - Atteindre le niveau 5 avec un monstre
 * - Découvrir au moins 3 humeurs différentes
 *
 * @param stats - Statistiques du dashboard
 * @returns Liste des quêtes avec leur état de complétion
 *
 * @example
 * const quests = useDashboardQuests(stats)
 * quests.forEach(quest => console.log(`${quest.label}: ${quest.complete ? '✅' : '⏳'}`))
 */
export function useDashboardQuests (stats: DashboardStats): DashboardQuest[] {
  return useMemo(() => [
    {
      id: 'create',
      label: stats.totalMonsters > 0
        ? 'Imagine une nouvelle créature multicolore'
        : 'Crée ta toute première créature magique',
      complete: stats.totalMonsters > 0
    },
    {
      id: 'level',
      label: "Fais évoluer un compagnon jusqu'au niveau 5",
      complete: stats.highestLevel >= 5
    },
    {
      id: 'moods',
      label: 'Découvre au moins 3 humeurs différentes',
      complete: stats.moodVariety >= 3
    }
  ], [stats.highestLevel, stats.moodVariety, stats.totalMonsters])
}
