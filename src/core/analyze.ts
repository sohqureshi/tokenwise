import { estimateTokens } from "./token";

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