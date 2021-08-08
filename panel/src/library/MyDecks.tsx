import { useAuthContext } from '../auth/AuthContext';
import { useProfile } from '../auth/actions/useProfile';
import { link } from '../components/buttonFactory';
import GameList from '../components/GameList/GameList';
import PageTitle from '../components/PageTitle/PageTitle';
import NewDeck from '../components/glyphs/NewDeck';

const CreateDeckLink = link(NewDeck, '/create');

export default function MyDecks() {
  const { user } = useAuthContext();
  const { isLoading, games } = useProfile(user?._id); // to refresh games on every render
  return (
    <div className="my-decks px-8">
      <div className="flex items-center justify-between">
        <PageTitle>My Decks</PageTitle>
        <CreateDeckLink className="w-8 md:w-14 md:mr-8" />
      </div>
      <div>
        <section className="info"></section>
        <section className="games">
          <GameList games={games} sharedAuthor={user} isLoading={isLoading} />
        </section>
      </div>
    </div>
  );
}
