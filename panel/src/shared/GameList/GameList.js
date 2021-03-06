import GameItem from './GameItem';
import { GameListContext } from './GameListContext';

const GameList = ({ games, sharedAuthor }) => {
  return (
    <GameListContext.Provider value={{ author: sharedAuthor }}>
      <div className="game-list px-8 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 space-y-4 md:space-y-0 justify-center mt-8 pb-6">
        {games.map(game => (
          <GameItem {...game} key={game._id} />
        ))}
      </div>
    </GameListContext.Provider>
  );
};

export default GameList;
