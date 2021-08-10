import { Atom, useAtomSlice } from 'klyva';
import { useCallback, useState } from 'react';
import { Editor } from '../types';
import { Added, Deck, Deleted, Modified } from '../types';

export function useDeckEditor(
  deckAtom: Atom<Deck>,
  initialDeck: Deck,
  minDeckSize: number = 0
): Editor {
  const [deckSize, setSize] = useState(deckAtom.getValue().length);
  const [isChanged, setChanged] = useState(false);
  const cardAtomList = useAtomSlice(deckAtom);

  deckAtom.subscribe(deck => {
    setSize(deck.length);
    setChanged(
      deck.length !== initialDeck.length ||
        deck.some((card, index) => card !== initialDeck[index])
    );
  });

  const addCard = useCallback(
    () => deckAtom.update(list => [...list, '']),
    [deckAtom]
  );
  const clearState = useCallback(
    () => deckAtom.update(initialDeck),
    [deckAtom, initialDeck]
  );
  const changes = useCallback(() => {
    const added: Added = [],
      modified: Modified = [],
      deleted: Deleted = [];

    // handle added, modified cards
    deckAtom.getValue().forEach((value, index) => {
      if (index >= initialDeck.length)
        // card was added
        added.push(value);
      else if (value !== initialDeck[index])
        // card was modified
        modified.push([index, value]);
    });

    // handle deleted cards
    if (initialDeck.length > deckAtom.getValue().length)
      // cards were deleted
      for (let i = deckAtom.getValue().length; i < initialDeck.length; i++)
        deleted.push(i);

    return { added, modified, deleted };
  }, [deckAtom, initialDeck]);

  return {
    cardAtomList,
    canDelete: deckSize > minDeckSize,
    isChanged,
    addCard,
    changes,
    clearState,
    getValue() {
      return deckAtom.getValue();
    },
  };
}
