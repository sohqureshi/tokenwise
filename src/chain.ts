import { prune } from './core/prune'
import { flatten } from './core/flatten'
import { compact } from './core/compact'
import { analyze } from './core/analyze'
import { toToon } from './core/toon'


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