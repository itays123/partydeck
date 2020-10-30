import { sleepRandomAmountOfSeconds } from '../deps.ts';
import { IPlayer, RoundFunc } from '../types.ts';
import { Game } from './Game.ts';

export class TestPlayer implements IPlayer {
  nickname: string;
  cardsWon: Set<string>;

  constructor(name: string) {
    this.nickname = name;
    this.cardsWon = new Set();
  }

  async boradcast(message: any): Promise<void> {
    console.log('on:', this.nickname, 'message:', JSON.stringify(message));
  }
}

const game = new Game<TestPlayer>([
  'question1',
  'question2',
  'question3',
  'question4',
  'question5',
  'question6',
]);

let rounds: any[];

game.on('start', async (players: Map<string, TestPlayer>) => {
  console.log(players.size, 'players joined!');
  rounds = [];
});

game.on('round', async (players: Map<string, TestPlayer>, judgeId: string) => {
  await sleepRandomAmountOfSeconds(1, 5, false);
  let fallbackPlayer: string;
  for (const playerId of players.keys()) {
    if (playerId !== judgeId) {
      fallbackPlayer = playerId;
      if (Math.random() < 0.2) {
        rounds.push({
          judge: players.get(judgeId)!.nickname,
          winner: players.get(playerId)!.nickname,
        });
        return playerId;
      }
    }
  }
  rounds.push({
    judge: players.get(judgeId)!.nickname,
    winner: players.get(fallbackPlayer!)!.nickname,
  });
  return fallbackPlayer!;
});

game.on('end', async () => {
  console.log('game ended');
  console.table(rounds);
});

game.addPlayer(new TestPlayer('player1'));
game.addPlayer(new TestPlayer('player2'));
game.addPlayer(new TestPlayer('player3'));

game.start();
