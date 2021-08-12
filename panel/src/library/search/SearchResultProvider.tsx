import { useContext } from 'react';
import { createContext } from 'react';
import { action } from '../../components/buttonFactory';
import { Game } from '../../components/GameList/types';
import { createWrapper } from '../../components/logicalWrapeprFactory';
import { Wrapper } from '../../components/types';
import { useSearch } from './useSearch';

interface ISearchResultProvider {
  result: Game[];
  isLoading: boolean;
  isMore: boolean;
  loadMore(): void;
}

const SearchResultContext = createContext({} as ISearchResultProvider);

export const useSearchResult = () => useContext(SearchResultContext);

export const MoreResultsLoading = createWrapper(
  SearchResultContext,
  ctx => ctx.isMore && ctx.isLoading && ctx.result.length !== 0
);

export const LoadMoreButton = action('Load More', SearchResultContext, ctx =>
  ctx.loadMore()
);

export default function SearchResultProvider({
  query,
  children,
}: Wrapper & { query: string }) {
  const { result, isLoading, isMore, loadMore } = useSearch(query);
  return (
    <SearchResultContext.Provider
      value={{ result, isLoading, isMore, loadMore }}
    >
      {children}
    </SearchResultContext.Provider>
  );
}
