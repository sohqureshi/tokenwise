import { prune } from "./prune";
import { compact } from "./compact";
import { flatten } from "./flatten";
import { toTOON } from "./toon";
import { estimateTokens, estimateTokensWithMeta, serializeForTokenEstimate } from "./token";

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
    exact = true,
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

  // 1. Original tokens (try to get exact estimator metadata)
  const originalMeta = estimateTokensWithMeta(input, {
    exact,
    model,
    fallbackToHeuristic,
  });
  const originalTokens = originalMeta.count;

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

  // 3. Optimized tokens (also try to get estimator metadata)
  const optimizedMeta = estimateTokensWithMeta(optimizedData, {
    exact,
    model,
    fallbackToHeuristic,
  });
  const optimizedTokens = optimizedMeta.count;

  // 4. Safe savings calculation
  const savings = Math.max(0, originalTokens - optimizedTokens);

  const savingsPercent = originalTokens > 0
    ? Math.round((savings / originalTokens) * 100)
    : 0;

  const reductionRatio = originalTokens > 0 
    ? optimizedTokens / originalTokens 
    : 1;

  // Prefer the original estimator metadata if present, otherwise fall back to the optimized one
  const estimatorLabel = originalMeta && originalMeta.estimator ? originalMeta.estimator : optimizedMeta.estimator;

  return {
    originalTokens,
    optimizedTokens,
    savings,
    savingsPercent,
    optimizedData,
    reductionRatio,
    originalCharacters: serializeForTokenEstimate(input).length,
    optimizedCharacters: serializeForTokenEstimate(optimizedData).length,
    estimator: estimatorLabel,
  };
}
