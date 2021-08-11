import { Reducer, useCallback, useEffect, useMemo, useReducer } from 'react';
import { Changes, Deck } from '../types';

type DeckState = {
  existingDeck: Deck;
  activeIndexes: number[]; // when an index is deleted, we want to keep a refrence to its original index
  deleted: number[];
  added: Deck;
  modifiedIndexes: Set<number>;
};

const getInitialDeckState = (initialDeck: Deck): DeckState => ({
  existingDeck: initialDeck,
  activeIndexes: [...initialDeck.keys()],
  added: [],
  deleted: [],
  modifiedIndexes: new Set(),
});

type AddedAction = { type: 'ADDED' };
type EditedExistingAction = {
  type: 'EDITED_EXISTING';
  value: string;
  actualIndex: number;
};
type EditedNewAction = {
  type: 'EDITED_NEW';
  value: string;
  actualIndex: number;
};
type DeletedExistingAction = { type: 'DELETED_EXISTING'; actualIndex: number };
type DeletedNewAction = { type: 'DELETED_NEW'; actualIndex: number };
type OverrideAction = { type: 'OVERRIDE'; deck: Deck };
type Action =
  | AddedAction
  | EditedExistingAction
  | EditedNewAction
  | DeletedExistingAction
  | DeletedNewAction
  | OverrideAction;

const reducer: Reducer<DeckState, Action> = (state, action) => {
  switch (action.type) {
    case 'ADDED': {
      return {
        ...state,
        added: [...state.added, ''],
      };
    }
    case 'EDITED_EXISTING': {
      let updatedDeck = [...state.existingDeck];
      const { actualIndex, value } = action as EditedExistingAction;
      const updatedIndex = state.activeIndexes[actualIndex];
      updatedDeck[updatedIndex] = value;
      return {
        ...state,
        existingDeck: updatedDeck,
        modifiedIndexes: new Set(state.modifiedIndexes).add(updatedIndex),
      };
    }
    case 'EDITED_NEW': {
      let updatedDeck = [...state.added];
      const { actualIndex, value } = action as EditedNewAction;
      const updatedIndex = actualIndex - state.activeIndexes.length;
      updatedDeck[updatedIndex] = value;
      return {
        ...state,
        added: updatedDeck,
      };
    }
    case 'DELETED_EXISTING': {
      const { actualIndex } = action as DeletedExistingAction;
      const deletedIndex = state.activeIndexes[actualIndex];
      return {
        ...state,
        activeIndexes: state.activeIndexes.filter(
          (id, actualId) => actualId !== actualIndex
        ),
        deleted: [...state.deleted, deletedIndex],
      };
    }
    case 'DELETED_NEW': {
      const { actualIndex } = action as DeletedNewAction;
      const deletedIndex = actualIndex - state.activeIndexes.length;
      return {
        ...state,
        added: state.added.filter((value, index) => index !== deletedIndex),
      };
    }
    case 'OVERRIDE': {
      const { deck } = action as OverrideAction;
      return getInitialDeckState(deck);
    }
    default: {
      return state;
    }
  }
};

export function useDeck(initialDeck: Deck, minDeckSize: number = 3) {
  const [
    { activeIndexes, existingDeck, added, modifiedIndexes, deleted },
    dispatch,
  ] = useReducer(reducer, getInitialDeckState(initialDeck));
  const deck = useMemo(
    () => [...activeIndexes.map(index => existingDeck[index]), ...added],
    [activeIndexes, existingDeck, added]
  );
  const changes = useMemo<Changes>(() => {
    return {
      added,
      modified: [...modifiedIndexes].map(index => [index, existingDeck[index]]),
      deleted,
    };
  }, [added, deleted, existingDeck, modifiedIndexes]);
  const addCard = useCallback(() => dispatch({ type: 'ADDED' }), []);
  const changeValue = useCallback(
    (index: number, value: string) => {
      const isNew = index >= activeIndexes.length;
      dispatch({
        type: isNew ? 'EDITED_NEW' : 'EDITED_EXISTING',
        actualIndex: index,
        value,
      });
    },
    [activeIndexes.length]
  );
  const deleteCard = useCallback(
    (index: number) => {
      const isNew = index >= activeIndexes.length;
      dispatch({
        type: isNew ? 'DELETED_NEW' : 'DELETED_EXISTING',
        actualIndex: index,
      });
    },
    [activeIndexes.length]
  );
  const canDelete = useMemo(
    () => deck.length >= minDeckSize,
    [minDeckSize, deck.length]
  );
  const isChanged = useMemo(
    () => added.length > 0 || deleted.length > 0 || modifiedIndexes.size > 0,
    [added, deleted, modifiedIndexes]
  );
  const reset = useCallback(
    () => dispatch({ type: 'OVERRIDE', deck: initialDeck }),
    [initialDeck]
  );

  useEffect(reset, [reset]);
  return {
    deck,
    changes,
    addCard,
    changeValue,
    deleteCard,
    canDelete,
    isChanged,
    reset,
  };
}
