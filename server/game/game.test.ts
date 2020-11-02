import { PickedCard, withNumericId } from '../types.ts';
import { Game } from './Game.ts';
import { assertThrowsAsync, assertEquals, assertThrows } from '../deps.ts';
import { BasePlayer } from './BasePlayer.ts';

export class TestPlayer extends BasePlayer {
  constructor(name: string, answerCards: withNumericId<string>[]) {
    super(name, answerCards);
  }

  async broadcast(message: any): Promise<void> {
    if (typeof message === 'object') {
      if (message.q) {
        let pickedCard: string;
        for (const cardId of this.currentCards.keys()) {
          pickedCard = cardId;
          if (Math.random() < 0.25) break;
        }
        this.useCard(pickedCard!);
      }
    }
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

const pickRandomPlayer = async (cards: PickedCard[], judge: any) => {
  let fallbackPlayer: string;
  for (const { playerId } of cards) {
    if (playerId !== judge.id) {
      fallbackPlayer = playerId;
      if (Math.random() < 0.3) {
        break;
      }
    }
  }
  return fallbackPlayer!;
};

Deno.test('runs a game with x questions', async () => {
  const game = new Game<TestPlayer>(QUESTIONS, ANSWERS);
  let rounds: any[] = [];
  let initialCardMap: Map<string, string[]> = new Map();
  let usedCards: PickedCard[] = [];

  game.on('start', async (players: Map<string, TestPlayer>) => {
    for (const [, player] of players) {
      const cards: string[] = [];
      for (const [cardId] of player.currentCards) cards.push(cardId);
      initialCardMap.set(player.nickname, cards);
    }
  });

  game.on(
    'round',
    async (
      cards: PickedCard[],
      judge: TestPlayer,
      players: Map<string, TestPlayer>
    ) => {
      usedCards.push(...cards);
      const pickedPlayer = await pickRandomPlayer(cards, judge);
      rounds.push({
        judge: judge.nickname,
        winner: players.get(pickedPlayer)!.nickname,
      });
      return pickedPlayer;
    }
  );

  game.on('end', async () => {
    console.log('\n');
    console.table(rounds);
  });

  game.on(
    'connection',
    (name: string, answers: withNumericId<string>[], ...args: any[]) => {
      console.log(name, ...args);
      return new TestPlayer(name, answers);
    }
  );

  for (const player of PLAYERS) {
    game.addPlayer(player, 'some other arg');
  }
  const [{ nickname, cardsWon, currentCards }] = await game.start();
  console.log('the winner is', nickname, 'with', cardsWon.size, 'points');

  assertEquals(rounds.length, QUESTIONS.length);
  assertEquals(currentCards.size, 4);
  assertThrows(() => {
    const winnerInitialCards = initialCardMap.get(nickname)!;
    for (const cardId of winnerInitialCards) {
      if (!currentCards.has(cardId)) {
        console.log('missing card', cardId);
        throw new Error('missing card');
      }
    }
  });
  assertEquals(usedCards.length, QUESTIONS.length * PLAYERS.length);
});

Deno.test('runs an empty game', async () => {
  const game = new Game<TestPlayer>(QUESTIONS, ANSWERS);
  game.on('round', pickRandomPlayer);

  game.on('connection', (name: string, answers: withNumericId<string>[]) => {
    return new TestPlayer(name, answers);
  });

  assertThrowsAsync(async () => {
    const [{ nickname, cardsWon }] = await game.start();
    console.log(nickname, cardsWon);
  });
});
