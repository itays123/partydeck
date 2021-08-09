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
    <div className="absolute inset-0 p-8 flex flex-col items-center justify-between w-full h-full overflow-y-hidden">
      <PageTitle>Waiting For Players...</PageTitle>
      <div
        className="flex-grow mt-8 -py-8 player-list-wrapper"
        style={{ gridAutoRows: 128 }}
      >
        <PlayerIterator />
        <PlayerCountFeedbackCard />
      </div>
      <div className="h-20 w-full flex justify-between items-end md:px-8">
        <GameCodeDisplay />
        <EnoughPlayers>
          <AdminOnly>
            <StartGameButton className="rounded-full shadow-xl w-16 h-16" />
          </AdminOnly>
        </EnoughPlayers>
      </div>
    </div>
  );
}
