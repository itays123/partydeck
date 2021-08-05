import { useContext, useMemo } from 'react';
import { ProfileBarOpener } from '../SideProfileBar/SideProfileBarProvider';
import { withClass } from '../types';
import { GameAuthorContext } from './GameAuthorProvider';
import { Author } from './types';

export function GameAuthor({
  author,
  className,
}: { author?: Author } & withClass) {
  const { author: sharedAuthor, shouldLink } = useContext(GameAuthorContext);
  const { name, _id } = useMemo(
    () => (author || sharedAuthor)!,
    [author, sharedAuthor]
  );
  return shouldLink ? (
    ProfileBarOpener(name, _id)({ className })
  ) : (
    <div className={className}>{name}</div>
  );
}
