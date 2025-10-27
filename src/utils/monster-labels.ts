import type { MonsterTraits, MonsterState } from '@/types/monster'

/**
 * Labels français pour chaque état de monstre
 */
export const MONSTER_STATE_LABELS: Record<MonsterState, string> = {
  happy: 'Heureux',
  sad: 'Triste',
  angry: 'Fâché',
  hungry: 'Affamé',
  sleepy: 'Somnolent'
}

/**
 * Emojis associés à chaque état de monstre
 */
export const MONSTER_STATE_EMOJI: Record<MonsterState, string> = {
  happy: '😄',
  sad: '😢',
  angry: '😤',
  hungry: '😋',
  sleepy: '😴'
}

/**
 * Classes CSS pour les badges d'état
 */
export const STATE_BADGE_CLASSES: Record<MonsterState, string> = {
  happy: 'bg-lochinvar-100 text-lochinvar-700 ring-1 ring-inset ring-lochinvar-200',
  sad: 'bg-fuchsia-blue-100 text-fuchsia-blue-700 ring-1 ring-inset ring-fuchsia-blue-200',
  angry: 'bg-moccaccino-100 text-moccaccino-600 ring-1 ring-inset ring-moccaccino-200',
  hungry: 'bg-amber-100 text-amber-700 ring-1 ring-inset ring-amber-200',
  sleepy: 'bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-200'
}

/**
 * Labels pour les styles de corps
 */
export const BODY_STYLE_LABELS: Record<MonsterTraits['bodyStyle'], string> = {
  round: 'Corps arrondi',
  square: 'Corps carré',
  tall: 'Corps élancé',
  wide: 'Corps large'
}

/**
 * Labels pour les styles d'yeux
 */
export const EYE_STYLE_LABELS: Record<MonsterTraits['eyeStyle'], string> = {
  big: 'Grands yeux',
  small: 'Petits yeux',
  star: 'Yeux étoilés',
  sleepy: 'Yeux endormis'
}

/**
 * Labels pour les styles d'antennes
 */
export const ANTENNA_STYLE_LABELS: Record<MonsterTraits['antennaStyle'], string> = {
  single: 'Antenne unique',
  double: 'Deux antennes',
  curly: 'Antennes bouclées',
  none: 'Sans antennes'
}

/**
 * Labels pour les accessoires
 */
export const ACCESSORY_LABELS: Record<MonsterTraits['accessory'], string> = {
  horns: 'Cornes',
  ears: 'Oreilles',
  tail: 'Queue',
  none: 'Sans accessoires'
}

/**
 * Obtient le label français pour un état de monstre
 *
 * @param state - État du monstre
 * @returns Label en français
 */
export function getMonsterStateLabel (state: MonsterState): string {
  return MONSTER_STATE_LABELS[state] ?? 'Heureux'
}

/**
 * Obtient l'emoji associé à un état de monstre
 *
 * @param state - État du monstre
 * @returns Emoji correspondant
 */
export function getMonsterStateEmoji (state: MonsterState): string {
  return MONSTER_STATE_EMOJI[state] ?? '😊'
}

/**
 * Génère un résumé textuel des caractéristiques visuelles d'un monstre
 *
 * @param traits - Traits du monstre
 * @returns Chaîne résumant les 3 premières caractéristiques
 *
 * @example
 * buildFeatureSummary(traits) // "Corps arrondi · Grands yeux · Deux antennes"
 */
export function buildFeatureSummary (traits: MonsterTraits): string {
  const features = [
    BODY_STYLE_LABELS[traits.bodyStyle],
    EYE_STYLE_LABELS[traits.eyeStyle],
    ANTENNA_STYLE_LABELS[traits.antennaStyle],
    ACCESSORY_LABELS[traits.accessory]
  ]

  return features
    .filter((feature) => feature !== undefined && feature.length > 0)
    .slice(0, 3)
    .join(' · ')
}
