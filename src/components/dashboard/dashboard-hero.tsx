import Button from '../button'

/**
 * Props du composant DashboardHero
 */
interface DashboardHeroProps {
  /** Nom d'affichage de l'utilisateur */
  displayName: string
  /** Callback lors du clic sur "Créer une créature" */
  onCreateMonster: () => void
  /** Callback lors du clic sur "Se déconnecter" */
  onLogout: () => void
}

/**
 * Composant Hero du dashboard affichant le message de bienvenue et les actions principales
 *
 * Responsabilités :
 * - Afficher un message personnalisé de bienvenue
 * - Présenter les actions principales (créer, se déconnecter)
 * - Maintenir une interface visuelle cohérente et attrayante
 *
 * @example
 * <DashboardHero
 *   displayName="Jean"
 *   onCreateMonster={() => setModalOpen(true)}
 *   onLogout={handleLogout}
 * />
 */
function DashboardHero ({ displayName, onCreateMonster, onLogout }: DashboardHeroProps): React.ReactNode {
  return (
    <div className='max-w-xl space-y-6'>
      <div className='inline-flex items-center gap-3 rounded-full border border-moccaccino-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-moccaccino-500'>
        <span aria-hidden='true'>🌈</span>
        <span>Hey {displayName}</span>
      </div>

      <h1 className='text-4xl font-black text-slate-900 sm:text-5xl'>
        Bienvenue dans ton QG Tamagotcho
      </h1>

      <p className='text-base text-slate-600 sm:text-lg'>
        Dompte des créatures adorables, surveille leur humeur et transforme chaque journée en mini-aventure numérique.
      </p>

      <div className='flex flex-wrap items-center gap-3'>
        <Button size='lg' onClick={onCreateMonster}>
          Créer une créature
        </Button>
        <Button size='lg' variant='ghost' onClick={onLogout}>
          Se déconnecter
        </Button>
      </div>
    </div>
  )
}

export default DashboardHero
