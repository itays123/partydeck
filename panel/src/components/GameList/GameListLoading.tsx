import Spinner from '../Spinner/Spinner';

export function GameListLoading({ isLoading }: { isLoading?: boolean }) {
  return <>{isLoading && <Spinner label="loading decks..." />}</>;
}
