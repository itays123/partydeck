/**
 * Custom data structure, optimized for a set of cards and players
 */
import { withNumericId } from '../../types.ts';
import { generate } from '../shared/NumericID.ts';
import { Queue } from './Queue.ts';

function addEntryToMap<T>(entry: T, map: Map<string, T>): string {
  const id = generate();
  if (map.has(id)) return addEntryToMap(entry, map);
  else {
    map.set(id, entry);
    return id;
  }
}

export class DeckBase<T = any> {
  // the use of two data structures will make the game more hack-prooved.
  // you won't be able to add more cards or players
  public queue: Queue<string>;
  public map: Map<string, T>;

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

  valueOf(id: string): T | null {
    return this.map.get(id) || null;
  }

  valuesOf(ids: string[]): T[] {
    const result: T[] = [];
    ids.forEach(id => {
      const value = this.valueOf(id);
      if (value) result.push(value);
    });
    return result;
  }

  format(id: string): withNumericId<T> | null {
    if (!this.map.has(id)) return null;
    const value = this.map.get(id)!;
    return { id, value };
  }

  formatMany(ids: string[]): withNumericId<T>[] {
    const result: withNumericId<T>[] = [];
    ids.forEach(id => {
      const formatted = this.format(id);
      if (formatted) result.push(formatted);
    });
    return result;
  }

  status() {
    return this.valuesOf(this.queue.toArray());
  }
}
