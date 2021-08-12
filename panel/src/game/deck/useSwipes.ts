import { useCallback, useEffect, useMemo, useState } from 'react';
import { Deck } from '../types';

export enum SwipeDir {
  Initial = 0,
  Left = -1,
  FixingLeft = -2,
  Right = 1,
  FixingRight = 2,
}

export function useSwipes(deck: Deck, onSwipeOverload?: Function) {
  const [[selectedIndex, swipeDir], setSelectedIndex] = useState([
    deck.length - 1,
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
    } else if (onSwipeOverload) {
      onSwipeOverload();
      setSelectedIndex(([i]) => [i + 1, SwipeDir.Right]);
    }
  }, [swipeRightAllowed, onSwipeOverload]);
  const swipeWhenRemoved = useCallback(() => {
    if (!swipeRightAllowed)
      // last element or the one before
      swipeLeft();
    else setSelectedIndex(([i]) => [i, SwipeDir.FixingRight]);
  }, [swipeRightAllowed, swipeLeft]);

  // in case a deck re-renders after initial render
  useEffect(() => {
    if (selectedIndex === -1)
      setSelectedIndex([deck.length - 1, SwipeDir.Initial]);
  }, [deck, selectedIndex]);

  return {
    selectedIndex,
    swipeDir,
    swipeLeftAllowed,
    swipeRightAllowed,
    swipeLeft,
    swipeRight,
    swipeWhenRemoved,
  };
}
