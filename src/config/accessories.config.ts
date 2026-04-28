import type { AccessoryItem, AccessoryRarity } from '@/types/accessories'

export const RARITY_COLORS: Record<AccessoryRarity, string> = {
  common: 'bg-gray-200 text-gray-700',
  rare: 'bg-blue-200 text-blue-700',
  epic: 'bg-purple-200 text-purple-700',
  legendary: 'bg-yellow-200 text-yellow-700',
}

export const RARITY_PRICES: Record<AccessoryRarity, number> = {
  common: 10,
  rare: 25,
  epic: 60,
  legendary: 150,
}

export const ACCESSORIES_CATALOG: AccessoryItem[] = [
  // Chapeaux
  { id: 'hat-cowboy', name: 'Chapeau de cowboy', emoji: '🤠', category: 'hat', rarity: 'common', price: 10 },
  { id: 'hat-crown', name: 'Couronne royale', emoji: '👑', category: 'hat', rarity: 'legendary', price: 150 },
  { id: 'hat-cap', name: 'Casquette', emoji: '🧢', category: 'hat', rarity: 'common', price: 10 },
  { id: 'hat-magic', name: 'Chapeau de magicien', emoji: '🎩', category: 'hat', rarity: 'rare', price: 25 },
  { id: 'hat-halo', name: 'Halo angélique', emoji: '😇', category: 'hat', rarity: 'epic', price: 60 },
  { id: 'hat-bunny', name: 'Oreilles de lapin', emoji: '🐰', category: 'hat', rarity: 'rare', price: 25 },
  // Lunettes
  { id: 'glasses-sun', name: 'Lunettes de soleil', emoji: '😎', category: 'glasses', rarity: 'common', price: 10 },
  { id: 'glasses-nerd', name: 'Lunettes rondes', emoji: '🤓', category: 'glasses', rarity: 'common', price: 10 },
  { id: 'glasses-heart', name: 'Lunettes en cœur', emoji: '😍', category: 'glasses', rarity: 'rare', price: 25 },
  { id: 'glasses-monocle', name: 'Monocle', emoji: '🧐', category: 'glasses', rarity: 'epic', price: 60 },
  { id: 'glasses-3d', name: 'Lunettes 3D', emoji: '🎬', category: 'glasses', rarity: 'rare', price: 25 },
  { id: 'glasses-dive', name: 'Lunettes de plongée', emoji: '🤿', category: 'glasses', rarity: 'epic', price: 60 },
  // Chaussures
  { id: 'shoes-sneakers', name: 'Baskets', emoji: '👟', category: 'shoes', rarity: 'common', price: 10 },
  { id: 'shoes-boots', name: 'Bottes de cowboy', emoji: '🥾', category: 'shoes', rarity: 'rare', price: 25 },
  { id: 'shoes-ballet', name: 'Chaussons de danse', emoji: '🩰', category: 'shoes', rarity: 'epic', price: 60 },
  { id: 'shoes-skates', name: 'Patins à roulettes', emoji: '🛼', category: 'shoes', rarity: 'rare', price: 25 },
  { id: 'shoes-rocket', name: 'Bottes spatiales', emoji: '🚀', category: 'shoes', rarity: 'legendary', price: 150 },
  { id: 'shoes-clown', name: 'Chaussures de clown', emoji: '🤡', category: 'shoes', rarity: 'common', price: 10 },
]
