import {
  EndHandler,
  PlayerFactory,
  RoundHandler,
  StartHandler,
  withNumericId,
} from '../types.ts';
import { BasePlayer } from './BasePlayer.ts';
import { Circle } from './Circle.ts';
import { Deck } from './Deck.ts';

export class Game<PlayerType extends BasePlayer> {
  // Player-related variables
  private players: Circle<PlayerType>;
  // add players to the game
  private playerList: PlayerType[];
  private createPlayer: PlayerFactory<PlayerType>;

  //card-related variables
  private questionDeck: Deck<string>;
  private answerDeck: Deck<string>;

  // Game-related variables
  private numberOfRounds: number;
  private stopRequested = false;
  private roundHandler: RoundHandler<PlayerType>;
  private startHandler: StartHandler<PlayerType>;
  private endHandler: EndHandler;

  constructor(questions: string[], answers: string[]) {
    this.players = new Circle();
    this.playerList = [];
    this.numberOfRounds = questions.length;
    this.questionDeck = new Deck(questions);
    this.answerDeck = new Deck(answers);
    this.roundHandler = async () => '';
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

  cyclePlayer(name: string, cards: withNumericId<string>[]): PlayerType {
    const player = this.createPlayer(name, cards);
    if (player) {
      if (this.players.map.has(player.id)) return this.cyclePlayer(name, cards);
      else {
        player.on('use', (cardId: string) => {
          this.answerDeck.insertCardInBottom(cardId);
          return this.answerDeck.pickTopCard();
        });
        this.players.addEntry(player.id, player);
        return player;
      }
    } else {
      throw new Error('no connectionHandler');
    }
  }

  addPlayer(name: string) {
    const cards = [];
    for (let i = 0; i < 4; i++) {
      let card = this.answerDeck.pickTopCard();
      cards.push(card);
    }
    this.cyclePlayer(name, cards);
  }

  async notifyAll(message: any, round: number): Promise<void> {
    for (let player of this.players.map.values()) {
      await player.broadcast({ round: round + 1, ...message });
    }
  }

  async start(): Promise<PlayerType[]> {
    if (!this.players.map.size) return [];

    this.startHandler(this.players.map);

    for (let i = 0; i < this.numberOfRounds; i++) {
      if (this.stopRequested) break;
      const judge = this.players.circle();
      const question = this.questionDeck.pickTopCard();
      await this.notifyAll({ q: question.value, j: judge.value.nickname }, i);
      const winnerId = await this.roundHandler(this.players.map, judge.id);
      const winner = this.players.map.get(winnerId)!;
      winner.cardsWon.add(question.id);
      await this.notifyAll({ playerWon: winner.nickname }, i);
    }

    this.endHandler();
    return this.#scores();
  }

  stop() {
    this.stopRequested = true;
  }

  #scores = () => {
    const result: PlayerType[] = [];
    for (const [, player] of this.players.map) {
      result.push(player);
    }
    return result.sort((a, b) => b.cardsWon.size - a.cardsWon.size);
  };
}
