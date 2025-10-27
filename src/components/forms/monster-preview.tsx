import { PixelMonster } from '../monsters'
import type { MonsterTraits, MonsterState } from '@/types/monster'

/**
 * Props du composant MonsterPreview
 */
interface MonsterPreviewProps {
  /** Traits visuels du monstre à afficher */
  traits: MonsterTraits
  /** État d'humeur actuel pour l'affichage */
  state: MonsterState
  /** Niveau du monstre (par défaut 1 pour les nouveaux monstres) */
  level?: number
}

/**
 * Composant de prévisualisation d'un monstre dans le formulaire de création
 *
 * Responsabilités :
 * - Afficher le rendu pixel du monstre avec ses traits
 * - Maintenir un conteneur avec un fond approprié
 * - Adapter l'affichage à l'état d'humeur sélectionné
 *
 * @example
 * <MonsterPreview traits={generatedTraits} state="happy" level={1} />
 */
function MonsterPreview ({ traits, state, level = 1 }: MonsterPreviewProps): React.ReactNode {
  return (
    <div className='flex items-center justify-center rounded-3xl bg-slate-50/70 p-4'>
      <PixelMonster traits={traits} state={state} level={level} />
    </div>
  )
}

export default MonsterPreview
