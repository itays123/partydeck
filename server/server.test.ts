import { Game } from './game/Game.ts';
import { Player } from './player/Player.ts';
import { Server } from './server.ts';
import { assertEquals } from './deps.ts';

Deno.test('runs a game', async () => {
  assertEquals(
    await Server.test(
      (
        pending: Map<string, Game<Player>>,
        active: Map<string, Game<Player>>
      ) => {
        return pending.size > 0 || active.size > 0;
      }
    ),
    4 // another request for stopping the server later
  );
});
