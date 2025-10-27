import type { DBMonster, MonsterState } from '@/types/monster'
import MonsterCard from './monster-card'
import { mergeClasses } from '@/utils/css-helpers'

/**
 * Interface pour les monstres au format Dashboard
 * Utilisé pour la compatibilité entre différentes représentations de données
 */
export interface DashboardMonster {
  id?: string
  _id?: string
  name: string
  traits: string
  level?: number | null
  state?: MonsterState | string | null
  ownerId: string
  createdAt?: string
  updatedAt?: string
}

/**
 * Props du composant MonstersList
 */
interface MonstersListProps {
  /** Liste des monstres à afficher */
  monsters: DBMonster[]
  /** Classes CSS additionnelles (optionnel) */
  className?: string
}

/**
 * Composant d'affichage de la liste complète des monstres
 *
 * Responsabilités :
 * - Afficher un message d'encouragement si la liste est vide
 * - Rendre une grille responsive de cartes de monstres
 * - Maintenir une mise en page cohérente et attrayante
 *
 * @example
 * <MonstersList monsters={dbMonsters} className="mt-8" />
 */
function MonstersList ({ monsters, className }: MonstersListProps): React.ReactNode {
  // Affichage si aucun monstre n'existe
  if (monsters === null || monsters === undefined || monsters.length === 0) {
    return (
      <div className={mergeClasses('mt-10 w-full rounded-3xl bg-gradient-to-br from-white/90 via-lochinvar-50/80 to-fuchsia-blue-50/80 p-8 text-center shadow-[0_16px_40px_rgba(15,23,42,0.12)] ring-1 ring-white/70 backdrop-blur', className)}>
        <h2 className='text-xl font-semibold text-slate-900'>Tu n&apos;as pas encore de compagnon</h2>
        <p className='mt-2 text-sm text-slate-600'>Clique sur &quot;Créer une créature&quot; pour lancer ta première adoption magique.</p>
      </div>
    )
  }

  // Affichage de la liste des monstres
  return (
    <section className={mergeClasses('mt-12 w-full space-y-8', className)}>
      {/* En-tête de section */}
      <header className='space-y-2'>
        <h2 className='text-2xl font-bold text-slate-900'>Tes compagnons animés</h2>
        <p className='text-sm text-slate-600'>Un coup d&apos;oeil rapide sur ta ménagerie digitale pour préparer la prochaine aventure.</p>
      </header>

      {/* Grille de cartes de monstres */}
      <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3'>
        {monsters.map((monster) => (
          <MonsterCard key={monster._id ?? monster.name} monster={monster} />
        ))}
      </div>
    </section>
  )
}

export default MonstersList
