import { Game } from './utils/game/Game.ts';
import { sleep } from 'https://deno.land/x/sleep/mod.ts';

const game = new Game<string>(
  async (
    players: string[],
    { id: judgeId, value: judge }: { id: number; value: string },
    question: string
  ) => {
    console.log('the current judgeId is', judgeId, 'named', judge);
    console.log('the current question is', question);
    console.log('there are', players.length, 'players');
    await sleep(5);
  }
);

game.addPlayer('player1');
game.addPlayer('player2');
game.addPlayer('player3');
game.start();

setTimeout(() => game.stop(), 10000);
