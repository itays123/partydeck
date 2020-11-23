import {
  EndHandler,
  PickedCard,
  PlayerFactory,
  RoundHandler,
  StartHandler,
  UseHandler,
  withNumericId,
} from '../types.ts';
import { BasePlayer } from '../player/BasePlayer.ts';
import { Circle } from './Circle.ts';
import { Deck } from './Deck.ts';
import { Timeout } from '../deps.ts';

export class Game<PlayerType extends BasePlayer> {
  // Player-related variables
  private players: Circle<PlayerType>;
  // add players to the game
  private createPlayer: PlayerFactory<PlayerType>;

  //card-related variables
  private questionDeck: Deck<string>;
  private answerDeck: Deck<string>;
  private roundCards: PickedCard[];
  private pickTimeout: number;

  // Game-related variables
  private numberOfRounds: number;
  private isStarted = false;
  private stopRequested = false;
  private roundDelay: number;
  private roundHandler: RoundHandler<PlayerType>;
  private startHandler: StartHandler<PlayerType>;
  private endHandler: EndHandler;

  public id: string;

  constructor(
    id: string,
    questions: string[],
    answers: string[],
    timeout = 30,
    delay = 5
  ) {
    this.id = id;
    this.players = new Circle();
    this.numberOfRounds = questions.length;
    this.questionDeck = new Deck(questions);
    this.answerDeck = new Deck(answers);
    this.roundCards = [];
    this.pickTimeout = timeout;
    this.roundDelay = delay;
    this.roundHandler = async () => ({ id: '', value: '', playerId: '' });
    this.startHandler = async () => {};
    this.endHandler = async () => {};
    this.createPlayer = () => null;
  }

  public on(event: 'round', handler: RoundHandler<PlayerType>): void;
  public on(event: 'start', handler: StartHandler<PlayerType>): void;
  public on(event: 'end', handler: EndHandler): void;
  public on(event: 'connection', handler: PlayerFactory<PlayerType>): void;
  public on(...args: any) {
    const [event, handler] = args;
    if (event === 'round') this.roundHandler = handler;
    if (event === 'start') this.startHandler = handler;
    if (event === 'end') this.endHandler = handler;
    if (event === 'connection') this.createPlayer = handler;
  }

  private handleCardUsage: UseHandler = (cardId: string, playerId: string) => {
    this.answerDeck.insertCardInBottom(cardId);
    this.roundCards.push({
      id: cardId,
      playerId,
      value: this.answerDeck.valueOf(cardId)!,
    });
    return this.answerDeck.pickTopCard()!;
  };

  private cyclePlayer(
    name: string,
    cards: withNumericId<string>[],
    args: any[]
  ): PlayerType {
    const player = this.createPlayer(name, cards, ...args);
    if (!player) throw new Error('no connection handler');
    if (this.players.has(player.id)) return this.cyclePlayer(name, cards, args);
    else {
      player.on('use', this.handleCardUsage);
      player.on('disconnect', () => {
        console.log(player.id, 'disconnected');
        this.players.removeEntry(player.id);
        this.notifyAll({ count: this.playerCount }, -1);
        if (player.isAdmin) {
          if (this.playerCount !== 0) this.players.peek()!.setAdmin();
          else if (!this.isStarted) this.endHandler();
        }
        if (this.isStarted && this.playerCount < 3) this.stop();
      });
      player.on('start', () => this.start());
      player.on('stop', () => this.stop());
      if (this.playerCount === 0) player.setAdmin();
      this.players.addEntry(player.id, player);
      this.notifyAll({ count: this.playerCount }, -1);
      return player;
    }
  }

  addPlayer(name: string, ...args: any[]): PlayerType | null {
    const cards = [];
    for (let i = 0; i < 4; i++) {
      let card = this.answerDeck.pickTopCard();
      if (card) cards.push(card);
    }
    if (cards.length === 4) return this.cyclePlayer(name, cards, args);
    else return null;
  }

  async notifyAll(message: any, round: number): Promise<void> {
    for (let player of this.players.values()) {
      let broadcasted = { ...message, round: round + 1 };
      await player.broadcast(broadcasted);
    }
  }

  private async waitUntilCardsPicked() {
    console.log('waiting for players...');
    let i = 0;
    while (i < this.pickTimeout) {
      if (this.roundCards.length >= this.playerCount - 1) break;
      const timeout = Timeout.wait(1000);
      await timeout;
      i++;
    }
  }

  async start(): Promise<PlayerType[]> {
    this.isStarted = true;
    if (this.players.size < 3) return [];

    this.startHandler(this.players.map);
    this.notifyAll({ dispatched: 'start' }, 0);
    await Timeout.wait(this.roundDelay * 1000);

    for (let i = 0; i < this.numberOfRounds; i++) {
      if (this.stopRequested) break;
      this.roundCards = [];
      const judge = this.players.circle();
      judge.setJudge();
      const question = this.questionDeck.pickTopCard()!;
      await this.notifyAll({ q: question.value, j: judge.nickname }, i);
      await this.waitUntilCardsPicked();
      await this.notifyAll({ pick: this.roundCards }, i);
      const winnerCard = await this.roundHandler(
        this.roundCards,
        judge,
        this.players.map
      );
      if (winnerCard) {
        const winner = this.players.map.get(winnerCard.playerId)!;
        winner.cardsWon.add(question.id);
        await this.notifyAll(
          { playerWon: winner.nickname, winningCard: winnerCard.value },
          i
        );
      } else {
        await this.notifyAll({ playerWon: 'nobody' }, i);
      }
      judge.setPlayer();
      await Timeout.wait(this.roundDelay * 1000);
    }

    const scores = this.scores;

    for (const [, player] of this.players.map) {
      await player.closeConnection();
    }

    this.endHandler();
    return scores;
  }

  stop() {
    this.stopRequested = true;
  }

  get scores() {
    const result: PlayerType[] = [];
    for (const player of this.players.values()) {
      result.push(player);
    }
    return result.sort((a, b) => b.cardsWon.size - a.cardsWon.size);
  }

  get playerCount() {
    return this.players.size;
  }
}
