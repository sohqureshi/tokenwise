/**
 * Estimates token count from string length.
 *
 * Approximation:
 * 1 token ≈ 4 characters (common for GPT models)
 *
 * @param text - Input string
 * @returns Estimated token count
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;

  return Math.ceil(text.length / 4);
}