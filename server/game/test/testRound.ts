import { sleepRandomAmountOfSeconds } from '../../deps.ts';
import { RoundFunc } from '../../types.ts';
import { TestPlayer } from './testPlayer.ts';

const selectRandomPlayer = async (
  players: Map<string, TestPlayer>,
  judgeId: string
): Promise<string> => {
  await sleepRandomAmountOfSeconds(5, 10, false);
  let fallbackPlayer: string;
  for (const playerId of players.keys()) {
    if (playerId !== judgeId) {
      fallbackPlayer = playerId;
      if (Math.random() < 0.2) return playerId;
    }
  }
  return fallbackPlayer!;
};

const round: RoundFunc<TestPlayer> = async (
  players: Map<string, TestPlayer>,
  judgeId
) => {
  const pickedPlayer = await selectRandomPlayer(players, judgeId);
  return pickedPlayer;
};

export default round;
