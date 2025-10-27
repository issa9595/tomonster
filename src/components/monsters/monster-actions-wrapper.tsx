'use client'

import { MonsterActions } from './monster-actions'
import { DBMonster } from '@/types/monster'

interface MonsterActionsWrapperProps {
  monster: DBMonster
  onAnimationStart?: (action: string) => void
  onAnimationEnd?: () => void
}

export function MonsterActionsWrapper ({ monster, onAnimationStart, onAnimationEnd }: MonsterActionsWrapperProps): React.ReactNode {
  const handleActionPerformed = (action: string): void => {
    console.log(`Action effectuée: ${action}`)
    // Ici on pourrait ajouter la logique pour mettre à jour le monstre
    // Par exemple, appeler une action serveur ou mettre à jour l'état local
  }

  return (
    <MonsterActions
      monster={monster}
      onActionPerformed={handleActionPerformed}
      onAnimationStart={onAnimationStart}
      onAnimationEnd={onAnimationEnd}
    />
  )
}
