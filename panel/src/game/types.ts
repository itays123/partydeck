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

export type Action = {
  isLoading: boolean;
  doFetch(): void;
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
  refresh?(game: Game): void;
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
  deck: Deck;
  changes: Changes;
  addCard(): void;
  changeValue(index: number, value: string): void;
  deleteCard(index: number): void;
  canDelete: boolean;
  isChanged: boolean;
  reset(): void;
};

export const EMPTY_GAME: Game = {
  name: '',
  isPrivate: false,
  lng: 'en',
  author: null,
  questions: [],
  answers: [],
};
