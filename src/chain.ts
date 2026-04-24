import { prune } from "./core/prune";
import { compact } from "./core/compact";
import { toTOON } from "./core/toon";
import { analyze } from "./core/analyze";

export class AIChain {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  prune(keys: string[]) {
    this.data = prune(this.data, keys);
    return this;
  }

  compact() {
    this.data = compact(this.data);
    return this;
  }

  toTOON() {
    this.data = toTOON(this.data);
    return this;
  }

  analyze() {
    return analyze(this.data);
  }

  value() {
    return this.data;
  }
}
