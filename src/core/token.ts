export function estimateTokens(text: string): number {
  if (!text) return 0;

  // Simple approximation: 1 token ≈ 4 chars
  return Math.ceil(text.length / 4);
}