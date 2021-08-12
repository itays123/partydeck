import GameList from '../../components/GameList/GameList';
import { useSearchResult } from './SearchResultProvider';

export default function SearchResultList() {
  const { result, isLoading } = useSearchResult();
  return (
    <GameList games={result} isLoading={result.length === 0 && isLoading} />
  );
}
