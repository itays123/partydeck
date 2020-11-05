import { withNumericId } from '../types.ts';
import { Queue } from './Queue.ts';

export class Circle<T = any> {
  public queue: Queue<string>;
  public map: Map<string, T>;

  constructor() {
    this.queue = new Queue();
    this.map = new Map();
  }

  addEntry(id: string, value: T) {
    this.map.set(id, value);
    this.queue.enqueue(id);
  }

  valueOf(id: string) {
    return this.map.get(id) || null;
  }

  circle() {
    const nodeId = this.queue.dequeue()!;
    const node = this.valueOf(nodeId)!;
    this.queue.enqueue(nodeId);
    return node;
  }
}
