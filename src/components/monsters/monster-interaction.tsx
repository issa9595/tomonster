'use client'

import { useState } from 'react'
import { AnimatedMonsterDisplay } from './animated-monster-display'
import { MonsterActionsWrapper } from './monster-actions-wrapper'
import type { DBMonster } from '@/types/monster'

/**
 * Props du composant MonsterInteraction
 */
interface MonsterInteractionProps {
  /** Données du monstre à afficher et avec lequel interagir */
  monster: DBMonster
}

/**
 * Composant orchestrateur pour l'interaction avec un monstre
 *
 * Responsabilités :
 * - Coordonner l'affichage du monstre et les actions
 * - Gérer l'état des animations en cours
 * - Synchroniser l'affichage avec les actions effectuées
 *
 * @example
 * <MonsterInteraction monster={dbMonster} />
 */
export function MonsterInteraction ({ monster }: MonsterInteractionProps): React.ReactNode {
  const [activeAnimation, setActiveAnimation] = useState<string | null>(null)

  /**
   * Déclenche le début d'une animation
   *
   * @param action - Nom de l'action déclenchée
   */
  const handleAnimationStart = (action: string): void => {
    setActiveAnimation(action)
  }

  /**
   * Termine l'animation en cours
   */
  const handleAnimationEnd = (): void => {
    setActiveAnimation(null)
  }

  return (
    <>
      {/* Monstre animé */}
      <div className='bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-moccaccino-200 shadow-2xl p-8'>
        <div className='text-center mb-6'>
          <h2 className='text-3xl font-bold text-moccaccino-800 mb-2'>
            {monster.name}
          </h2>
          <p className='text-moccaccino-600'>
            Votre petit monstre virtuel vous attend !
          </p>
        </div>

        {/* Zone d'affichage du monstre */}
        <div className='bg-gradient-to-br from-moccaccino-100 to-fuchsia-blue-100 rounded-2xl p-8 mb-6'>
          <div className='w-full h-80 flex items-center justify-center'>
            <AnimatedMonsterDisplay
              monster={monster}
              activeAnimation={activeAnimation}
            />
          </div>
        </div>

        {/* Actions sur le monstre */}
        <MonsterActionsWrapper
          monster={monster}
          onAnimationStart={handleAnimationStart}
          onAnimationEnd={handleAnimationEnd}
        />
      </div>
    </>
  )
}
