import type { DashboardStats } from '@/hooks/use-dashboard-stats'

/**
 * Props du composant DashboardUserStats
 */
interface DashboardUserStatsProps {
  /** Email de l'utilisateur */
  email: string
  /** Initiale de l'utilisateur pour l'avatar */
  userInitial: string
  /** Statistiques calculées du dashboard */
  stats: DashboardStats
  /** Libellé formaté de la dernière adoption */
  latestAdoptionLabel: string
}

/**
 * Composant affichant les statistiques de l'utilisateur dans une carte dédiée
 *
 * Responsabilités :
 * - Afficher l'avatar et l'email de l'utilisateur
 * - Présenter les statistiques clés (nombre de monstres, niveau max, dernière adoption)
 * - Maintenir une mise en page responsive et attractive
 *
 * @example
 * <DashboardUserStats
 *   email="user@example.com"
 *   userInitial="U"
 *   stats={dashboardStats}
 *   latestAdoptionLabel="27 octobre 2025"
 * />
 */
function DashboardUserStats ({
  email,
  userInitial,
  stats,
  latestAdoptionLabel
}: DashboardUserStatsProps): React.ReactNode {
  return (
    <div className='flex flex-1 flex-col gap-4 rounded-3xl bg-gradient-to-br from-lochinvar-100/80 via-white to-fuchsia-blue-100/70 p-6 ring-1 ring-white/70 backdrop-blur'>
      {/* En-tête avec avatar */}
      <div className='flex items-center gap-4'>
        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-white/80 text-2xl font-bold text-moccaccino-500 shadow-inner'>
          {userInitial}
        </div>
        <div>
          <p className='text-xs uppercase tracking-[0.25em] text-slate-500'>Gardien.ne</p>
          <p className='text-lg font-semibold text-slate-800'>{email}</p>
        </div>
      </div>

      {/* Grille de statistiques */}
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
        {/* Nombre de compagnons */}
        <div className='rounded-2xl bg-white/80 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-lochinvar-200/60'>
          <p className='text-xs font-semibold uppercase tracking-wide text-lochinvar-500'>Compagnons</p>
          <p className='mt-2 text-3xl font-black text-slate-900'>{stats.totalMonsters}</p>
          <p className='text-xs text-slate-500'>Monstres prêts pour l&apos;aventure</p>
        </div>

        {/* Niveau maximum */}
        <div className='rounded-2xl bg-white/80 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-fuchsia-blue-200/60'>
          <p className='text-xs font-semibold uppercase tracking-wide text-fuchsia-blue-500'>Niveau max</p>
          <p className='mt-2 text-3xl font-black text-slate-900'>{stats.highestLevel}</p>
          <p className='text-xs text-slate-500'>Ton monstre le plus expérimenté</p>
        </div>

        {/* Dernière adoption */}
        <div className='sm:col-span-2 rounded-2xl bg-white/80 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-moccaccino-200/60'>
          <p className='text-xs font-semibold uppercase tracking-wide text-moccaccino-500'>Dernière adoption</p>
          <p className='mt-2 text-lg font-semibold text-slate-800'>{latestAdoptionLabel}</p>
          <p className='text-xs text-slate-500'>
            {stats.totalMonsters === 0
              ? 'Ton prochain compagnon est à un clic !'
              : 'Continue de créer pour agrandir ta bande.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardUserStats
