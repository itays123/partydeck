import { useAuthContext } from '../../auth/AuthContext';
import { useGameListContext } from './GameListContext';

export function useAuthor(author) {
  const { author: sharedAuthor } = useGameListContext();
  const { user } = useAuthContext();
  if (!author) {
    author = sharedAuthor;
  }
  const isSelf = user?._id === author._id;
  return {
    authorName: author.name,
    profileLink: isSelf ? '/' : '/user/' + author._id,
  };
}
