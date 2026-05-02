import { prune } from './prune'

export function compact(obj: any): string {
  // Step 1: Remove null/undefined/empty
  const pruned = prune(obj)

  // Step 2: Convert to minified JSON
  return JSON.stringify(pruned) ?? ""
}
