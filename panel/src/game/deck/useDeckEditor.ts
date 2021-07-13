import { Atom, useAtomSlice } from 'klyva';
import { useState } from 'react';
import { Editor } from '../types';
import { Added, Changes, Deck, Deleted, Modified } from '../types';

export function useDeckEditor(
  deckAtom: Atom<Deck>,
  initialDeck: Deck,
  minDeckSize: number = 0
): Editor {
  const [focusedCardIndex, setFocusedCardIndex] = useState(-1);
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

  // created outside of export for multiple usages
  const appendCardAndFocus = () => {
    setFocusedCardIndex(deckSize); // focus on the created card
    deckAtom.update(list => [...list, '']);
  };

  return {
    cardAtomList,
    canDelete: deckSize > minDeckSize,
    focusedCardIndex,
    setFocusedCardIndex,
    isChanged,
    clearFocus() {
      setFocusedCardIndex(-1);
    },
    next() {
      if (focusedCardIndex + 1 === deckSize) appendCardAndFocus();
      else setFocusedCardIndex(i => i + 1);
    },
    addCard() {
      appendCardAndFocus();
    },
    changes(): Changes {
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
    },
    clearState() {
      deckAtom.update(initialDeck);
    },
    getValue() {
      return deckAtom.getValue();
    },
  };
}
