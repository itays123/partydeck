import GameItem from './GameItem';
import { GameListContext } from './GameListContext';

const GameList = ({ games, sharedAuthor }) => {
  return (
    <GameListContext.Provider value={{ author: sharedAuthor }}>
      <div className="game-list container mx-auto grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center mt-8">
        {games.map(game => (
          <GameItem {...game} key={game._id} />
        ))}
      </div>
    </GameListContext.Provider>
  );
};

export default GameList;
