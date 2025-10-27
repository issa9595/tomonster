/**
 * Fusionne plusieurs classes CSS en une seule chaîne, en filtrant les valeurs undefined
 *
 * @param values - Tableau de classes CSS (certaines peuvent être undefined)
 * @returns Chaîne unique de classes CSS séparées par des espaces
 *
 * @example
 * mergeClasses('btn', 'btn-primary', undefined, 'mt-4') // "btn btn-primary mt-4"
 */
export function mergeClasses (...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(' ')
}
