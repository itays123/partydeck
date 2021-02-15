import { useState } from 'react';

export function useDeckEditor(initialDeck = []) {
  const [added, setAdded] = useState([]);
  const [modified, setModified] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [deck, setDeck] = useState(initialDeck);
  /*
  const [data, setData] = useState(
    initialDeck.map((card, index) => ({ index, card, status: 'existed' }))
  );
  */
  return {
    deck,
    added,
    modified,
    deleted,
    addCard(value) {
      setAdded(array => [...array, value]);
      setDeck(array => [...array, value]);
    },
    modifyCard(index, value) {
      // if existed
      setModified(array => [...array, [index, value]]);
      setDeck(array => {
        let newArray = array;
        newArray[index] = value;
        return newArray;
      });
    },
    deleteCard(index) {
      // if existed, initial index
      setDeleted(array => [...array, index]);
      setDeck(deck => deck.splice(index, 1));
    },
  };
}
