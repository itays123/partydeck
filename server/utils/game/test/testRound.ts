import { sleepRandomAmountOfSeconds } from '../../../deps.ts';
import { RoundFunc, withNumericId } from '../../../types.ts';
import { TestPlayer } from './testPlayer.ts';

const selectRandomPlayer = async (
  players: Map<string, TestPlayer>
): Promise<string> => {
  await sleepRandomAmountOfSeconds(5, 10, false);
  let fallbackPlayer: string;
  for (const playerId of players.keys()) {
    fallbackPlayer = playerId;
    if (Math.random() < 0.2) return playerId;
  }
  return fallbackPlayer!;
};

const round: RoundFunc<TestPlayer> = async (
  players: Map<string, TestPlayer>,
  { value: judge }: withNumericId<TestPlayer>,
  { id: questionId, value: question }: withNumericId<string>
) => {
  judge.boradcast({ message: 'you are the judge!' });
  const pickedPlayer = await selectRandomPlayer(players);
  console.log('\n\n\n');
  return pickedPlayer;
};

export default round;
