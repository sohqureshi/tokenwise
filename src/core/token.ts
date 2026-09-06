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
export type TokenEstimateResult = {
  count: number;
  estimator: string; // human-readable estimator metadata (encoding/model or heuristic)
};

export function estimateTokens(
  value: unknown,
  options: TokenEstimateOptions = {}
): number {
  return estimateTokensWithMeta(value, options).count;
}

/**
 * Returns both a token count and an estimator string describing how the count was
 * obtained (exact tokenizer + encoding when available, or heuristic otherwise).
 */
export function estimateTokensWithMeta(
  value: unknown,
  options: TokenEstimateOptions = {}
): TokenEstimateResult {
  const { exact = false, model = "gpt-4o-mini", fallbackToHeuristic = true } = options;

  // Heuristic result
  const heuristic = estimateTokensHeuristic(value);
  const heuristicEstimator = "heuristic: 1 token ≈ 4 characters";

  if (!exact) {
    return { count: heuristic, estimator: heuristicEstimator };
  }

  // Try exact tokenizer via tiktoken; gracefully fall back to heuristic if anything fails
  try {
    const tiktoken = require("tiktoken");
    // Try to get an encoder for the model; encoding_for_model will throw if unsupported
    const encoder = tiktoken.encoding_for_model(model);
    const text = serializeForTokenEstimate(value);
    const count = encoder.encode(text).length;

    // Attempt to infer an encoding name for display. Some tiktoken builds expose the
    // encoding name on the encoder; try common properties, otherwise fall back to
    // a conservative mapping based on model name.
    let encodingName: string | null = null;
    if ((encoder as any).name) encodingName = (encoder as any).name;
    if (!encodingName && typeof (tiktoken as any).model_to_encoding === 'function') {
      try {
        encodingName = (tiktoken as any).model_to_encoding(model);
      } catch (e) {
        encodingName = null;
      }
    }

    if (!encodingName) {
      const m = String(model || '').toLowerCase();
      if (m.includes('davinci') || m.startsWith('text-')) encodingName = 'r50k_base';
      else encodingName = 'cl100k_base';
    }

    const estimator = `exact tokenizer: model=${model} encoding=${encodingName}`;
    return { count, estimator };
  } catch (e) {
    // tiktoken not available or failed — prepare a helpful estimator string that still
    // reports the model and the expected encoding. Return heuristic count but expose
    // the expected encoding so the demo can show the selected tokenizer metadata.
    const m = String(model || '').toLowerCase();
    const expectedEncoding = (m.includes('davinci') || m.startsWith('text-')) ? 'r50k_base' : 'cl100k_base';

    if (!fallbackToHeuristic) {
      // If caller requested exact and no fallback, indicate tokenizer unavailable but
      // include expected encoding for clarity.
      return { count: heuristic, estimator: `exact requested but tokenizer unavailable (expected encoding=${expectedEncoding} for model=${model})` };
    }

    // Fallback with informative estimator
    const fallbackEstimator = `heuristic: 1 token ≈ 4 characters (model=${model} expected_encoding=${expectedEncoding})`;
    return { count: heuristic, estimator: fallbackEstimator };
  }
}
