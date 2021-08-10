import { useCallback, useMemo, useState } from 'react';
import { Card } from '../../game/types';

export enum SwipeDir {
  Initial = 0,
  Left = -1,
  Right = 1,
}

export function useSwipes(deck: Card[]) {
  const [[selectedIndex, swipeDir], setSelectedIndex] = useState([
    0,
    SwipeDir.Initial,
  ]);
  const swipeLeftAllowed = useMemo(() => selectedIndex > 0, [selectedIndex]);
  const swipeRightAllowed = useMemo(
    () => selectedIndex < deck.length - 1,
    [selectedIndex, deck]
  );
  const swipeLeft = useCallback(() => {
    if (swipeLeftAllowed) {
      setSelectedIndex(([i]) => [i - 1, SwipeDir.Left]);
    }
  }, [swipeLeftAllowed]);
  const swipeRight = useCallback(() => {
    if (swipeRightAllowed) {
      setSelectedIndex(([i]) => [i + 1, SwipeDir.Right]);
    }
  }, [swipeRightAllowed]);
  return {
    selectedIndex,
    swipeDir,
    swipeLeftAllowed,
    swipeRightAllowed,
    swipeLeft,
    swipeRight,
  };
}
