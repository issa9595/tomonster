import Stripe from 'stripe'

// Stripe configuration (côté serveur uniquement)
// La clé peut être absente en build time — les routes Stripe vérifient elles-mêmes
export const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
      apiVersion: '2025-10-29.clover'
    })
  : null

// Export de la table de prix depuis le fichier de config
export { pricingTable } from '@/config/pricing'
