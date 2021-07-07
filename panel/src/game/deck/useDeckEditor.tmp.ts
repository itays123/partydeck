import { Atom, RemovableAtom, useAtomSlice } from 'klyva';
import React, { useState } from 'react';
import { Added, Changes, Deck, Deleted, Modified } from './DeckEditorTypes';

export type Editor = {
  cardAtomList: RemovableAtom<string>[];
  canDelete: boolean;
  focusedCardIndex: number;
  setFocusedCardIndex: React.Dispatch<React.SetStateAction<number>>;
  clearFocus(): void;
  next(): void;
  addCard(): void;
  changes(): Changes;
  clearState(): void;
};

export function useDeckEditor(
  deckAtom: Atom<Deck>,
  initialDeck: Deck,
  minDeckSize: number = 0
): Editor {
  const [focusedCardIndex, setFocusedCardIndex] = useState(-1);
  const [deckSize, setDeckSize] = useState(initialDeck.length);
  const cardAtomList = useAtomSlice(deckAtom);
  deckAtom.subscribe(deck => setDeckSize(deck.length));

  return {
    cardAtomList,
    canDelete: deckSize > minDeckSize,
    focusedCardIndex,
    setFocusedCardIndex,
    clearFocus() {
      setFocusedCardIndex(-1);
    },
    next() {
      if (focusedCardIndex + 1 === deckSize) this.addCard();
      else setFocusedCardIndex(i => i + 1);
    },
    addCard() {
      setFocusedCardIndex(deckSize); // focus on the created card
      deckAtom.update(list => [...list, '']);
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
  };
}
