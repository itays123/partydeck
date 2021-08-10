import { RemovableAtom } from 'klyva';
import { useCallback, useEffect, useMemo, useState } from 'react';

export enum SwipeDir {
  Initial = 0,
  Left = -1,
  Right = 1,
}

export function useSwipes(
  deck: RemovableAtom<string>[],
  onSwipeOverload?: Function
) {
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
    if (!swipeRightAllowed || selectedIndex + 2 === deck.length)
      // last element or the one before
      swipeLeft();
    else if (swipeLeftAllowed)
      // not first or last
      swipeRight();
  }, [
    swipeLeft,
    swipeLeftAllowed,
    swipeRight,
    swipeRightAllowed,
    deck,
    selectedIndex,
  ]);

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
