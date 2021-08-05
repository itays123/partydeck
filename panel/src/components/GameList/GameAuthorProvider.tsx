import { createContext, useMemo } from 'react';
import { useAuthContext } from '../../auth/AuthContext';
import { createWrapper } from '../logicalWrapeprFactory';
import { useProfile } from '../SideProfileBar/SideProfileBarProvider';
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
  const { user, isSignedIn } = useAuthContext();
  const { open } = useProfile();
  const isAuthor = useMemo(
    () => sharedAuthor?._id === user?._id && isSignedIn,
    [sharedAuthor, user, isSignedIn]
  );
  const shouldLink = useMemo(
    () => !sharedAuthor && !!open,
    [sharedAuthor, open]
  );
  return (
    <GameAuthorContext.Provider
      value={{ author: sharedAuthor, isAuthor, shouldLink }}
    >
      {children}
    </GameAuthorContext.Provider>
  );
}
