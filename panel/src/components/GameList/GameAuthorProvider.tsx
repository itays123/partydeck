import { createContext, useMemo } from 'react';
import { useAuthContext } from '../../auth/AuthContext';
import { createWrapper } from '../logicalWrapeprFactory';
import { Wrapper } from '../types';
import { Author } from './types';

interface IGameAuthorProvider {
  isAuthor: boolean;
  shouldLink: boolean; // 'false' when looking at one's profile
  author?: Author;
}

export const GameAuthorContext = createContext({} as IGameAuthorProvider);

export const IsAuthor = createWrapper(GameAuthorContext, ctx => ctx.isAuthor);
export const ShouldLink = createWrapper(
  GameAuthorContext,
  ctx => ctx.shouldLink
);

export function GameAuthorProvider({
  children,
  sharedAuthor,
}: Wrapper & { sharedAuthor?: Author }) {
  const { user } = useAuthContext();
  const isAuthor = useMemo(
    () => sharedAuthor?._id === user?._id,
    [sharedAuthor, user]
  );
  const shouldLink = useMemo(() => !sharedAuthor, [sharedAuthor]);
  return (
    <GameAuthorContext.Provider
      value={{ author: sharedAuthor, isAuthor, shouldLink }}
    >
      {children}
    </GameAuthorContext.Provider>
  );
}
