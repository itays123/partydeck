import { Queue } from '../shared/Queue.ts';

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

  removeEntry(id: string) {
    this.map.delete(id);
  }

  valueOf(id: string) {
    return this.map.get(id) || null;
  }

  has(id: string) {
    return this.map.has(id);
  }

  values() {
    return this.map.values();
  }

  circle(): T {
    const nodeId = this.queue.dequeue()!;
    if (this.has(nodeId)) {
      const node = this.valueOf(nodeId)!;
      this.queue.enqueue(nodeId);
      return node;
    } else return this.circle();
  }

  get size() {
    return this.map.size;
  }
}
