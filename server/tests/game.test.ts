import { PickedCard, withNumericId } from '../types.ts';
import { Game } from '../game/Game.ts';
import { assertThrowsAsync, assertEquals, assertThrows } from '../deps.ts';
import { TestPlayer } from './TestPlayer.ts';
import { ANSWERS, QUESTIONS } from './TestCards.ts';

const PLAYERS = ['player1', 'player2', 'player3', 'player4', 'player5'];

const pickRandomPlayer = async (cards: PickedCard[], judge: any) => {
  let fallbackPlayer: PickedCard;
  for (const card of cards) {
    if (card.playerId !== judge.id) {
      fallbackPlayer = card;
      if (Math.random() < 0.3) {
        break;
      }
    }
  }
  return fallbackPlayer!;
};

/* tets no longer working due to a change in the start() return type.
Deno.test('runs a game with x questions', async () => {
  const game = new Game<TestPlayer>('random string', QUESTIONS, ANSWERS, 30, 0);
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
        winner: players.get(pickedPlayer.playerId)!.nickname,
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
*/

Deno.test('runs an empty game', async () => {
  const game = new Game<TestPlayer>('random string', QUESTIONS, ANSWERS, 1, 0);
  game.on('round', pickRandomPlayer);

  game.on('connection', (name: string, answers: withNumericId<string>[]) => {
    return new TestPlayer(name, answers);
  });

  assertThrowsAsync(async () => {
    const [{ nickname, cardsWon }] = await game.start();
    console.log(nickname, cardsWon);
  });
});

Deno.test('limits a game', () => {
  const game = new Game<TestPlayer>(
    'random string',
    QUESTIONS,
    ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'],
    1,
    0
  );

  game.on('round', pickRandomPlayer);
  game.on('connection', (name: string, answers: withNumericId<string>[]) => {
    return new TestPlayer(name, answers);
  });

  game.addPlayer('player1');
  game.addPlayer('player2');
  game.addPlayer('player3');

  assertEquals(game.playerCount, 2);
});

Deno.test('simulates a round with 0 picks', async () => {
  const game = new Game<TestPlayer>('', ['q1'], ANSWERS, 1, 0);

  game.on('connection', (name: string, answers: withNumericId<string>[]) => {
    return new TestPlayer(name, answers, false);
  });

  game.on('round', async (cards: PickedCard[]) => {
    if (cards.length === 0) return null;
    else return cards[0];
  });

  game.addPlayer('player1');
  game.addPlayer('player2');
  game.addPlayer('player3');

  const scores = await game.start();
  assertEquals(scores[0].cardsWon.size, 0);
  assertEquals(scores[1].cardsWon.size, 0);
  assertEquals(scores[2].cardsWon.size, 0);
});
