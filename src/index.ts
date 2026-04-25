// ===============================
// Tokenwise - Public Entry Point
// ===============================

import { AIChain } from './chain'
// -------- Core APIs --------
export { prune } from './core/prune'
export { compact } from './core/compact'
export { flatten } from './core/flatten'
export { analyze } from './core/analyze'
export { toTOON } from './core/toon'
export { AIChain }

// ✅ default export
export default {
  AIChain,
  prune,
  compact,
  flatten,
  analyze,
  toTOON
}