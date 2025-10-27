'use client'

import { useState, useEffect } from 'react'
import { AnimatedMonster } from './animated-monster'
import { MonsterTraits } from '@/types/monster'

interface AnimatedMonsterDisplayProps {
  monster: {
    state: string
    traits: string
    level: number
  }
  activeAnimation?: string | null
}

export function AnimatedMonsterDisplay ({ monster, activeAnimation }: AnimatedMonsterDisplayProps): React.ReactNode {
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null)

  useEffect(() => {
    if (activeAnimation !== null && activeAnimation !== undefined) {
      setCurrentAnimation(activeAnimation)
    }
  }, [activeAnimation])

  const traits: MonsterTraits = JSON.parse(monster.traits)

  // Déterminer l'état du monstre selon l'action
  let displayState: 'happy' | 'sad' | 'hungry' | 'sleepy' | 'angry' = monster.state as 'happy' | 'sad' | 'hungry' | 'sleepy' | 'angry'
  if (currentAnimation === 'feed') displayState = 'happy'
  if (currentAnimation === 'comfort') displayState = 'happy'
  if (currentAnimation === 'cuddle') displayState = 'happy'
  if (currentAnimation === 'wake') displayState = 'happy'

  return (
    <div className={`transition-all duration-500 ${currentAnimation !== null ? 'animate-bounce' : ''}`}>
      <AnimatedMonster
        state={displayState}
        traits={traits}
        level={monster.level}
        activeAnimation={currentAnimation as 'feed' | 'comfort' | 'cuddle' | 'wake' | null}
      />
    </div>
  )
}
