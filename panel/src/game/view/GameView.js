import { Link, useParams } from 'react-router-dom';
import languages from '../../shared/helpers/languages';
import { useGame } from '../useGame';
import CardList from './CardList';

const GameView = () => {
  const { id } = useParams();
  const game = useGame(id);
  return (
    <div className="game-view w-screen relative h-screen">
      <div className="bg-purple-900 w-full">
        <header className="container mx-auto py-4 text-gray-100">
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
            {game.name}
          </h1>
          <h2 className="text-lg md:text-xl">
            Made by <Link to={'/' + game.author._id}>{game.author.name}</Link>
          </h2>
          <h3 className="text-md">
            {languages[game.lng] && (
              <span>{languages[game.lng].nativeName} &middot; </span>
            )}
            {game.isPrivate ? 'Private' : 'Public'}
          </h3>
        </header>
      </div>
      <div className="overflow-y-scroll w-full py-4 bottom-0 top-0 h-full">
        <CardList title="Questions" list={game.questions} />
        <CardList title="Answers" list={game.answers} />
      </div>
    </div>
  );
};

export default GameView;
