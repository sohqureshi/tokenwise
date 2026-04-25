import { prune } from './core/prune'
import { flatten } from './core/flatten'
import { compact } from './core/compact'
import { analyze } from './core/analyze'

export function chain(input: any) {
  let data = input

  return {
    /**
     * Remove null, undefined, and empty values
     */
    prune() {
      data = prune(data)
      return this
    },

    /**
     * Flatten nested objects into dot notation
     */
    flatten() {
      data = flatten(data)
      return this
    },

    /**
     * Compact JSON into minimal string
     */
    compact() {
      data = compact(data)
      return this
    },

    /**
     * Analyze token usage
     */
    analyze() {
      return analyze(data)
    },

    /**
     * Get final value
     */
    value() {
      return data
    }
  }
}

