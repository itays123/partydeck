import { createContext, useContext } from 'react';

export const GameListContext = createContext();

export function useGameListContext() {
  return useContext(GameListContext);
}
