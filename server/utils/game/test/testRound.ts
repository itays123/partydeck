import { sleep } from '../../../deps.ts';
import { RoundFunc, withNumericId } from '../../../types.ts';

const round: RoundFunc = async (
  players: string[],
  { id: judgeId, value: judge }: withNumericId<string>,
  { id: questionId, value: question }: withNumericId<string>
) => {
  console.log('the current judgeId is', judgeId, 'named', judge);
  console.log('the current question is', question, 'id:', questionId);
  await sleep(5);
};

export default round;
