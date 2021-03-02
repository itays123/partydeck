import { Link } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthContext';
import AuthOnly from '../auth/AuthOnly';
import GameList from './GameList/GameList';
import { GameWebsiteLink } from './helpers/GameWebsiteLink';

const Home = () => {
  const { user, logout } = useAuthContext();
  return (
    <div className="home scrollable">
      <div className="container mx-auto">
        <header className="homepage-actions mt-8 px-8 md:px-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900">
            Hi {String(user?.name || 'Guest').split(' ')[0]}!
          </h1>
          <h2 className="mt-4 text-xl">What would you like to do?</h2>
          <div className="grid grid gird-cols-1 md:grid-cols-3 w-full md:w-3/4 lg:w-2/3 max-w-lg mt-4 gap-4">
            <AuthOnly>
              <Link
                className="bg-yellow-500 colorful-button animation-scaleup"
                to="/create"
              >
                Create New Game
              </Link>
              <a
                className="bg-pink-500 colorful-button animation-scaleup"
                href={GameWebsiteLink}
              >
                Join Game
              </a>
              <button
                className="bg-blue-400 colorful-button animation-scaleup"
                href="/"
                onClick={() => logout()}
              >
                Log Out
              </button>
            </AuthOnly>
            <AuthOnly shouldNotBeAuthenticated>
              <Link
                className="bg-yellow-500 colorful-button animation-scaleup"
                to="/start"
              >
                Get Started
              </Link>
              <Link
                className="bg-pink-500 colorful-button animation-scaleup"
                to="/login"
              >
                Log In
              </Link>
              <a
                className="bg-blue-500 colorful-button animation-scaleup"
                href={GameWebsiteLink}
              >
                Join Game
              </a>
            </AuthOnly>
          </div>
        </header>
        <AuthOnly>
          <h3 className="mt-6 text-xl -mb-6 px-8 md:px-0">
            <span>My Games </span>
            <span className="font-thin text-gray-700 text-sm">
              {user.games.length}
            </span>
          </h3>
          <GameList games={user.games} sharedAuthor={user} />
        </AuthOnly>
      </div>
    </div>
  );
};

export default Home;
