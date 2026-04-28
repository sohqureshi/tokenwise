import { prune } from "./prune";
import { compact } from "./compact";
import { flatten } from "./flatten";
import { toNatural } from "./toNatural";
import { estimateTokens } from "./estimateTokens";

/**
 * Analyzes the input data and returns detailed token savings
 * after applying the optimization chain.
 *
 * Key Fix: savings is now guaranteed to be >= 0
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

  // 2. Run the optimization chain (respecting options)
  let optimizedData = input;

  if (options.prune && Array.isArray(options.prune)) {
    optimizedData = prune(optimizedData, options.prune, options);
  }

  if (options.compact) {
    optimizedData = compact(optimizedData, options.compactOptions || {});
  }

  if (options.flatten) {
    optimizedData = flatten(optimizedData, options.flattenOptions || {});
  }

  if (options.toNatural) {
    optimizedData = toNatural(optimizedData, options.naturalOptions || {});
  }

  // 3. Calculate optimized tokens
  const optimizedTokens = estimateTokens(optimizedData, options);

  // 4. Calculate savings (Never negative)
  const savings = Math.max(0, originalTokens - optimizedTokens);

  // 5. Calculate savings percentage safely
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
    // Optional: useful for debugging
    // original: JSON.stringify(input),
    // optimized: JSON.stringify(optimizedData),
  };
}