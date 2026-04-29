// ===============================
// Tokenwise - Public Entry Point
// ===============================

import { AIChain } from "./chain";
import { prune } from "./core/prune";
import { compact } from "./core/compact";
import { toTOON } from "./core/toon";
import { analyze } from "./core/analyze";
import { toNatural } from "./core/natural";

// callable function (main entry)
function ai(data: any) {
  return new AIChain(data);
}

// attach utilities (optional but powerful)
ai.prune = prune;
ai.compact = compact;
ai.toTOON = toTOON;
ai.analyze = analyze;
ai.toNatural = toNatural;
ai.AIChain = AIChain;

export default ai;
export { AIChain, prune, compact, toTOON, analyze, toNatural };