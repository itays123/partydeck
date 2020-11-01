import { generate } from '../shared/NumericID.ts';
import { UseHandler, withNumericId } from '../types.ts';

export abstract class BasePlayer {
  public id: string;
  public nickname: string;
  readonly currentCards: Map<string, string>;
  readonly cardsWon: Set<string>;
  private useHandler: UseHandler | null;

  constructor(nickname: string, initialCards: withNumericId<string>[]) {
    this.useHandler = null;
    this.nickname = nickname;
    this.cardsWon = new Set();
    this.id = generate();
    this.currentCards = new Map();
    for (let card of initialCards) {
      this.currentCards.set(card.id, card.value);
    }
  }

  public addToCardsWon(cardId: string) {
    this.cardsWon.add(cardId);
  }

  public on(event: 'use', handler: UseHandler): void;
  public on(...args: any) {
    const [event, handler] = args;
    if (event === 'use') this.useHandler = handler;
  }

  abstract broadcast(message: any): Promise<void>;

  public useCard(cardId: string) {
    if (this.useHandler) {
      const newCard = this.useHandler(cardId);
      this.currentCards.delete(cardId);
      this.currentCards.set(newCard.id, newCard.value);
    } else {
      throw new Error('no useHandler');
    }
  }
}
