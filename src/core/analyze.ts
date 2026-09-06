import { prune } from "./prune";
import { compact } from "./compact";
import { flatten } from "./flatten";
import { toTOON } from "./toon";
import { estimateTokens, serializeForTokenEstimate } from "./token";

/**
 * Safe version of analyze() - Prevents NaN values
 */
export type AnalyzeOptions = {
  prune?: string[];
  compact?: boolean;
  flatten?: boolean;
  toTOON?: boolean;
  toon?: boolean;
  exact?: boolean;
  model?: string;
  fallbackToHeuristic?: boolean;
};

export function analyze(input: unknown, options: AnalyzeOptions = {}) {
  const {
    exact = false,
    model = "gpt-4o-mini",
    fallbackToHeuristic = true,
  } = options;

  if (!input || (typeof input === "object" && input !== null && Object.keys(input).length === 0)) {
    return {
      originalTokens: 0,
      optimizedTokens: 0,
      savings: 0,
      savingsPercent: 0,
      optimizedData: null,
      reductionRatio: 1,
      originalCharacters: 0,
      optimizedCharacters: 0,
      estimator: exact ? `exact tokenizer: model=${model}` : "heuristic: 1 token ≈ 4 characters",
    };
  }

  // 1. Original tokens
  const originalTokens = estimateTokens(input, {
    exact,
    model,
    fallbackToHeuristic,
  });

  // 2. Optimization chain
  let optimizedData: unknown = input;

  if (options.prune && Array.isArray(options.prune)) {
    optimizedData = prune(optimizedData, options.prune);
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
  const optimizedTokens = estimateTokens(optimizedData, {
    exact,
    model,
    fallbackToHeuristic,
  });

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
    originalCharacters: serializeForTokenEstimate(input).length,
    optimizedCharacters: serializeForTokenEstimate(optimizedData).length,
    estimator: exact ? `exact tokenizer: model=${model}` : "heuristic: 1 token ≈ 4 characters",
  };
}
