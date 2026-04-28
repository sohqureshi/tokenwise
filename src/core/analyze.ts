import { prune } from "./prune";
import { compact } from "./compact";
import { flatten } from "./flatten";
import { toTOON } from "./toon";
import { estimateTokens } from "./token";

/**
 * Safe version of analyze() - Prevents NaN values
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
  let originalTokens = estimateTokens(input);
  if (isNaN(originalTokens) || !isFinite(originalTokens)) originalTokens = 0;

  // 2. Optimization chain
  let optimizedData = input;

  if (options.prune && Array.isArray(options.prune)) {
    optimizedData = prune(optimizedData);
  }

  if (options.compact) {
    optimizedData = compact(optimizedData);
  }

  if (options.flatten) {
    optimizedData = flatten(optimizedData);
  }

  if (options.toTOON === true || options.toon === true) {
    optimizedData = toTOON(optimizedData);
  }

  // 3. Optimized tokens
  let optimizedTokens = estimateTokens(optimizedData);
  if (isNaN(optimizedTokens) || !isFinite(optimizedTokens)) optimizedTokens = 0;

  // 4. Safe savings calculation
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