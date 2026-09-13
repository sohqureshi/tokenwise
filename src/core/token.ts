import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

export interface TokenEstimateOptions {
  exact?: boolean;
  model?: string;
  fallbackToHeuristic?: boolean;
}

type TokenEncoder = {
  encode: (text: string) => { length: number };
  free?: () => void;
  name?: string;
};

type TiktokenModule = {
  encoding_for_model: (model: string) => TokenEncoder;
  model_to_encoding?: (model: string) => string;
};

export function serializeForTokenEstimate(value: unknown): string {
  if (typeof value === "string") return value;

  const serialized = JSON.stringify(value);
  return serialized ?? "";
}

function estimateTokensHeuristic(value: unknown): number {
  return Math.ceil(serializeForTokenEstimate(value).length / 4);
}

function expectedEncodingForModel(model: string): string {
  const normalizedModel = model.toLowerCase();

  if (
    normalizedModel.includes("gpt-4o") ||
    normalizedModel.includes("gpt-4.1") ||
    normalizedModel.includes("o1") ||
    normalizedModel.includes("o3") ||
    normalizedModel.includes("o4")
  ) {
    return "o200k_base";
  }

  if (
    normalizedModel.includes("davinci") ||
    normalizedModel.startsWith("text-") ||
    normalizedModel.includes("babbage") ||
    normalizedModel.includes("curie")
  ) {
    return "r50k_base";
  }

  return "cl100k_base";
}

export type TokenEstimateResult = {
  count: number;
  estimator: string;
};

export function estimateTokens(
  value: unknown,
  options: TokenEstimateOptions = {}
): number {
  return estimateTokensWithMeta(value, options).count;
}

/**
 * Returns an exact model tokenizer count by default. Set exact=false to use the
 * lightweight four-characters-per-token fallback explicitly.
 */
export function estimateTokensWithMeta(
  value: unknown,
  options: TokenEstimateOptions = {}
): TokenEstimateResult {
  const { exact = true, model = "gpt-4o-mini", fallbackToHeuristic = true } = options;
  const heuristic = estimateTokensHeuristic(value);
  const heuristicEstimator = "heuristic: 1 token ≈ 4 characters";

  if (!exact) {
    return { count: heuristic, estimator: heuristicEstimator };
  }

  try {
    const tiktoken = require("tiktoken") as TiktokenModule;
    const encoder = tiktoken.encoding_for_model(model);
    const count = encoder.encode(serializeForTokenEstimate(value)).length;
    let encodingName = encoder.name;

    if (!encodingName && typeof tiktoken.model_to_encoding === "function") {
      try {
        encodingName = tiktoken.model_to_encoding(model);
      } catch {
        encodingName = undefined;
      }
    }

    encodingName ??= expectedEncodingForModel(model);
    encoder.free?.();

    return {
      count,
      estimator: `exact tokenizer: model=${model} encoding=${encodingName}`,
    };
  } catch {
    const expectedEncoding = expectedEncodingForModel(model);

    if (!fallbackToHeuristic) {
      return {
        count: heuristic,
        estimator: `exact requested but tokenizer unavailable (expected encoding=${expectedEncoding} for model=${model})`,
      };
    }

    return {
      count: heuristic,
      estimator: `${heuristicEstimator} (model=${model} expected_encoding=${expectedEncoding})`,
    };
  }
}
