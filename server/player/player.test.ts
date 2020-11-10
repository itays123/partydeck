import { serve, acceptWebSocket } from '../deps.ts';
import { Game } from '../game/Game.ts';
import { Acceptable } from '../types.ts';
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

Deno.test('starts a game', async () => {
  const server = serve({ port: 8000 });
  console.log('http://localhost:8000/');
  const game = new Game<Player>('random string', QUESTIONS, ANSWERS);

  game.on('connection', Player.newInstance);

  game.on('round', Player.roundHandler);

  game.on('start', async () => {
    console.log('game started');
  });

  game.on('end', async () => {
    server.close();
  });

  for await (const req of server) {
    const { conn, r: bufReader, w: bufWriter, headers, url } = req;
    const params = new URLSearchParams(url.split('?')[1]);
    const name = params.get('name') || 'anonymous';
    const wsParams: Acceptable = { conn, bufReader, bufWriter, headers };
    await Player.acceptWebSocket(game, name, wsParams);
  }
});
