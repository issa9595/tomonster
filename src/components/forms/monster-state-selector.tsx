import Button from '../button'
import { MONSTER_STATES, type MonsterState } from '@/types/monster'

/**
 * Labels français pour chaque état de monstre
 */
const MONSTER_STATE_LABELS: Record<MonsterState, string> = {
  happy: 'Heureux 😊',
  sad: 'Triste 😢',
  angry: 'Fâché 😡',
  hungry: 'Affamé 😋',
  sleepy: 'Somnolent 😴'
}

/**
 * Props du composant MonsterStateSelector
 */
interface MonsterStateSelectorProps {
  /** État actuellement sélectionné */
  selectedState: MonsterState
  /** Callback appelé lors de la sélection d'un nouvel état */
  onStateChange: (state: MonsterState) => void
}

/**
 * Sélecteur d'humeur pour la prévisualisation du monstre
 *
 * Responsabilités :
 * - Afficher tous les états disponibles sous forme de boutons
 * - Indiquer visuellement l'état actuellement sélectionné
 * - Permettre le changement d'état pour la prévisualisation
 *
 * @example
 * <MonsterStateSelector
 *   selectedState="happy"
 *   onStateChange={(state) => setPreviewState(state)}
 * />
 */
function MonsterStateSelector ({ selectedState, onStateChange }: MonsterStateSelectorProps): React.ReactNode {
  return (
    <div className='flex flex-wrap items-center justify-center gap-2'>
      {MONSTER_STATES.map((state) => (
        <Button
          key={state}
          type='button'
          size='sm'
          variant={state === selectedState ? 'primary' : 'ghost'}
          onClick={() => onStateChange(state)}
        >
          {MONSTER_STATE_LABELS[state]}
        </Button>
      ))}
    </div>
  )
}

export default MonsterStateSelector
