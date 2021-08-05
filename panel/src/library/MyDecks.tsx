import { useAuthContext } from '../auth/AuthContext';
import { useProfile } from '../auth/profile/useProfile';
import { link } from '../components/buttonFactory';
import GameList from '../components/GameList/GameList';
import PageTitle from '../shared/PageTitle';
import NewDeck from '../components/glyphs/NewDeck';

const CreateDeckLink = link(NewDeck, '/create');

export default function MyDecks() {
  const { user } = useAuthContext();
  const { isLoading, games } = useProfile(user?._id); // to refresh games on every render
  return (
    <div className="my-decks px-8">
      <div className="flex items-center justify-between">
        <PageTitle>My Decks</PageTitle>
        <CreateDeckLink className="w-8 md:w-14" />
      </div>
      <div>
        <section className="info"></section>
        <section className="games">
          {isLoading || <GameList games={games} sharedAuthor={user} />}
        </section>
      </div>
    </div>
  );
}
