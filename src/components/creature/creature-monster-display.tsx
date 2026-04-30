import { AnimatedMonster, MonsterActions } from '@/components/monsters'
import type { MonsterTraits, MonsterState } from '@/types/monster'
import type { MonsterAction } from '@/hooks/monsters'
import { getStateLabel } from '@/lib/utils'
import { ACCESSORIES_CATALOG } from '@/config/accessories.config'
import { BACKGROUNDS_CATALOG } from '@/config/backgrounds.config'

/**
 * Props pour le composant CreatureMonsterDisplay
 */
interface CreatureMonsterDisplayProps {
  /** Traits visuels du monstre */
  traits: MonsterTraits
  /** État actuel du monstre */
  state: MonsterState
  /** Niveau du monstre */
  level: number
  /** Action actuellement en cours */
  currentAction: MonsterAction
  /** Callback appelé lors d'une action */
  onAction: (action: MonsterAction) => void
  /** ID du monstre */
  monsterId: string
  /** Accessoires équipés */
  equippedAccessories?: { hat?: string | null, glasses?: string | null, shoes?: string | null } | null
  /** Fond équipé */
  equippedBackground?: string | null
}

/**
 * Panneau d'affichage du monstre animé avec actions - Version Jeu Vidéo Fun
 *
 * Responsabilité unique : orchestrer l'affichage du monstre animé,
 * de son état actuel et des actions disponibles.
 *
 * Nouveau design :
 * - Zone du monstre plus grande et colorée
 * - Badge d'état fun
 * - Animations et effets visuels
 *
 * @param {CreatureMonsterDisplayProps} props - Props du composant
 * @returns {React.ReactNode} Panneau avec monstre et actions
 */
export function CreatureMonsterDisplay ({
  traits,
  state,
  level,
  currentAction,
  onAction,
  monsterId,
  equippedAccessories,
  equippedBackground
}: CreatureMonsterDisplayProps): React.ReactNode {
  const hat = equippedAccessories?.hat ? ACCESSORIES_CATALOG.find(a => a.id === equippedAccessories.hat) : null
  const glasses = equippedAccessories?.glasses ? ACCESSORIES_CATALOG.find(a => a.id === equippedAccessories.glasses) : null
  const shoes = equippedAccessories?.shoes ? ACCESSORIES_CATALOG.find(a => a.id === equippedAccessories.shoes) : null
  const bg = equippedBackground ? BACKGROUNDS_CATALOG.find(b => b.id === equippedBackground) : null
  // Couleurs selon l'état
  const stateColors: Record<string, { bg: string, text: string, emoji: string }> = {
    happy: { bg: 'from-green-400 to-emerald-500', text: 'Joyeux', emoji: '😊' },
    sad: { bg: 'from-blue-400 to-cyan-500', text: 'Triste', emoji: '😢' },
    angry: { bg: 'from-red-400 to-rose-500', text: 'En colère', emoji: '😠' },
    hungry: { bg: 'from-orange-400 to-yellow-500', text: 'Affamé', emoji: '😋' },
    sleepy: { bg: 'from-purple-400 to-indigo-500', text: 'Fatigué', emoji: '😴' }
  }

  const currentState = stateColors[state] ?? stateColors.happy

  return (
    <div className='relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-pink-50 to-purple-100 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.2)] ring-8 ring-white/80'>
      {/* Bulles décoratives */}
      <div className='pointer-events-none absolute -right-12 top-10 h-40 w-40 rounded-full bg-gradient-to-br from-yellow-300/30 to-orange-300/30 blur-2xl animate-float' />
      <div className='pointer-events-none absolute -left-16 -top-12 h-48 w-48 rounded-full bg-gradient-to-br from-pink-300/30 to-purple-300/30 blur-2xl animate-float-delayed' />

      {/* Zone d'affichage du monstre animé - PLUS GRANDE */}
      <div className='relative aspect-square max-w-lg mx-auto mb-8'>
        <div
          className='absolute inset-0 rounded-3xl animate-pulse-slow'
          style={{ background: bg ? bg.cssValue : 'linear-gradient(135deg, #fef9c3 0%, #fce7f3 50%, #ede9fe 100%)' }}
        />

        {/* Chapeau — au-dessus de la tête */}
        {hat && (
          <div className='absolute top-6 left-1/2 -translate-x-1/2 text-4xl z-10 pointer-events-none'>
            <span title={hat.name}>{hat.emoji}</span>
          </div>
        )}

        {/* Lunettes — sur le visage */}
        {glasses && (
          <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl z-10 pointer-events-none'>
            <span title={glasses.name}>{glasses.emoji}</span>
          </div>
        )}

        {/* Chaussures — en bas du monstre */}
        {shoes && (
          <div className='absolute bottom-6 left-1/2 -translate-x-1/2 text-3xl z-10 pointer-events-none'>
            <span title={shoes.name}>{shoes.emoji}</span>
          </div>
        )}

        <div className='relative p-8'>
          <AnimatedMonster
            state={state}
            traits={traits}
            level={level}
            currentAction={currentAction}
          />
        </div>

        {/* Effet de particules décoratives */}
        <div className='pointer-events-none absolute top-10 right-10 text-3xl animate-twinkle'>⭐</div>
        <div className='pointer-events-none absolute bottom-10 left-10 text-3xl animate-twinkle-delayed'>💫</div>
      </div>

      {/* Badge d'état du monstre - GROS ET FUN */}
      <div className='mb-8 text-center'>
        <div className='inline-block relative'>
          <div className={`absolute inset-0 bg-gradient-to-r ${currentState.bg} rounded-3xl blur-lg opacity-50`} />
          <div className={`relative bg-gradient-to-r ${currentState.bg} px-8 py-4 rounded-3xl shadow-2xl ring-4 ring-white/70`}>
            <div className='flex items-center gap-4'>
              <span className='text-5xl'>{currentState.emoji}</span>
              <div className='text-left'>
                <p className='text-sm font-bold text-white/90 uppercase tracking-wider'>État actuel</p>
                <p className='text-2xl font-black text-white'>{getStateLabel(state)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions disponibles */}
      <div className='relative'>
        <MonsterActions onAction={onAction} monsterId={monsterId} />
      </div>

      {/* Styles pour les animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }

        @keyframes twinkle-delayed {
          0%, 100% { opacity: 0.4; transform: scale(0.9) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.1) rotate(-180deg); }
        }

        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 4s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-twinkle-delayed { animation: twinkle-delayed 3s ease-in-out infinite; }
      `}
      </style>
    </div>
  )
}
