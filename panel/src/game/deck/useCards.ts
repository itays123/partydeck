import { RemovableAtom } from 'klyva';
import { useMemo } from 'react';

export function useCards(deck: RemovableAtom<string>[], selectedIndex: number) {
  const previousCard = useMemo(
    () => (selectedIndex - 1 >= 0 ? deck[selectedIndex - 1] : undefined),
    [deck, selectedIndex]
  );
  const currentCard = useMemo(
    () => (deck.length > 0 ? deck[selectedIndex] : undefined),
    [deck, selectedIndex]
  );
  const nextCard = useMemo(
    () =>
      selectedIndex + 1 < deck.length ? deck[selectedIndex + 1] : undefined,
    [deck, selectedIndex]
  );
  return { previousCard, currentCard, nextCard };
}
