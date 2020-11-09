import { Game } from './game/Game.ts';
import { Player } from './player/Player.ts';
import { Server } from './server.ts';
import { assertEquals } from './deps.ts';

Deno.test('connects 3 players to the same game', async () => {
  assertEquals(
    await Server.test(
      (
        pending: Map<string, Game<Player>>,
        active: Map<string, Game<Player>>
      ) => {
        for (const game of pending.values()) {
          console.log(game.playerCount);
          if (game.playerCount === 3) return false;
        }
        return pending.size > 0 || active.size > 0;
      }
    ),
    3
  );
});
