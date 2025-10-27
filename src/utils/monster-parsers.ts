import { MONSTER_STATES, DEFAULT_MONSTER_STATE, type MonsterTraits, type MonsterState } from '@/types/monster'

/**
 * Vérifie si une valeur est un état de monstre valide
 *
 * @param value - Valeur à vérifier
 * @returns true si la valeur est un MonsterState valide
 *
 * @example
 * isMonsterState('happy') // true
 * isMonsterState('invalid') // false
 */
export function isMonsterState (value: MonsterState | string | null | undefined): value is MonsterState {
  return typeof value === 'string' && MONSTER_STATES.includes(value as MonsterState)
}

/**
 * Parse une chaîne JSON en objet MonsterTraits
 *
 * @param rawTraits - Chaîne JSON contenant les traits
 * @returns Objet MonsterTraits parsé ou null en cas d'erreur
 *
 * @example
 * parseMonsterTraits('{"bodyStyle":"round",...}') // { bodyStyle: 'round', ... }
 * parseMonsterTraits('invalid') // null
 */
export function parseMonsterTraits (rawTraits: string): MonsterTraits | null {
  if (typeof rawTraits !== 'string' || rawTraits.trim().length === 0) return null
  try {
    return JSON.parse(rawTraits) as MonsterTraits
  } catch (error) {
    console.error('Unable to parse monster traits', error)
    return null
  }
}

/**
 * Normalise un état de monstre potentiellement invalide vers un état valide
 *
 * @param state - État à normaliser
 * @returns État valide ou DEFAULT_MONSTER_STATE si invalide
 *
 * @example
 * normalizeMonsterState('happy') // 'happy'
 * normalizeMonsterState('invalid') // DEFAULT_MONSTER_STATE
 */
export function normalizeMonsterState (state: MonsterState | string | null | undefined): MonsterState {
  return isMonsterState(state) ? state : DEFAULT_MONSTER_STATE
}

/**
 * Formate une date en format français court
 *
 * @param value - Date sous forme de string ou undefined
 * @returns Date formatée ou null si invalide
 *
 * @example
 * formatMonsterAdoptionDate('2025-10-27') // "27 oct. 2025"
 * formatMonsterAdoptionDate(undefined) // null
 */
export function formatMonsterAdoptionDate (value: string | undefined): string | null {
  if (value === undefined) return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

/**
 * Formate une date en format français complet avec heure
 *
 * @param date - Date à formater (Date ou string)
 * @returns Date formatée ou 'Date invalide' en cas d'erreur
 *
 * @example
 * formatMonsterDate(new Date()) // "27 octobre 2025 à 14:30"
 */
export function formatMonsterDate (date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) {
    return 'Date invalide'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(dateObj)
}
