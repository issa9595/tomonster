/**
 * Table de tarification pour les packages de Koins
 *
 * Cette configuration est partagée entre le client et le serveur.
 * Elle définit les différents packages disponibles à l'achat.
 */

export interface PricingPackage {
  productId: string
  price: number
}

export const pricingTable: Record<number, PricingPackage> = {
  10: {
    productId: 'prod_UQiRW0I2n0iHEF',
    price: 0.5
  },
  50: {
    productId: 'prod_UQiRfZSGCSUUlc',
    price: 1
  },
  500: {
    productId: 'prod_UQiSRG0tDXF3dz',
    price: 2
  },
  1000: {
    productId: 'prod_UQiSd4lTDdG3QI',
    price: 3
  },
  5000: {
    productId: 'prod_UQiSz51OuSmLHn',
    price: 10
  }
}
