import { serve, acceptWebSocket } from '../deps.ts';
import { Player } from './Player.ts';

const server = serve({ port: 8000 });
console.log('http://localhost:8000/');
for await (const req of server) {
  const { conn, r: bufReader, w: bufWriter, headers } = req;
  acceptWebSocket({ conn, bufReader, bufWriter, headers }).then(async ws => {
    const player = new Player(ws, 'itay', []);
    player.handleWebSocket();
    player.on('disconnect', (playerId: string) => {
      console.log(playerId, 'disconnected');
    });
  });
}
