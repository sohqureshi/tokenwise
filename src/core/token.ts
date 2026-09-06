/**
 * Estimates token count from string length.
 *
 * Approximation:
 * 1 token ≈ 4 characters (common for GPT models)
 *
 * @param text - Input string
 * @returns Estimated token count
 */
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export interface TokenEstimateOptions {
  exact?: boolean;
  model?: string;
  fallbackToHeuristic?: boolean;
}

export function serializeForTokenEstimate(value: unknown): string {
  if (typeof value === "string") return value;

  const serialized = JSON.stringify(value);
  return serialized ?? "";
}

function estimateTokensHeuristic(value: unknown): number {
  return Math.ceil(serializeForTokenEstimate(value).length / 4);
}

function estimateTokensExact(value: unknown, model: string): number | null {
  try {
    const tiktoken = require("tiktoken");
    const encoder = tiktoken.encoding_for_model(model);
    const text = serializeForTokenEstimate(value);
    return encoder.encode(text).length;
  } catch (error) {
    return null;
  }
}

/**
 * Estimates tokens using a transparent four-characters-per-token heuristic.
 * JSON values are serialized first, matching the compact form normally sent
 * to an API. Set exact=true to attempt a model-specific tokenizer count when
 * the runtime has the tokenizer installed.
 */
export function estimateTokens(
  value: unknown,
  options: TokenEstimateOptions = {}
): number {
  const { exact = false, model = "gpt-4o-mini", fallbackToHeuristic = true } = options;

  if (exact) {
    const exactCount = estimateTokensExact(value, model);
    if (exactCount !== null) return exactCount;
    if (!fallbackToHeuristic) {
      return estimateTokensHeuristic(value);
    }
  }

  return estimateTokensHeuristic(value);
}
