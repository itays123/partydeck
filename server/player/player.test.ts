import { serve, acceptWebSocket, WebSocket } from '../deps.ts';
import { Game } from '../game/Game.ts';
import { PickedCard, withNumericId } from '../types.ts';
import { Player } from './Player.ts';

const QUESTIONS = ['question1', 'question2', 'question3'];
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

Deno.test('runs a game', async () => {
  const server = serve({ port: 8000 });
  console.log('http://localhost:8000/');
  const game = new Game<Player>(QUESTIONS, ANSWERS);

  game.on(
    'connection',
    (name: string, answers: withNumericId<string>[], ws: WebSocket) => {
      const player = new Player(ws, name, answers);
      console.log('player added');
      player.handleWebSocket();
      return player;
    }
  );

  game.on('round', async (cards: PickedCard[], judge: Player) => {
    console.log('round started', cards);
    const winnerId = await judge.pickCard(cards);
    return winnerId;
  });

  game.on('start', async () => {
    console.log('game started');
  });

  for await (const req of server) {
    const { conn, r: bufReader, w: bufWriter, headers } = req;
    const ws = await acceptWebSocket({ conn, bufReader, bufWriter, headers });
    const player = game.addPlayer('itay', ws);
    player.broadcast({ id: player.id });
    if (game.playerCount >= 3) break;
  }

  await game.start();

  server.close();
});
