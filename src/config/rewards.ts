export const REWARDS = {
  feed: 5,
  comfort: 5,
  hug: 5,
  wake: 5,
  levelUp: 20,
} as const

export type RewardAction = keyof typeof REWARDS
