import { generate } from '../shared/NumericID.ts';
import {
  DisconnectHandler,
  ReqHandler,
  UseHandler,
  withNumericId,
} from '../types.ts';

export abstract class BasePlayer {
  public id: string;
  public nickname: string;
  public isAdmin: boolean;
  public isJudge: boolean;
  readonly currentCards: Map<string, string>;
  readonly cardsWon: Set<string>;
  private useHandler: UseHandler | null;
  protected disconnectHandler: DisconnectHandler | null;
  protected startHandler: ReqHandler | null;
  protected stopHandler: ReqHandler | null;

  constructor(nickname: string, initialCards: withNumericId<string>[]) {
    this.useHandler = null;
    this.disconnectHandler = null;
    this.startHandler = null;
    this.stopHandler = null;
    this.nickname = nickname;
    this.cardsWon = new Set();
    this.id = generate();
    this.isAdmin = false;
    this.isJudge = false;
    this.currentCards = new Map();
    for (let card of initialCards) {
      this.currentCards.set(card.id, card.value);
    }
  }

  setAdmin() {
    this.isAdmin = true;
  }

  setJudge() {
    this.isJudge = true;
  }

  setPlayer() {
    this.isJudge = false;
  }

  public addToCardsWon(cardId: string) {
    this.cardsWon.add(cardId);
  }

  public on(event: 'use', handler: UseHandler): void;
  public on(event: 'disconnect', handler: DisconnectHandler): void;
  public on(event: 'start', handler: ReqHandler): void;
  public on(event: 'stop', handler: ReqHandler): void;
  public on(...args: any) {
    const [event, handler] = args;
    if (event === 'use') this.useHandler = handler;
    if (event === 'disconnect') this.disconnectHandler = handler;
    if (event === 'start') this.startHandler = handler;
    if (event === 'stop') this.stopHandler = handler;
  }

  abstract broadcast(message: any): Promise<void>;
  abstract closeConnection(): Promise<void>;

  public useCard(cardId: string) {
    if (this.useHandler) {
      if (this.currentCards.has(cardId)) {
        const newCard = this.useHandler(cardId, this.id);
        this.currentCards.delete(cardId);
        this.currentCards.set(newCard.id, newCard.value);
      } else {
        this.broadcast({ err: 'card not found', code: 404 });
      }
    } else {
      throw new Error('no useHandler');
    }
  }
}
