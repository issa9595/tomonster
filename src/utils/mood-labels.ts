/**
 * Dictionnaire des libellés français pour chaque humeur de monstre
 */
export const MOOD_LABELS: Record<string, string> = {
  happy: 'Heureux',
  sad: 'Triste',
  angry: 'Fâché',
  hungry: 'Affamé',
  sleepy: 'Somnolent'
}

/**
 * Obtient le libellé français d'une humeur
 *
 * @param mood - Clé de l'humeur (ex: 'happy', 'sad')
 * @returns Libellé en français ou la clé originale si non trouvée
 *
 * @example
 * getMoodLabel('happy') // 'Heureux'
 * getMoodLabel('unknown') // 'unknown'
 */
export function getMoodLabel (mood: string): string {
  return MOOD_LABELS[mood] ?? mood
}

/**
 * Génère un message contextuel basé sur l'humeur favorite et le nombre de monstres
 *
 * @param favoriteMoodLabel - Libellé de l'humeur favorite (en français)
 * @param totalMonsters - Nombre total de monstres
 * @returns Message personnalisé pour l'utilisateur
 *
 * @example
 * generateMoodMessage('Heureux', 5) // "Aujourd'hui, ta bande est plutôt heureux..."
 * generateMoodMessage(null, 0) // "Pas encore de vibe détectée..."
 */
export function generateMoodMessage (
  favoriteMoodLabel: string | null,
  totalMonsters: number
): string {
  if (totalMonsters === 0) {
    return 'Pas encore de vibe détectée. Crée ton premier monstre pour lancer la fête !'
  }

  if (favoriteMoodLabel === null) {
    return 'Tes créatures attendent encore de montrer leur humeur préférée. Essaie de les cajoler ou de leur donner un snack !'
  }

  return `Aujourd'hui, ta bande est plutôt ${favoriteMoodLabel.toLowerCase()}. Prévois une activité assortie pour maintenir la bonne humeur !`
}

/**
 * Formate une date d'adoption au format français
 *
 * @param latestAdoption - Date de la dernière adoption ou null
 * @returns Chaîne formatée ou message d'encouragement
 *
 * @example
 * formatAdoptionDate(new Date('2025-10-27')) // "27 octobre 2025"
 * formatAdoptionDate(null) // "À toi de créer ton premier compagnon ✨"
 */
export function formatAdoptionDate (latestAdoption: Date | null): string {
  if (latestAdoption === null) {
    return 'À toi de créer ton premier compagnon ✨'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(latestAdoption)
}
