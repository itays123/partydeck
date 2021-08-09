import { Dispatch, SetStateAction, useEffect } from 'react';
import { useCurrentRound } from '../../game/GameContext';
import { Card } from '../../game/types';

export function useSubscribeToPickedCardId(
  deck: Card[],
  setSelectedIndex: Dispatch<SetStateAction<number>>
) {
  const { pickedCardId } = useCurrentRound();
  useEffect(() => {
    const pickedCardIndex = deck.findIndex(card => card.id === pickedCardId);
    if (pickedCardIndex > 0) setSelectedIndex(pickedCardIndex);
  }, [pickedCardId, deck, setSelectedIndex]);
}
