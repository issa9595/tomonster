import { RARITY_COLORS } from '@/config/accessories.config'
import type { AccessoryRarity } from '@/types/accessories'

const RARITY_LABELS: Record<AccessoryRarity, string> = {
  common: 'Commun',
  rare: 'Rare',
  epic: 'Épique',
  legendary: 'Légendaire',
}

interface RarityBadgeProps {
  rarity: AccessoryRarity
}

export default function RarityBadge ({ rarity }: RarityBadgeProps): React.ReactNode {
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${RARITY_COLORS[rarity]}`}>
      {RARITY_LABELS[rarity]}
    </span>
  )
}
