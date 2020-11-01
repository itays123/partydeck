import { IPlayer } from '../types.ts';
import { Game } from './Game.ts';

export class TestPlayer implements IPlayer {
  nickname: string;
  cardsWon: Set<string>;
  currentCards: Set<string>;

  constructor(name: string, answerCards: string[]) {
    this.nickname = name;
    this.cardsWon = new Set();
    this.currentCards = new Set(answerCards);
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
  'question7',
  'question8',
  'question9',
  'question10',
];
const PLAYERS = ['player1', 'player2', 'player3', 'player4', 'player5'];

Deno.test('runs a game with x questions', async () => {
  const game = new Game<TestPlayer>(QUESTIONS);
  let rounds: any[] = [];

  game.on(
    'round',
    async (players: Map<string, TestPlayer>, judgeId: string) => {
      let fallbackPlayer: string;
      for (const playerId of players.keys()) {
        if (playerId !== judgeId) {
          fallbackPlayer = playerId;
          if (Math.random() < 0.3) {
            break;
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
    console.log('\n');
    console.table(rounds);
  });

  for (const player of PLAYERS) {
    game.addPlayer(new TestPlayer(player, []));
  }
  const [{ nickname, cardsWon }] = await game.start();
  console.log('the winner is', nickname, 'with', cardsWon.size, 'points');

  if (rounds.length !== QUESTIONS.length) {
    throw new Error('wrong number of rounds');
  }
});
