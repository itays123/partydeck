import { Circle } from './Circle.ts';
import { Deck } from './Deck.ts';

export type roundFn<T = string> = (
  players: T[],
  judge: { id: number; value: T },
  question: { id: number; value: string }
) => Promise<void>;

export class Game<PlayerType = string> {
  // Player-related variables
  private players: Circle<PlayerType>;
  // add players to the game
  private playerList: PlayerType[];

  //card-related variables
  private questionDeck: Deck<string>;

  // Game-related variables
  private numberOfRounds: number;
  private stopRequested = false;
  private round: roundFn<PlayerType>;

  constructor(questions: string[], round: roundFn<PlayerType>) {
    this.players = new Circle([]);
    this.playerList = [];
    this.numberOfRounds = questions.length;
    this.questionDeck = new Deck(questions);
    this.round = round;
  }

  addPlayer(player: PlayerType) {
    this.playerList.push(player);
  }

  async start() {
    this.players = new Circle(this.playerList);

    for (let i = 0; i < this.numberOfRounds; i++) {
      if (this.stopRequested) break;
      const players = this.players.status();
      const judge = this.players.circle();
      const question = this.questionDeck.pickTopCard();
      await this.round(players, judge, question);
    }
  }

  stop() {
    this.stopRequested = true;
  }
}
