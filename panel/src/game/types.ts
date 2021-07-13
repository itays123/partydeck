import { RemovableAtom } from 'klyva';

export type Deck = string[];

export type Added = string[];
export type Modified = [number, string][];
export type Deleted = number[];

export type DeckAtom = {
  deck: Deck;
  added: Added;
  modified: Modified;
  deleted: Deleted;
};

export type Changes = {
  added: Added;
  modified: Modified;
  deleted: Deleted;
};

export interface IGameEditorContext {
  isEditable: boolean;
  isGameNew: boolean;
  isChanged: boolean;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  isPrivate: boolean;
  setPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  lng: string;
  setLng: React.Dispatch<React.SetStateAction<string>>;
  questions: Editor;
  answers: Editor;
  author: any;
  clearState(): void;
}

export interface Game {
  name: string;
  isPrivate: boolean;
  lng: string;
  author: any;
  questions: string[];
  answers: string[];
}

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
  isChanged: boolean;
  getValue(): Deck;
};

export const EMPTY_GAME: Game = {
  name: '',
  isPrivate: false,
  lng: 'en',
  author: null,
  questions: ['', '', ''], // 3 questions min
  answers: ['', '', '', '', '', '', '', '', '', '', '', ''], // 12 answer min
};
