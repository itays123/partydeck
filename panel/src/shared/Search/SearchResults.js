import GameList from '../GameList/GameList';
import Spinner from '../Spinner';
import { useQuery } from './useQuery';
import { useSearch } from './useSearch';

const SearchResults = () => {
  const { q } = useQuery();
  const { result, isLoading, loadMore } = useSearch(encodeURI(q));
  return (
    <div className="scrollable">
      <div className="container mx-auto pt-8">
        {result.length > 0 && (
          <h1 className="text-2xl font-bold">Search Results</h1>
        )}
      </div>
      <GameList games={result} />
      {isLoading ? (
        <div className="container flex mx-auto mt-4">
          <Spinner />
          Loading...
        </div>
      ) : (
        <div className="container mx-auto my-4">
          <button className="dark-button w-full" onClick={() => loadMore()}>
            More
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
