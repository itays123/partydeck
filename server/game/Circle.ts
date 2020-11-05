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

  format(id: string): withNumericId<T> | null {
    if (!this.map.has(id)) return null;
    const value = this.map.get(id)!;
    return { id, value };
  }

  circle() {
    const nodeId = this.queue.dequeue()!;
    const node = this.format(nodeId)!;
    this.queue.enqueue(nodeId);
    return node;
  }
}
