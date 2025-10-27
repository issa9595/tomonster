/**
 * Props du composant DashboardMoodTip
 */
interface DashboardMoodTipProps {
  /** Message personnalisé sur l'humeur des monstres */
  message: string
}

/**
 * Composant affichant une astuce contextuelle sur l'humeur des monstres
 *
 * Responsabilités :
 * - Afficher un conseil personnalisé basé sur les humeurs observées
 * - Encourager l'utilisateur à interagir avec ses monstres
 * - Maintenir une tonalité ludique et engageante
 *
 * @example
 * <DashboardMoodTip message="Aujourd'hui, ta bande est plutôt heureuse..." />
 */
function DashboardMoodTip ({ message }: DashboardMoodTipProps): React.ReactNode {
  return (
    <div className='rounded-3xl bg-gradient-to-br from-fuchsia-blue-100/90 via-white to-lochinvar-100/80 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.14)] ring-1 ring-white/60 backdrop-blur'>
      <p className='text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-blue-500'>
        Astuce mood
      </p>
      <p className='mt-3 text-base font-medium text-slate-800'>
        {message}
      </p>
      <p className='mt-2 text-xs text-slate-600'>
        Observe tes créatures pour débloquer toutes les humeurs et récolter des surprises.
      </p>
    </div>
  )
}

export default DashboardMoodTip
