import { prune } from "./core/prune";
import { compact } from "./core/compact";

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

  value() {
    return this.data;
  }
}
