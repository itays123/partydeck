import GameCodeDisplay from '../components/GameCodeDisplay/GameCodeDisplay';
import PageTitle from '../components/PageTitle/PageTitle';
import { Colors, useBackground } from '../components/theme/useBackground';
import { AdminOnly } from '../game/gameContextFilters';
import { EnoughPlayers, StartGameButton } from './lobbyButtons';

export function Lobby() {
  useBackground(Colors.THEME);
  return (
    <div className="p-8">
      <PageTitle>Waiting For Players...</PageTitle>
      <div className="absolute bottom-0 left-0 right-0 h-20 flex justify-between items-center px-8">
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
