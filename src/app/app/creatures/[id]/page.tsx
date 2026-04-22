import { getMonsterById } from '@/actions/monsters.actions'
import ErrorClient from '@/components/error-client'
import { CreaturePageClient } from '@/components/creature/creature-page-client'
import { getInventory } from '@/actions/accessories.actions'
import AccessorySelector from '@/components/accessories/accessory-selector'
import BackgroundSelector from '@/components/backgrounds/background-selector'
import { ACCESSORIES_CATALOG } from '@/config/accessories.config'
import { BACKGROUNDS_CATALOG } from '@/config/backgrounds.config'
import { connectMongooseToDatabase } from '@/db'
import Monster from '@/db/models/monster.model'
import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

/**
 * Page de détail d'une créature/monstre
 *
 * Cette page server-side récupère les informations d'un monstre spécifique
 * par son identifiant et affiche soit la page de détail, soit une erreur
 * si le monstre n'existe pas ou n'appartient pas à l'utilisateur.
 *
 * La protection de la route est gérée par le layout parent (src/app/app/layout.tsx).
 *
 * Responsabilité unique : récupérer les données du monstre et gérer
 * les cas d'erreur (monstre introuvable).
 *
 * @async
 * @param {Object} props - Props du composant
 * @param {Object} props.params - Paramètres de route dynamique
 * @param {string} props.params.id - Identifiant du monstre
 * @returns {Promise<React.ReactNode>} Page de détail ou page d'erreur
 *
 * @example
 * // Accès direct à la route
 * // GET /app/creatures/507f1f77bcf86cd799439011
 */
export default async function Page ({ params }: { params: Promise<{ id: string | string[] }> }): Promise<React.ReactNode> {
  // Résolution asynchrone des params (Next.js 15 fournit des params awaités)
  const resolved = await params
  // Extraction de l'ID depuis les paramètres de route
  const id = Array.isArray(resolved.id) ? resolved.id[0] : resolved.id

  // Récupération du monstre depuis la base de données
  const monster = await getMonsterById(id)

  // Gestion du cas où le monstre n'existe pas
  if (monster === null || monster === undefined) {
    return <ErrorClient error='Creature not found.' />
  }

  const inventory = await getInventory()

  // Server action inline pour toggle public/privé
  async function togglePublic () {
    'use server'
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return
    await connectMongooseToDatabase()
    await Monster.findOneAndUpdate(
      { _id: id, ownerId: session.user.id },
      { $set: { isPublic: !(monster?.isPublic ?? false) } }
    )
    revalidatePath(`/app/creatures/${id}`)
    revalidatePath('/app/gallery')
  }

  const equippedHat = monster.equippedAccessories?.hat ?? null
  const equippedGlasses = monster.equippedAccessories?.glasses ?? null
  const equippedShoes = monster.equippedAccessories?.shoes ?? null
  const equippedBg = monster.equippedBackground ?? null

  const hatItem = equippedHat ? ACCESSORIES_CATALOG.find(a => a.id === equippedHat) : null
  const glassesItem = equippedGlasses ? ACCESSORIES_CATALOG.find(a => a.id === equippedGlasses) : null
  const shoesItem = equippedShoes ? ACCESSORIES_CATALOG.find(a => a.id === equippedShoes) : null
  const bgItem = equippedBg ? BACKGROUNDS_CATALOG.find(b => b.id === equippedBg) : null

  return (
    <div>
      <CreaturePageClient monster={monster} />

      {/* Section Personnalisation */}
      <div className='max-w-4xl mx-auto px-4 pb-8'>
        {/* Aperçu accessoires équipés */}
        {(hatItem ?? glassesItem ?? shoesItem ?? bgItem) && (
          <div className='mb-4 bg-white rounded-2xl border-2 border-purple-100 p-4 flex items-center gap-3 flex-wrap'>
            <span className='font-bold text-gray-700 text-sm'>Équipé :</span>
            {bgItem && (
              <span className='flex items-center gap-1 text-sm bg-gray-100 rounded-lg px-2 py-1'>
                <span className='w-4 h-4 rounded-full inline-block' style={{ background: bgItem.cssValue }} />
                {bgItem.emoji} {bgItem.name}
              </span>
            )}
            {hatItem && <span className='text-sm bg-gray-100 rounded-lg px-2 py-1'>{hatItem.emoji} {hatItem.name}</span>}
            {glassesItem && <span className='text-sm bg-gray-100 rounded-lg px-2 py-1'>{glassesItem.emoji} {glassesItem.name}</span>}
            {shoesItem && <span className='text-sm bg-gray-100 rounded-lg px-2 py-1'>{shoesItem.emoji} {shoesItem.name}</span>}
          </div>
        )}

        {/* Toggle Public/Privé */}
        <div className='flex items-center justify-between bg-white rounded-2xl border-2 border-gray-100 p-4 mb-4'>
          <div>
            <p className='font-bold text-gray-800'>
              {monster.isPublic ? '🌐 Monstre public' : '🔒 Monstre privé'}
            </p>
            <p className='text-sm text-gray-500'>
              {monster.isPublic
                ? 'Visible dans la galerie communautaire'
                : 'Visible uniquement par toi'}
            </p>
          </div>
          <form action={togglePublic}>
            <button
              type='submit'
              className={`px-4 py-2 rounded-xl font-bold transition-all text-sm ${
                monster.isPublic
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {monster.isPublic ? '✓ Public' : 'Rendre public'}
            </button>
          </form>
        </div>

        {/* Sélecteurs d'équipement */}
        <div className='bg-white rounded-3xl border-2 border-purple-100 p-6'>
          <h3 className='text-xl font-black text-gray-800 mb-4'>🎨 Personnalisation</h3>
          <div className='flex flex-col gap-4'>
            <AccessorySelector
              monsterId={monster._id}
              category='hat'
              ownedAccessories={inventory?.accessories ?? []}
              equippedId={equippedHat}
            />
            <AccessorySelector
              monsterId={monster._id}
              category='glasses'
              ownedAccessories={inventory?.accessories ?? []}
              equippedId={equippedGlasses}
            />
            <AccessorySelector
              monsterId={monster._id}
              category='shoes'
              ownedAccessories={inventory?.accessories ?? []}
              equippedId={equippedShoes}
            />
            <BackgroundSelector
              monsterId={monster._id}
              ownedBackgrounds={inventory?.backgrounds ?? []}
              equippedId={equippedBg}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
