'use client'
import { useMemo, useState } from 'react'
import CreateMonsterModal from './create-monster-modal'
import DashboardHero from './dashboard-hero'
import DashboardUserStats from './dashboard-user-stats'
import DashboardQuests from './dashboard-quests'
import DashboardMoodTip from './dashboard-mood-tip'
import type { CreateMonsterFormValues } from '@/types/forms/create-monster-form'
import { authClient } from '@/lib/auth-client'
import { createMonster } from '@/actions/monsters.actions'
import MonstersList, { type DashboardMonster } from '../monsters/monsters-list'
import { useDashboardStats } from '@/hooks/use-dashboard-stats'
import { useUserDisplayName } from '@/hooks/use-user-display-name'
import { useDashboardQuests } from '@/hooks/use-dashboard-quests'
import { transformDashboardMonstersToDBMonsters } from '@/utils/monster-transformers'
import { getMoodLabel, generateMoodMessage, formatAdoptionDate } from '@/utils/mood-labels'

type Session = typeof authClient.$Infer.Session

/**
 * Props du composant DashboardContent
 */
interface DashboardContentProps {
  /** Session utilisateur authentifiée */
  session: Session
  /** Liste des monstres de l'utilisateur au format dashboard */
  monsters: DashboardMonster[]
}

/**
 * Composant principal du contenu du dashboard
 *
 * Responsabilités :
 * - Orchestrer l'affichage des différentes sections du dashboard
 * - Gérer l'état du modal de création de monstre
 * - Coordonner les actions utilisateur (déconnexion, création)
 * - Transformer les données pour les différents composants
 *
 * @example
 * <DashboardContent session={session} monsters={monsters} />
 */
function DashboardContent ({ session, monsters }: DashboardContentProps): React.ReactNode {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Hooks personnalisés pour la logique métier
  const displayName = useUserDisplayName(session)
  const dbMonsters = useMemo(() => transformDashboardMonstersToDBMonsters(monsters), [monsters])
  const stats = useDashboardStats(dbMonsters)
  const quests = useDashboardQuests(stats)

  // Calculs dérivés pour l'UI
  const sessionEmail = session.user?.email ?? 'gardien.ne@tamagotcho.app'
  const firstLetter = displayName.charAt(0).toUpperCase()
  const userInitial = firstLetter === '' ? 'G' : firstLetter
  const latestAdoptionLabel = useMemo(() => formatAdoptionDate(stats.latestAdoption), [stats.latestAdoption])
  const favoriteMoodLabel = stats.favoriteMood !== null ? getMoodLabel(stats.favoriteMood) : null
  const favoriteMoodMessage = useMemo(
    () => generateMoodMessage(favoriteMoodLabel, stats.totalMonsters),
    [favoriteMoodLabel, stats.totalMonsters]
  )

  /**
   * Gère la déconnexion de l'utilisateur
   * Redirige vers la page de connexion après déconnexion
   */
  const handleLogout = (): void => {
    void authClient.signOut()
    window.location.href = '/sign-in'
  }

  /**
   * Ouvre le modal de création de monstre
   */
  const handleCreateMonster = (): void => {
    setIsModalOpen(true)
  }

  /**
   * Ferme le modal de création de monstre
   */
  const handleCloseModal = (): void => {
    setIsModalOpen(false)
  }

  /**
   * Soumet le formulaire de création de monstre
   * Recharge la page après création réussie
   *
   * @param values - Données du formulaire de création
   */
  const handleMonsterSubmit = (values: CreateMonsterFormValues): void => {
    void createMonster(values).then(() => {
      window.location.reload()
    })
  }

  return (
    <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-moccaccino-100 via-white to-fuchsia-blue-100'>
      {/* Décorations de fond */}
      <div className='pointer-events-none absolute -right-32 top-24 h-72 w-72 rounded-full bg-fuchsia-blue-200/40 blur-3xl' aria-hidden='true' />
      <div className='pointer-events-none absolute -left-32 bottom-24 h-80 w-80 rounded-full bg-lochinvar-200/50 blur-3xl' aria-hidden='true' />

      <main className='relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-20 sm:px-6 lg:px-8'>
        {/* Section Hero avec informations utilisateur */}
        <section className='relative overflow-hidden rounded-3xl bg-white/80 px-6 py-10 shadow-[0_20px_60px_rgba(15,23,42,0.18)] ring-1 ring-white/60 sm:px-10'>
          <div className='pointer-events-none absolute -right-28 -top-16 h-64 w-64 rounded-full bg-gradient-to-br from-moccaccino-200/70 via-fuchsia-blue-200/50 to-white/40 blur-3xl' aria-hidden='true' />
          <div className='pointer-events-none absolute -left-32 bottom-0 h-64 w-64 translate-y-1/2 rounded-full bg-gradient-to-tr from-lochinvar-200/60 via-white/30 to-fuchsia-blue-100/60 blur-3xl' aria-hidden='true' />

          <div className='relative flex flex-col gap-10 lg:flex-row lg:items-center'>
            <DashboardHero
              displayName={displayName}
              onCreateMonster={handleCreateMonster}
              onLogout={handleLogout}
            />
            <DashboardUserStats
              email={sessionEmail}
              userInitial={userInitial}
              stats={stats}
              latestAdoptionLabel={latestAdoptionLabel}
            />
          </div>
        </section>

        {/* Section principale : liste des monstres et sidebar */}
        <section className='mt-12 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
          <div>
            <MonstersList monsters={dbMonsters} className='mt-0' />
          </div>

          <aside className='flex flex-col gap-6'>
            <DashboardQuests quests={quests} />
            <DashboardMoodTip message={favoriteMoodMessage} />
          </aside>
        </section>
      </main>

      {/* Modal de création de monstre */}
      <CreateMonsterModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleMonsterSubmit}
      />
    </div>
  )
}

export default DashboardContent
