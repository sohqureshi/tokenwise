import { prune } from "./prune";
import { compact } from "./compact";
import { flatten } from "./flatten";
import { toTOON } from "./toon";
import { estimateTokens } from "./token";

/**
 * Analyzes token savings after optimization
 * Compatible with your current core structure (April 2026)
 */
export function analyze(input: any, options: any = {}) {
  if (!input || (typeof input === "object" && input !== null && Object.keys(input).length === 0)) {
    return {
      originalTokens: 0,
      optimizedTokens: 0,
      savings: 0,
      savingsPercent: 0,
      optimizedData: null,
      reductionRatio: 1,
    };
  }

  // 1. Original tokens
  const originalTokens = estimateTokens(input);

  // 2. Optimization chain (using only existing functions)
  let optimizedData = input;

  if (options.prune && Array.isArray(options.prune)) {
    optimizedData = prune(optimizedData);           // Fixed: 1 argument only
  }

  if (options.compact) {
    optimizedData = compact(optimizedData);         // 1 argument
  }

  if (options.flatten) {
    optimizedData = flatten(optimizedData);         // 1 argument
  }

  // toTOON support (your existing toon.ts)
  if (options.toTOON === true || options.toon === true) {
    optimizedData = toTOON(optimizedData);
  }

  // 3. Optimized tokens
  const optimizedTokens = estimateTokens(optimizedData);

  // 4. Calculate savings safely (never negative)
  const savings = Math.max(0, originalTokens - optimizedTokens);

  const savingsPercent = originalTokens > 0
    ? Math.round((savings / originalTokens) * 100)
    : 0;

  const reductionRatio = originalTokens > 0 
    ? optimizedTokens / originalTokens 
    : 1;

  return {
    originalTokens,
    optimizedTokens,
    savings,
    savingsPercent,
    optimizedData,
    reductionRatio,
  };
}