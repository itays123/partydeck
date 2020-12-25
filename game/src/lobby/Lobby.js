import { useGameContext } from '../game/GameContext';
import JoinForm from './JoinForm';

const Lobby = () => {
  const { gameCode } = useGameContext();
  return (
    <div className="lobby container mx-auto">
      {gameCode ? (
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
      ) : (
        <JoinForm />
      )}
    </div>
  );
};

export default Lobby;
