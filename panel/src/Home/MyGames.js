import { Link } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import { useProfile } from '../auth/profile/useProfile';
import GameList from '../shared/GameList/GameList';
import Search from '../shared/Search/Search';
import Spinner from '../shared/Spinner';

const MyGames = () => {
  const { user } = useAuthContext();
  const { isLoading, games } = useProfile(user._id); // to refresh games on every render
  return (
    <>
      <h3 className="mt-8 text-xl md:-mb-4 px-8 md:px-0">
        <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 pb-2">
          My Games
        </span>
        {!isLoading && (
          <span className="text-gray-700 text-lg"> {games?.length || ''}</span>
        )}
      </h3>
      <div className="md:hidden px-8 md:px-0 mt-2 -mb-4">
        <Search />
      </div>
      {!isLoading ? (
        <GameList games={games} sharedAuthor={user} />
      ) : (
        <div className="flex mt-8">
          <Spinner />
          Loading Games...
        </div>
      )}
      {games?.length === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center space-y-4 mt-8">
          <h3 className="text-xl">No games yet!</h3>
          <Link
            to="/create"
            className="colorful-button animation-scaleup bg-purple-600"
          >
            Create Game
          </Link>
        </div>
      )}
    </>
  );
};

export default MyGames;
