import { getMonsters } from '@/actions/monsters.actions'
import DashboardContent from '@/components/dashboard/dashboard-content'
import { auth } from '@/lib/auth'
import { transformDBMonsterToDashboardMonster } from '@/utils/monster-transformers'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

/**
 * Page principale du Dashboard utilisateur
 *
 * Responsabilités :
 * - Vérifier l'authentification de l'utilisateur
 * - Récupérer les monstres depuis la base de données
 * - Transformer les données pour le format d'affichage
 * - Rediriger les utilisateurs non authentifiés
 *
 * @returns Contenu du dashboard ou redirection vers la page de connexion
 *
 * @example
 * // Route automatiquement accessible à /dashboard
 */
async function DashboardPage (): Promise<React.ReactNode> {
  // Récupération de la session utilisateur
  const session = await auth.api.getSession({
    headers: await headers()
  })

  // Récupération des monstres depuis la base de données
  const dbMonsters = await getMonsters()
  const dashboardMonsters = dbMonsters.map(transformDBMonsterToDashboardMonster)

  // Redirection si non authentifié
  if (session === null || session === undefined) {
    redirect('/sign-in')
  }

  return (
    <DashboardContent session={session} monsters={dashboardMonsters} />
  )
}

export default DashboardPage
