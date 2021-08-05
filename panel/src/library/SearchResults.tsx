import PageTitle from '../shared/PageTitle';
import Spinner from '../shared/Spinner';
import { ScrollableSearchResultsWrapper } from './search/ScrollableSearchResultWrapper';
import SearchResultList from './search/SearchResultList';
import SearchResultProvider, {
  MoreResultsLoading,
} from './search/SearchResultProvider';

export default function SearchResults({ query }: { query: string }) {
  return (
    <div className="px-8 flex flex-col absolute inset-0 overflow-y-hidden">
      <SearchResultProvider query={encodeURI(query)}>
        <PageTitle>Search Results</PageTitle>
        <h2 className="text-left px-4 -mt-4">"{query}"</h2>
        <div className="flex-grow flex flex-row items-stretch justify-start overflow-y-hidden">
          <ScrollableSearchResultsWrapper className="flex-1">
            <SearchResultList />
            <MoreResultsLoading>
              <Spinner />
            </MoreResultsLoading>
          </ScrollableSearchResultsWrapper>
        </div>
      </SearchResultProvider>
    </div>
  );
}
