import { useGameContext } from '../game/GameContext';
import JoinForm from './JoinForm';

const Lobby = () => {
  const { gameCode, isAdmin, playerCount, start } = useGameContext();
  return (
    <div className="lobby container mx-auto">
      {gameCode ? (
        <>
          <div className="gamecode-display flex justify-center mt-4">
            {gameCode.split('').map((char, i) => (
              <div
                key={i}
                className="text-3xl md:text-6xl lg:text-9xl bg-gray-100 text-gray-800 mx-1 md:mx-2 rounded px-2 md:px-4 pb-4"
              >
                {char}
              </div>
            ))}
          </div>
          <div className="players w-full">
            {isAdmin && (
              <div className="start-btn absolute bottom-0 left-0 right-0">
                <div className="w-screen max-w-screen-sm mx-auto px-4 pb-6">
                  <button
                    className="w-full bg-gray-800 text-gray-100 py-2 focus:outline-none hover:bg-gray-700 disabled:opacity-70"
                    disabled={playerCount < 3}
                    onClick={() => start()}
                  >
                    START
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <JoinForm />
      )}
    </div>
  );
};

export default Lobby;
