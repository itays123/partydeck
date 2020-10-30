import { IPlayer } from '../types.ts';
import { Game } from './Game.ts';

export class TestPlayer implements IPlayer {
  nickname: string;
  cardsWon: Set<string>;

  constructor(name: string) {
    this.nickname = name;
    this.cardsWon = new Set();
  }

  async boradcast(message: any): Promise<void> {
    // cool!
  }
}

const QUESTIONS = [
  'question1',
  'question2',
  'question3',
  'question4',
  'question5',
  'question6',
];
const PLAYERS = [
  new TestPlayer('player1'),
  new TestPlayer('player2'),
  new TestPlayer('player3'),
];

Deno.test('runs a game with 6 questions', async () => {
  const game = new Game<TestPlayer>(QUESTIONS);
  let rounds: any[] = [];

  game.on('start', async (players: Map<string, TestPlayer>) => {
    if (players.size !== 3) throw new Error('there are not three players');
  });

  game.on(
    'round',
    async (players: Map<string, TestPlayer>, judgeId: string) => {
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
    }
  );

  game.on('end', async () => {
    console.table(rounds);
  });

  for (const player of PLAYERS) {
    game.addPlayer(player);
  }
  await game.start();

  if (rounds.length !== 6) {
    throw new Error('wrong number of rounds');
  }
});
