import type { BackgroundItem } from '@/types/accessories'

export const BACKGROUNDS_CATALOG: BackgroundItem[] = [
  { id: 'bg-sunset', name: 'Coucher de soleil', emoji: '🌅', price: 20, cssValue: 'linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)', type: 'gradient' },
  { id: 'bg-ocean', name: 'Océan profond', emoji: '🌊', price: 20, cssValue: 'linear-gradient(135deg, #0ea5e9, #0284c7, #075985)', type: 'gradient' },
  { id: 'bg-forest', name: 'Forêt enchantée', emoji: '🌲', price: 30, cssValue: 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)', type: 'gradient' },
  { id: 'bg-space', name: 'Galaxie', emoji: '🌌', price: 50, cssValue: 'linear-gradient(135deg, #1e1b4b, #4c1d95, #6d28d9)', type: 'gradient' },
  { id: 'bg-candy', name: 'Pays des bonbons', emoji: '🍭', price: 35, cssValue: 'linear-gradient(135deg, #fce7f3, #fbcfe8, #f9a8d4)', type: 'gradient' },
  { id: 'bg-fire', name: 'Feu ardent', emoji: '🔥', price: 40, cssValue: 'linear-gradient(135deg, #fef08a, #f97316, #dc2626)', type: 'gradient' },
  { id: 'bg-ice', name: 'Toundra glacée', emoji: '❄️', price: 35, cssValue: 'linear-gradient(135deg, #e0f2fe, #bae6fd, #7dd3fc)', type: 'gradient' },
  { id: 'bg-rainbow', name: 'Arc-en-ciel', emoji: '🌈', price: 80, cssValue: 'linear-gradient(135deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6)', type: 'gradient' },
]
