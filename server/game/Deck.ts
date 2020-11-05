import { generate } from '../shared/NumericID.ts';
import { withNumericId } from '../types.ts';
import { Queue } from './Queue.ts';

export class Deck<T = any> {
  public queue: Queue<string>;
  public map: Map<string, T>;

  addEntryToMap(value: T): string {
    const id = generate();
    if (this.map.has(id)) return this.addEntryToMap(value);
    this.map.set(id, value);
    return id;
  }

  constructor(array: T[]) {
    this.queue = new Queue();
    this.map = new Map();

    array.forEach(value => {
      const id = this.addEntryToMap(value);
      this.queue.enqueue(id);
    });

    this.queue.shuffle();
  }

  pickTopCard(): withNumericId<T> {
    const cardId = this.queue.dequeue()!;
    return this.format(cardId)!;
  }

  insertCardInBottom(cardId: string) {
    // to prevent hacking the deck of cards add only cards that exists in the map
    if (this.map.has(cardId)) {
      this.queue.enqueue(cardId);
    }
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
