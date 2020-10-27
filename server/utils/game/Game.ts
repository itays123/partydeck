import { RoundFunc } from '../../types.ts';
import { Circle } from './Circle.ts';
import { Deck } from './Deck.ts';

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
  private round: RoundFunc<PlayerType>;

  constructor(questions: string[], round: RoundFunc<PlayerType>) {
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
      const players = this.players.map;
      const judge = this.players.circle();
      const question = this.questionDeck.pickTopCard();
      await this.round(players, judge, question);
    }
  }

  stop() {
    this.stopRequested = true;
  }
}
