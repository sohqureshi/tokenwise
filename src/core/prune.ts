export function prune(obj: any): any {
  if (obj === null || obj === undefined) return undefined

  if (Array.isArray(obj)) {
    return obj
      .map(prune)
      .filter((v) => v !== undefined)
  }

  if (typeof obj !== 'object') return obj

  const res: any = {}

  for (const k in obj) {
    const value = prune(obj[k])

    if (
      value === undefined ||
      (typeof value === 'object' &&
        !Array.isArray(value) &&
        Object.keys(value).length === 0)
    ) {
      continue
    }

    res[k] = value
  }

  return res
}