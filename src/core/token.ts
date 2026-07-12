/**
 * Estimates token count from string length.
 *
 * Approximation:
 * 1 token ≈ 4 characters (common for GPT models)
 *
 * @param text - Input string
 * @returns Estimated token count
 */
export function serializeForTokenEstimate(value: unknown): string {
  if (typeof value === "string") return value;

  const serialized = JSON.stringify(value);
  return serialized ?? "";
}

/**
 * Estimates tokens using a transparent four-characters-per-token heuristic.
 * JSON values are serialized first, matching the compact form normally sent
 * to an API. Use a model-specific tokenizer for billing-accurate counts.
 */
export function estimateTokens(value: unknown): number {
  return Math.ceil(serializeForTokenEstimate(value).length / 4);
}
