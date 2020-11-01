import { IPlayer, withNumericId } from '../types.ts';
import { Game } from './Game.ts';
import { assertThrowsAsync } from '../deps.ts';

export class TestPlayer implements IPlayer {
  nickname: string;
  cardsWon: Set<string>;
  currentCards: Set<withNumericId<string>>;

  constructor(name: string, answerCards: withNumericId<string>[]) {
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
const ANSWERS = [
  'a1',
  'a2',
  'a3',
  'a4',
  'a5',
  'a6',
  'a7',
  'a8',
  'a9',
  'a10',
  'a11',
  'a12',
  'a13',
  'a14',
  'a15',
  'a16',
  'a17',
  'a18',
  'a19',
  'a20',
  'a21',
  'a22',
  'a23',
  'a24',
  'a25',
  'a26',
  'a27',
  'a28',
  'a29',
  'a30',
  'a31',
  'a32',
  'a33',
  'a34',
  'a35',
  'a36',
  'a37',
];
const PLAYERS = ['player1', 'player2', 'player3', 'player4', 'player5'];

Deno.test('runs a game with x questions', async () => {
  const game = new Game<TestPlayer>(QUESTIONS, ANSWERS);
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

  game.on('connection', (name: string, answers: withNumericId<string>[]) => {
    return new TestPlayer(name, answers);
  });

  for (const player of PLAYERS) {
    game.addPlayer(player);
  }
  const [{ nickname, cardsWon }] = await game.start();
  console.log('the winner is', nickname, 'with', cardsWon.size, 'points');

  if (rounds.length !== QUESTIONS.length) {
    throw new Error('wrong number of rounds');
  }
});

Deno.test('runs an empty game', async () => {
  const game = new Game<TestPlayer>(QUESTIONS, ANSWERS);
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
      return fallbackPlayer!;
    }
  );

  game.on('connection', (name: string, answers: withNumericId<string>[]) => {
    return new TestPlayer(name, answers);
  });

  assertThrowsAsync(async () => {
    const [{ nickname, cardsWon }] = await game.start();
    console.log(nickname, cardsWon);
  });
});
