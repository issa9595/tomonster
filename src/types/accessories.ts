export type AccessoryCategory = 'hat' | 'glasses' | 'shoes'
export type AccessoryRarity = 'common' | 'rare' | 'epic' | 'legendary'

export interface AccessoryItem {
  id: string
  name: string
  emoji: string
  category: AccessoryCategory
  rarity: AccessoryRarity
  price: number
}

export interface BackgroundItem {
  id: string
  name: string
  emoji: string
  price: number
  cssValue: string
  type: 'gradient' | 'pattern'
}

export interface EquippedAccessories {
  hat: string | null
  glasses: string | null
  shoes: string | null
}

export interface DBInventory {
  _id: string
  ownerId: string
  accessories: string[]
  backgrounds: string[]
  createdAt: Date
  updatedAt: Date
}
