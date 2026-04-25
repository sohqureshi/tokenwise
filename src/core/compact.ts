import { prune } from './prune'
import { flatten } from './flatten'

export function compact(obj: any): string {
  // Step 1: Remove null/undefined/empty
  const pruned = prune(obj)

  // Step 2: Flatten structure
  const flat = flatten(pruned)

  // Step 3: Convert to compact string
  return Object.entries(flat)
    .map(([k, v]) => `${k}=${v}`)
    .join('|')
}