import { useMemo } from 'react';
import { useCurrentRound } from '../game/GameContext';

export function useIsWinner() {
  const { use, pickedCardId } = useCurrentRound();
  return useMemo(
    () => !!use && use.findIndex(({ id }) => id === pickedCardId) !== -1,
    [use, pickedCardId]
  );
}
