import { getWallet } from '@/actions/wallet.actions'
import WalletClient from '@/components/wallet/wallet-client'
import { getInventory } from '@/actions/accessories.actions'
import lazyImport from 'next/dynamic'

export const dynamic = 'force-dynamic'

const AccessoriesShopSection = lazyImport(
  () => import('@/components/shop/accessories-shop-section'),
  { loading: () => <div className='animate-pulse bg-gray-100 rounded-3xl h-64' /> }
)
const BackgroundsShopSection = lazyImport(
  () => import('@/components/shop/backgrounds-shop-section'),
  { loading: () => <div className='animate-pulse bg-gray-100 rounded-3xl h-48' /> }
)

/**
 * Page dédiée au Wallet (Portefeuille de Koins)
 *
 * Cette page affiche le portefeuille virtuel de l'utilisateur
 * contenant sa monnaie (Koins).
 *
 * La protection de la route est gérée par le layout parent (src/app/app/layout.tsx).
 *
 * Fonctionnalités :
 * - Récupération du wallet de l'utilisateur
 * - Affichage du solde et des boutons de gestion
 * - Animations lors des transactions
 *
 * @returns {Promise<React.ReactNode>} La page du wallet
 */
export default async function WalletPage (): Promise<React.ReactNode> {
  // Récupération du wallet de l'utilisateur
  let wallet
  try {
    wallet = await getWallet()
  } catch (error) {
    console.error('Error loading wallet:', error)
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'>
        <div className='bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center'>
          <div className='text-6xl mb-4'>😢</div>
          <h1 className='text-2xl font-bold text-gray-800 mb-2'>
            Erreur de chargement
          </h1>
          <p className='text-gray-600'>
            Impossible de charger votre wallet. Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    )
  }

  const inventory = await getInventory()

  return (
    <div>
      <WalletClient initialWallet={wallet} />
      <div className='max-w-4xl mx-auto px-4 pb-8 flex flex-col gap-6'>
        <AccessoriesShopSection ownedAccessories={inventory?.accessories ?? []} />
        <BackgroundsShopSection ownedBackgrounds={inventory?.backgrounds ?? []} />
      </div>
    </div>
  )
}
