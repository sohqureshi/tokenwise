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
export function flatten(obj: any, prefix = '', res: Record<string, unknown> = {}) {
  if (obj === null || obj === undefined) return res

  if (typeof obj !== 'object') {
    setValue(res, prefix, obj)
    return res
  }

  for (const key of Object.keys(obj)) {
    const value = obj[key]
    const newKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'object' && value !== null) {
      flatten(value, newKey, res)
    } else {
      setValue(res, newKey, value)
    }
  }

  return res
}

function setValue(res: Record<string, unknown>, key: string, value: unknown) {
  if (Object.prototype.hasOwnProperty.call(res, key)) {
    throw new Error(
      `Cannot flatten input: the path "${key}" collides with an existing key. ` +
      "Use keys without dots or rename one of the conflicting properties."
    )
  }

  res[key] = value
}
