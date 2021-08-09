import { useMemo } from 'react';
import { createWrapper } from '../components/logicalWrapperFactory';
import { GameContext, useGameContext } from '../game/GameContext';
import { IGameContextValue } from '../game/types';

const distinguishPlayerWon = ({ scoreboard, playerId }: IGameContextValue) => {
  return (
    scoreboard[0].playerId === playerId ||
    scoreboard[1].playerId === playerId ||
    scoreboard[2].playerId === playerId
  );
};

export function usePlayerWon(): boolean {
  const { scoreboard, playerId } = useGameContext();
  return useMemo(
    () => distinguishPlayerWon({ scoreboard, playerId } as IGameContextValue),
    [scoreboard, playerId]
  );
}

export const PlayerWon = createWrapper(GameContext, distinguishPlayerWon);
export const PlayerLost = createWrapper(
  GameContext,
  ctx => !distinguishPlayerWon(ctx)
);
