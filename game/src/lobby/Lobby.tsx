import GameCodeDisplay from '../components/GameCodeDisplay/GameCodeDisplay';
import PageTitle from '../components/PageTitle/PageTitle';
import PlayerIterator from '../components/PlayerIterator/PlayerIterator';
import { Colors, useBackground } from '../components/theme/useBackground';
import { AdminOnly } from '../game/gameContextFilters';
import { EnoughPlayers, StartGameButton } from './lobbyButtons';
import PlayerCountFeedbackCard from './PlayerCountFeedbackCard';

export function Lobby() {
  useBackground(Colors.THEME);
  return (
    <div className="p-8 flex flex-col items-center w-full h-full">
      <PageTitle>Waiting For Players...</PageTitle>
      <div className="flex-grow md:px-16 grid grid-cols-iterator-sm md:grid-cols-iterator-md lg:grid-cols-iterator-lg gap-2 justify-items-center">
        <PlayerIterator />
        <PlayerCountFeedbackCard />
      </div>
      <div className="h-20 w-full flex justify-between items-end md:px-8">
        <GameCodeDisplay />
        <EnoughPlayers>
          <AdminOnly>
            <StartGameButton className="rounded-full shadow-xl" />
          </AdminOnly>
        </EnoughPlayers>
      </div>
    </div>
  );
}
