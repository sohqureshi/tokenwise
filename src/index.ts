// ===============================
// Tokenwise - Public Entry Point
// ===============================

import { AIChain } from "./chain";
import { prune } from "./core/prune";
import { compact } from "./core/compact";
import { flatten } from "./core/flatten";
import { toTOON } from "./core/toon";
import { analyze } from "./core/analyze";
import { toNatural } from "./core/natural";
import { estimateTokens } from "./core/token";

// callable function (main entry)
function ai(data: any) {
  return new AIChain(data);
}

// attach utilities (optional but powerful)
ai.prune = prune;
ai.compact = compact;
ai.flatten = flatten;
ai.toTOON = toTOON;
ai.analyze = analyze;
ai.toNatural = toNatural;
ai.estimateTokens = estimateTokens;
ai.AIChain = AIChain;

export default ai;
export { AIChain, prune, compact, flatten, toTOON, analyze, toNatural, estimateTokens };
