import { Circle } from './Circle.ts';

type roundFn<T = string> = (
  players: T[],
  judge: { id: number; value: T },
  question: string
) => Promise<void>;

export class Game<PlayerType = string> {
  private players: Circle<PlayerType>;
  // add players to the game
  private playerList: PlayerType[];

  private numberOfRounds: number;
  private stopRequested = false;
  private round: roundFn<PlayerType>;

  constructor(round: roundFn<PlayerType>) {
    this.players = new Circle([]);
    this.playerList = [];
    this.numberOfRounds = 10;
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
      const question = 'question';
      await this.round(players, judge, question);
    }
  }

  stop() {
    this.stopRequested = true;
  }
}
