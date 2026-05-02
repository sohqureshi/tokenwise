/**
 * Flattens nested JSON into an object with dot-notation keys.
 *
 * Useful for:
 * - Search indexing
 * - AI prompt simplification
 *
 * @param obj - Input object
 * @param prefix - Used internally for recursion
 * @returns Object with dot-notation keys
 *
 * Example:
 * flatten({ user: { name: "Ali" } })
 * -> { "user.name": "Ali" }
 */
export function flatten(obj: any, prefix = '', res: any = {}) {
  if (obj === null || obj === undefined) return res

  if (typeof obj !== 'object') {
    res[prefix] = obj
    return res
  }

  for (const key in obj) {
    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'object' && value !== null) {
      flatten(value, newKey, res)
    } else {
      res[newKey] = value
    }
  }

  return res
}
