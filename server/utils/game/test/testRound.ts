import { sleep } from 'https://deno.land/x/sleep/mod.ts';
import { roundFn } from '../Game.ts';

const round: roundFn = async (
  players: string[],
  { id: judgeId, value: judge }: { id: number; value: string },
  { id: questionId, value: question }: { id: number; value: string }
) => {
  console.log('the current judgeId is', judgeId, 'named', judge);
  console.log('the current question is', question, 'id:', questionId);
  console.log('there are', players.length, 'players');
  await sleep(5);
};

export default round;
