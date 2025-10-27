import { useMemo } from 'react'
import { authClient } from '@/lib/auth-client'

type Session = typeof authClient.$Infer.Session

/**
 * Dérive un nom d'affichage convivial à partir d'une session utilisateur
 *
 * Priorité :
 * 1. Premier mot du nom complet
 * 2. Partie avant @ de l'email
 * 3. Fallback: "Gardien.ne"
 *
 * @param session - Session utilisateur authentifiée
 * @returns Nom d'affichage formaté
 *
 * @example
 * deriveDisplayName({ user: { name: "Jean Dupont" }}) // "Jean"
 * deriveDisplayName({ user: { email: "jean@example.com" }}) // "jean"
 * deriveDisplayName({ user: {} }) // "Gardien.ne"
 */
export function deriveDisplayName (session: Session): string {
  const rawName = session.user?.name
  if (typeof rawName === 'string' && rawName.trim().length > 0) {
    return rawName.trim().split(' ')[0]
  }

  const fallbackEmail = session.user?.email
  if (typeof fallbackEmail === 'string' && fallbackEmail.includes('@')) {
    return fallbackEmail.split('@')[0]
  }

  return 'Gardien.ne'
}

/**
 * Hook personnalisé qui calcule et mémorise le nom d'affichage de l'utilisateur
 *
 * @param session - Session utilisateur authentifiée
 * @returns Nom d'affichage formaté et mémorisé
 *
 * @example
 * const displayName = useUserDisplayName(session)
 */
export function useUserDisplayName (session: Session): string {
  return useMemo(() => deriveDisplayName(session), [session])
}
