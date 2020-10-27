import { DeckBase } from './DeckBase.ts';

export class Deck<T = any> extends DeckBase<T> {
  constructor(array: T[]) {
    super(array);
  }

  pickTopCard(): { id: number; value: T } {
    const cardId = this.queue.dequeue()!;
    return this.format(cardId)!;
  }

  insertCardInBottom(cardId: number) {
    // to prevent hacking the deck of cards add only cards that exists in the map
    if (this.map.has(cardId)) {
      this.queue.enqueue(cardId);
    }
  }
}
