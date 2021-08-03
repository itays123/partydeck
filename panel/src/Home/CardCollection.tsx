import CreateDecks from '../components/brand/CreateDecks';
import HostGames from '../components/brand/HostGames';
import InviteFriends from '../components/brand/InviteFriends';
import PublishDecks from '../components/brand/PublishDecks';

export default function CardCollection() {
  return (
    <section className="how-it-works bg-theme-300 p-4 flex flex-col items-center">
      <h2>How Does Partydeck Work?</h2>
      <div className="grid grid-rows-2 grid-cols-2 sm:grid-rows-1 sm:grid-cols-4 justify-items-center gap-2">
        <CreateDecks className="w-auto" />
        <PublishDecks className="w-auto" />
        <HostGames className="w-auto" />
        <InviteFriends className="w-auto" />
      </div>
    </section>
  );
}
