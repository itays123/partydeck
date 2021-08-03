import GameList from '../components/GameList/GameList';
import Spinner from '../shared/Spinner';
import { useQuery } from './useQuery';
import { useSearch } from './useSearch';

const SearchResults = () => {
  const { q } = useQuery();
  const { result, isLoading, loadMore, isMore } = useSearch(encodeURI(q));
  return (
    <div className="scrollable">
      <div className="container mx-auto pt-8 px-8 md:px-0">
        {result.length > 0 && (
          <h1 className="text-2xl font-bold">Search Results</h1>
        )}
        <GameList games={result} />
      </div>
      {isMore &&
        (isLoading ? (
          <div className="container flex mx-auto mt-4 px-8 md:px-0">
            <Spinner />
            Loading...
          </div>
        ) : (
          <div className="container mx-auto my-4 px-8 md:px-0">
            <button
              className="colorful-button bg-purple-600 hover:bg-purple-800 w-full"
              onClick={() => loadMore()}
            >
              More
            </button>
          </div>
        ))}
    </div>
  );
};

export default SearchResults;
