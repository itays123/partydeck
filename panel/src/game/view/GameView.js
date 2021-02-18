import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../../auth/AuthContext';
import languages from '../../shared/helpers/languages';
import { useGame } from '../useGame';
import CardList from './CardList';
import { usePlayGame } from './usePlayGame';

const GameView = () => {
  const { id } = useParams();
  const game = useGame(id);
  const { play } = usePlayGame(id);
  const { user } = useAuthContext();
  return (
    <div className="game-view w-screen relative h-screen">
      <div className="bg-gray-100 w-full">
        <header className="container mx-auto pt-8 pb-4 px-2">
          <section className="details">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-purple-600">
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
          </section>
          <section className="actions flex justify-end">
            {user._id === game.author._id && (
              <Link
                to={'/edit/' + id}
                className="edit px-3 py-1 ml-4 rounded bg-purple-600 text-gray-100 font-bold"
              >
                Edit
              </Link>
            )}
            <button
              className="play px-3 py-1 ml-4 rounded bg-purple-600 text-gray-100 font-bold"
              onClick={() => play()}
            >
              Play
            </button>
          </section>
        </header>
      </div>
      <div className="overflow-y-scroll w-full py-4 bottom-0 top-0 h-full pb-32">
        <CardList title="Questions" list={game.questions} />
        <CardList title="Answers" list={game.answers} />
      </div>
    </div>
  );
};

export default GameView;