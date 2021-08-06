import SideProfileBar from '../components/SideProfileBar/SideProfileBar';
import SideProfileBarProvider from '../components/SideProfileBar/SideProfileBarProvider';
import PageTitle from '../components/PageTitle/PageTitle';
import { ScrollableSearchResultsWrapper } from './search/ScrollableSearchResultWrapper';
import SearchResultList from './search/SearchResultList';
import SearchResultProvider, {
  MoreResultsLoading,
} from './search/SearchResultProvider';
import Spinner from '../components/Spinner/Spinner';

export default function SearchResults({ query }: { query: string }) {
  return (
    <div className="px-8 flex flex-col absolute inset-0 overflow-y-hidden">
      <SearchResultProvider query={encodeURI(query)}>
        <SideProfileBarProvider>
          <div className="flex-grow flex flex-row items-stretch justify-start overflow-y-hidden">
            <ScrollableSearchResultsWrapper className="flex-1">
              <PageTitle>Search Results</PageTitle>
              <h2 className="px-4 -mt-8 text-theme-600 font-medium text-lg md:text-2xl">
                "{query}"
              </h2>
              <SearchResultList />
              <MoreResultsLoading>
                <Spinner label="loading more results..." />
              </MoreResultsLoading>
            </ScrollableSearchResultsWrapper>
            <SideProfileBar />
          </div>
        </SideProfileBarProvider>
      </SearchResultProvider>
    </div>
  );
}
