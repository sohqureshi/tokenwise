import { toTOON } from "./toon";
import { estimateTokens } from "./token";

/**
 * Compares JSON vs TOON format efficiency.
 *
 * Provides:
 * - Raw size comparison
 * - Token estimation
 * - % savings
 *
 * @param data - Input JSON
 * @returns Analysis object
 *
 * Example:
 * analyze(data)
 * → { jsonTokens: 120, toonTokens: 70, savings: "42%" }
 */

function countTokens(input: any): number {
  const str = typeof input === 'string' ? input : JSON.stringify(input)
  return str.split(/\s+/).length
}

export function analyze(input: any) {
  const original = JSON.stringify(input)
  const optimized = toTOON(input)

  const originalTokens = countTokens(original)
  const optimizedTokens = countTokens(optimized)

  const savings = originalTokens - optimizedTokens

  return {
    originalTokens,
    optimizedTokens,
    savings
  }
}