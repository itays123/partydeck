import SearchBarProvider, {
  SearchBarInput,
} from '../components/Search/SearchBarProvider';
import PageTitle from '../shared/PageTitle';
import { useQuery } from './search/useQuery';
import SearchResults from './SearchResults';

export default function GameLibrary() {
  const { q } = useQuery();
  if (q) return <SearchResults query={q} />;

  return (
    <div className="px-8">
      <PageTitle>The Game Library</PageTitle>
      <section className="absolute bottom-0 left-0 right-0 h-full w-full flex flex-col items-center justify-center px-12">
        <SearchBarProvider visibleOnRender>
          <SearchBarInput
            overrideHint="Search The Game Library..."
            className="px-4 py-2 shadow-lg ring-1 ring-theme-600 rounded-full w-full max-w-lg"
          />
        </SearchBarProvider>
      </section>
    </div>
  );
}
