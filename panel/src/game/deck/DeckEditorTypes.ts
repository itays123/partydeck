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
