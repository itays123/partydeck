import { sleepRandomAmountOfSeconds } from '../../../deps.ts';
import { RoundFunc, withNumericId } from '../../../types.ts';

const selectRandomPlayer = async (
  players: Map<string, string>
): Promise<string> => {
  await sleepRandomAmountOfSeconds(1, 5, false);
  let fallbackPlayer: string;
  for (const playerId of players.keys()) {
    fallbackPlayer = playerId;
    if (Math.random() < 0.2) return playerId;
  }
  return fallbackPlayer!;
};

const round: RoundFunc = async (
  players: Map<string, string>,
  { id: judgeId, value: judge }: withNumericId<string>,
  { id: questionId, value: question }: withNumericId<string>
) => {
  console.log('the current judgeId is', judgeId, 'named', judge);
  console.log('the current question is', question, 'id:', questionId);
  const pickedPlayer = await selectRandomPlayer(players);
  console.log(players.get(pickedPlayer), 'was picked!');
};

export default round;
