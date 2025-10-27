import { getMonsterById } from '@/actions/monsters.actions'
import ErrorClient from '@/components/error.clients'
import { MonsterInteraction } from '@/components/monsters/monster-interaction'
import { MonsterInfo } from '@/components/monsters/monster-info'

/**
 * Page de détail d'une créature/monstre
 *
 * Responsabilités :
 * - Récupérer les données du monstre depuis la base de données
 * - Afficher les informations détaillées du monstre
 * - Permettre l'interaction avec le monstre (nourrir, cajoler, etc.)
 * - Gérer les cas d'erreur (monstre non trouvé)
 *
 * Route dynamique :
 * - Accessible via /creature/[id] où [id] est l'identifiant MongoDB du monstre
 * - Utilise un catch-all route [...id] pour plus de flexibilité
 *
 * @param params - Paramètres de route contenant l'id du monstre
 * @returns Page détaillée du monstre ou page d'erreur
 */
export default async function CreaturePage ({ params }: { params: { id: string } }): Promise<React.ReactNode> {
  // Extraction de l'ID depuis les paramètres de route
  const { id } = await params

  // Récupération du monstre depuis la base de données
  const monster = await getMonsterById(id)

  // Gestion du cas où le monstre n'existe pas
  if (monster === null || monster === undefined) {
    return <ErrorClient error='Creature not found.' />
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-moccaccino-50 via-lochinvar-50 to-fuchsia-blue-50'>
      {/* En-tête avec navigation */}
      <div className='bg-white/80 backdrop-blur-sm border-b border-moccaccino-200 sticky top-0 z-10'>
        <div className='max-w-7xl mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='text-3xl'>🐾</span>
              <h1 className='text-2xl font-bold text-moccaccino-800'>ToMonster</h1>
            </div>
            <a
              href='/dashboard'
              className='bg-gradient-to-r from-moccaccino-500 to-fuchsia-blue-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105'
            >
              ← Retour au tableau de bord
            </a>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-start'>
          {/* Monstre animé avec interactions */}
          <MonsterInteraction monster={monster} />

          {/* Informations du monstre */}
          <div className='lg:sticky lg:top-24'>
            <MonsterInfo monster={monster} />
          </div>
        </div>
      </div>

      {/* Pied de page */}
      <div className='bg-moccaccino-800 text-white py-8 mt-16'>
        <div className='max-w-7xl mx-auto px-4 text-center'>
          <p className='text-moccaccino-200'>
            🐾 Prenez soin de votre monstre et regardez-le grandir ! 🐾
          </p>
        </div>
      </div>
    </div>
  )
}
