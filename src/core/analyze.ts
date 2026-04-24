import { toTOON } from "./toon";
import { estimateTokens } from "./token";

/**
 * Compares JSON vs TOON format efficiency.
 *
 * Provides:
 * - Raw size comparison
 * - Token estimation
 * - % savings
 *
 * @param data - Input JSON
 * @returns Analysis object
 *
 * Example:
 * analyze(data)
 * → { jsonTokens: 120, toonTokens: 70, savings: "42%" }
 */
export function analyze(data: any) {
  const json = JSON.stringify(data);
  const toon = toTOON(data);

  const jsonTokens = estimateTokens(json);
  const toonTokens = estimateTokens(toon);

  const savings = Math.round((1 - toonTokens / jsonTokens) * 100);

  return {
    jsonTokens,
    toonTokens,
    savings: `${savings}%`,
  };
}