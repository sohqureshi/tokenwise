import { prune } from "./prune";
import { compact } from "./compact";
import { flatten } from "./flatten";
import { toTOON } from "./toon";
import { estimateTokens } from "./token";

/**
 * Analyzes token usage and savings after applying optimization steps.
 * Fixed version - compatible with your current core folder structure.
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

  // 1. Calculate original tokens
  const originalTokens = estimateTokens(input, options);

  // 2. Run optimization chain (only using existing modules)
  let optimizedData = input;

  if (options.prune && Array.isArray(options.prune)) {
    optimizedData = prune(optimizedData, options.prune);           // Fixed: removed 3rd argument
  }

  if (options.compact) {
    optimizedData = compact(optimizedData);
  }

  if (options.flatten) {
    optimizedData = flatten(optimizedData);
  }

  // Note: toNatural is not available in your core folder, so skipping it for now
  // You can add it later when you create toNatural.ts

  // 3. Apply toTOON (your existing toon.ts)
  if (options.toTOON === true || options.toon === true) {
    optimizedData = toTOON(optimizedData);
  }

  // 4. Calculate optimized tokens
  const optimizedTokens = estimateTokens(optimizedData, options);

  // 5. Calculate savings (never negative)
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