import { Game } from './utils/game/Game.ts';
import { sleep } from 'https://deno.land/x/sleep/mod.ts';

const game = new Game<string>(
  [
    'question1',
    'question2',
    'question3',
    'question4',
    'question5',
    'question6',
  ],
  async (
    players: string[],
    { id: judgeId, value: judge }: { id: number; value: string },
    { id: questionId, value: question }: { id: number; value: string }
  ) => {
    console.log('the current judgeId is', judgeId, 'named', judge);
    console.log('the current question is', question, 'id:', questionId);
    console.log('there are', players.length, 'players');
    await sleep(5);
  }
);

game.addPlayer('player1');
game.addPlayer('player2');
game.addPlayer('player3');
game.start();
