'use client'

import { useState } from 'react'
import type { DBMonster } from '@/types/monster'

/**
 * Type représentant les actions possibles sur un monstre
 */
type MonsterAction = 'feed' | 'comfort' | 'cuddle' | 'wake'

/**
 * Configuration d'une action de monstre
 */
interface ActionConfig {
  /** Identifiant unique de l'action */
  id: MonsterAction
  /** Libellé à afficher */
  label: string
  /** Emoji représentant l'action */
  emoji: string
  /** Description détaillée */
  description: string
  /** Classes CSS pour la couleur du bouton */
  color: string
  /** Durée de l'animation en millisecondes */
  animationDuration: number
}

/**
 * Props du composant MonsterActions
 */
interface MonsterActionsProps {
  /** Données du monstre cible */
  monster: DBMonster
  /** Callback appelé après l'exécution d'une action */
  onActionPerformed?: (action: string) => void
  /** Callback appelé au début de l'animation d'une action */
  onAnimationStart?: (action: MonsterAction) => void
  /** Callback appelé à la fin de l'animation */
  onAnimationEnd?: () => void
}

/**
 * Configuration de toutes les actions disponibles
 */
const actionConfigs: ActionConfig[] = [
  {
    id: 'feed',
    label: 'Nourrir',
    emoji: '🍎',
    description: 'Donner à manger au monstre',
    color: 'bg-green-500 hover:bg-green-600',
    animationDuration: 2000
  },
  {
    id: 'comfort',
    label: 'Consoler',
    emoji: '🤗',
    description: 'Réconforter le monstre',
    color: 'bg-blue-500 hover:bg-blue-600',
    animationDuration: 1500
  },
  {
    id: 'cuddle',
    label: 'Câliner',
    emoji: '💕',
    description: 'Faire un câlin au monstre',
    color: 'bg-pink-500 hover:bg-pink-600',
    animationDuration: 2500
  },
  {
    id: 'wake',
    label: 'Réveiller',
    emoji: '☀️',
    description: 'Réveiller le monstre',
    color: 'bg-yellow-500 hover:bg-yellow-600',
    animationDuration: 1800
  }
]

/**
 * Composant d'actions interactives pour un monstre
 *
 * Responsabilités :
 * - Afficher les différentes actions disponibles
 * - Gérer l'état d'animation et de chargement
 * - Coordonner les callbacks avec le parent
 * - Désactiver les actions pendant l'exécution
 *
 * @example
 * <MonsterActions
 *   monster={dbMonster}
 *   onAnimationStart={(action) => console.log('Action:', action)}
 *   onActionPerformed={(action) => updateMonster(action)}
 * />
 */
export function MonsterActions ({ monster, onActionPerformed, onAnimationStart, onAnimationEnd }: MonsterActionsProps): React.ReactNode {
  const [activeAnimation, setActiveAnimation] = useState<MonsterAction | null>(null)
  const [isPerformingAction, setIsPerformingAction] = useState(false)

  /**
   * Gère l'exécution d'une action sur le monstre
   * Empêche les actions multiples simultanées
   *
   * @param action - Action à exécuter
   */
  const handleAction = (action: MonsterAction): void => {
    if (isPerformingAction) return

    setIsPerformingAction(true)
    setActiveAnimation(action)
    onAnimationStart?.(action)

    // Simuler l'action avec une durée d'animation
    const config = actionConfigs.find(c => c.id === action)
    const duration = config?.animationDuration !== undefined ? config.animationDuration : 2000

    setTimeout(() => {
      setActiveAnimation(null)
      setIsPerformingAction(false)
      onAnimationEnd?.()
      onActionPerformed?.(action)
    }, duration)
  }

  return (
    <div className='bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-moccaccino-200 shadow-2xl p-6 max-w-4xl mx-auto'>
      <h2 className='text-2xl font-bold text-moccaccino-800 mb-6 text-center'>
        Actions sur {monster.name}
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {actionConfigs.map((config) => (
          <ActionButton
            key={config.id}
            config={config}
            isActive={activeAnimation === config.id}
            isDisabled={isPerformingAction}
            onClick={() => { handleAction(config.id) }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Props du composant ActionButton
 */
interface ActionButtonProps {
  /** Configuration de l'action */
  config: ActionConfig
  /** Indique si cette action est en cours d'exécution */
  isActive: boolean
  /** Indique si le bouton est désactivé */
  isDisabled: boolean
  /** Callback appelé au clic */
  onClick: () => void
}

/**
 * Bouton d'action individuel avec effet visuel
 *
 * Responsabilités :
 * - Afficher visuellement une action disponible
 * - Gérer les états actif/désactivé
 * - Fournir un feedback visuel au clic
 *
 * @example
 * <ActionButton
 *   config={feedConfig}
 *   isActive={true}
 *   isDisabled={false}
 *   onClick={() => handleFeed()}
 * />
 */
function ActionButton ({ config, isActive, isDisabled, onClick }: ActionButtonProps): React.ReactNode {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`
        relative overflow-hidden rounded-2xl p-4 text-white font-semibold
        transition-all duration-300 transform
        ${config.color}
        ${isActive ? 'scale-95 shadow-lg' : 'hover:scale-105'}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${isActive ? 'animate-pulse' : ''}
      `}
    >
      <div className='flex flex-col items-center gap-2'>
        <span className='text-3xl'>{config.emoji}</span>
        <span className='text-sm font-bold'>{config.label}</span>
        <span className='text-xs opacity-90 text-center'>{config.description}</span>
      </div>

      {/* Effet de vague lors du clic */}
      {isActive && (
        <div className='absolute inset-0 bg-white/20 animate-ping rounded-2xl' />
      )}
    </button>
  )
}
