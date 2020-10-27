/**
 * Custom data structure, optimized for a set of cards and players
 */
import { generate } from '../NumericID.ts';
import { Queue } from './Queue.ts';

function addEntryToMap<T>(entry: T, map: Map<number, T>): number {
  const id = generate();
  if (map.has(id)) return addEntryToMap(entry, map);
  else {
    map.set(id, entry);
    return id;
  }
}

export class DeckBase<T = any> {
  private queue: Queue<number>;
  private map: Map<number, T>;

  constructor(array: T[]) {
    this.map = new Map();
    this.queue = new Queue();

    // fill the map and the queue
    array.forEach(value => {
      const id = addEntryToMap(value, this.map);
      this.queue.enqueue(id);
    });

    // shuffle set
    this.queue.shuffle();
  }
}
