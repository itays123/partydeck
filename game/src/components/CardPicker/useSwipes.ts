import { useCallback, useMemo, useState } from 'react';
import { Card } from '../../game/types';

export function useSwipes(deck: Card[]) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const swipeLeftAllowed = useMemo(() => selectedIndex > 0, [selectedIndex]);
  const swipeRightAllowed = useMemo(
    () => selectedIndex < deck.length - 1,
    [selectedIndex, deck]
  );
  const swipeLeft = useCallback(() => {
    swipeLeftAllowed && setSelectedIndex(i => i - 1);
  }, [swipeLeftAllowed]);
  const swipeRight = useCallback(() => {
    swipeRightAllowed && setSelectedIndex(i => i + 1);
  }, [swipeRightAllowed]);
  return {
    selectedIndex,
    swipeLeftAllowed,
    swipeRightAllowed,
    swipeLeft,
    swipeRight,
  };
}
