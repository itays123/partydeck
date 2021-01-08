import { useGameContext } from '../game/GameContext';
import Spinner from '../shared/Spinner';

const LobbyLoader = () => {
  const { isStarted, playerCount, isAdmin } = useGameContext();

  const awaitingPlayers = playerCount < 3;
  const awaitingAdmin = !isStarted && playerCount >= 3 && !isAdmin;
  const showSpinner = !isAdmin || isStarted || awaitingPlayers;

  return (
    <div className="flex max-h-96 lg:max-h-72 overflow-y-scroll no-scrollbar text-gray-100 justify-center pt-8">
      {showSpinner && <Spinner />}
      <div>
        {isStarted && 'Shuffling cards...'}
        {awaitingAdmin && 'Waiting for game admin...'}
        {awaitingPlayers && `${3 - playerCount} more players to join`}
      </div>
    </div>
  );
};

export default LobbyLoader;
