import type { DashboardQuest } from '@/hooks/use-dashboard-quests'

/**
 * Props du composant DashboardQuests
 */
interface DashboardQuestsProps {
  /** Liste des quêtes à afficher */
  quests: DashboardQuest[]
}

/**
 * Composant affichant la liste des quêtes du jour
 *
 * Responsabilités :
 * - Afficher chaque quête avec son état de complétion
 * - Donner un feedback visuel clair (icône, couleur)
 * - Encourager l'utilisateur à progresser
 *
 * @example
 * <DashboardQuests quests={[
 *   { id: '1', label: 'Créer une créature', complete: true },
 *   { id: '2', label: 'Atteindre niveau 5', complete: false }
 * ]} />
 */
function DashboardQuests ({ quests }: DashboardQuestsProps): React.ReactNode {
  return (
    <div className='rounded-3xl bg-white/80 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.12)] ring-1 ring-white/60 backdrop-blur'>
      {/* En-tête */}
      <div className='flex items-center gap-3'>
        <span className='flex h-10 w-10 items-center justify-center rounded-full bg-lochinvar-100 text-2xl'>
          🪄
        </span>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.2em] text-lochinvar-500'>
            Quêtes du jour
          </p>
          <p className='text-base text-slate-600'>À toi de jouer !</p>
        </div>
      </div>

      {/* Liste des quêtes */}
      <ul className='mt-5 space-y-4'>
        {quests.map((quest) => (
          <li key={quest.id} className='flex items-start gap-3'>
            <span
              className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-lg ${
                quest.complete
                  ? 'bg-moccaccino-100 text-moccaccino-600'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {quest.complete ? '✨' : '•'}
            </span>
            <div>
              <p className='text-sm font-medium text-slate-800'>{quest.label}</p>
              <p className='text-xs text-slate-500'>
                {quest.complete
                  ? 'Mission accomplie !'
                  : 'Clique et amuse-toi pour valider.'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DashboardQuests
