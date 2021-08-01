import CreateDecks from '../resources/brand/CreateDecks';
import HostGames from '../resources/brand/HostGames';
import InviteFriends from '../resources/brand/InviteFriends';
import PublishDecks from '../resources/brand/PublishDecks';

export default function CardCollection() {
  return (
    <section className="how-it-works bg-theme-300 p-4 flex flex-col items-center">
      <h2 className="text-xl md:text-2xl lg:text-3xl text-center text-theme-900 font-bold mb-4">
        How Does Partydeck Work?
      </h2>
      <div className="grid grid-rows-2 grid-cols-2 sm:grid-rows-1 sm:grid-cols-4 justify-items-center gap-2">
        <CreateDecks className="w-auto" />
        <PublishDecks className="w-auto" />
        <HostGames className="w-auto" />
        <InviteFriends className="w-auto" />
      </div>
    </section>
  );
}
