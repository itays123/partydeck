import SearchBarProvider, {
  SearchBarInput,
} from '../components/Search/SearchBarProvider';
import PageTitle from '../components/PageTitle/PageTitle';
import { useQuery } from './search/useQuery';
import SearchResults from './SearchResults';

export default function GameLibrary() {
  const { q } = useQuery();
  if (q) return <SearchResults query={q} />;

  return (
    <div className="px-8 flex flex-col h-full">
      <div className="flex-0">
        <PageTitle>The Game Library</PageTitle>
      </div>
      <section className="flex-grow h-full w-full flex flex-col items-center justify-center">
        <SearchBarProvider visibleOnRender>
          <div className="branded-background bg-no-repeat bg-center flex items-center justify-center w-full max-w-4xl h-full">
            <SearchBarInput
              overrideHint="Search The Game Library..."
              className="px-4 py-2 shadow-xl ring-1 ring-theme-600 rounded-full w-full max-w-lg bg-white"
            />
          </div>
        </SearchBarProvider>
      </section>
    </div>
  );
}
