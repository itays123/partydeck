import { DeckBase } from './DeckBase.ts';

export class Circle<T = any> extends DeckBase<T> {
  constructor(array: T[]) {
    super(array);
  }

  circle() {
    const nodeId = this.queue.dequeue()!;
    const node = this.format(nodeId)!;
    this.queue.enqueue(nodeId);
    return node;
  }
}
