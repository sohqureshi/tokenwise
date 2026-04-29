import { prune } from './core/prune'
import { flatten } from './core/flatten'
import { compact } from './core/compact'
import { analyze } from './core/analyze'
import { toTOON } from "./core/toon";
import { toNatural } from "./core/natural";


export class AIChain {
  private data: any;

  constructor(data: any) {
    this.data = data;
  }

  prune(options?: any) {
    this.data = prune(this.data, options);
    return this;
  }

  compact() {
    this.data = compact(this.data);
    return this;
  }

  flatten() {
    this.data = flatten(this.data);
    return this;
  }

  toTOON() {
    this.data = toTOON(this.data);
    return this;
  }

  toNatural() {
    return toNatural(this.data);
  }

  analyze() {
    return analyze(this.data);
  }

  value() {
    return this.data;
  }
}