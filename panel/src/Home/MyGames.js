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
      <h3 className="mt-6 text-xl md:-mb-6 px-8 md:px-0">
        <span className="font-medium text-2xl pb-2">My Games </span>
        {!isLoading && (
          <span className="text-gray-700 text-sm">{user?.games?.length}</span>
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
          Loading Game...
        </div>
      )}
    </>
  );
};

export default MyGames;
