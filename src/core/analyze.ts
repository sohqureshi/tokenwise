import { toTOON } from "./toon";

export function analyze(data: any) {
  const json = JSON.stringify(data);
  const toon = toTOON(data);

  const jsonSize = json.length;
  const toonSize = toon.length;

  const savings = Math.round((1 - toonSize / jsonSize) * 100);

  return {
    jsonSize,
    toonSize,
    savings: `${savings}%`,
  };
}