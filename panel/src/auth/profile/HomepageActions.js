import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const HomepageActions = () => {
  const { user, logout } = useAuthContext();
  return (
    <header className="homepage-actions mt-8  px-8 md:px-0">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900">
        Hi {String(user.name).split(' ')[0]}!
      </h1>
      <h2 className="mt-4 text-xl">What would you like to do?</h2>
      <div className="grid grid gird-cols-1 md:grid-cols-3 w-full md:w-3/4 lg:w-2/3 max-w-lg mt-4 gap-4">
        <Link
          className="px-4 py-2 bg-yellow-500 text-gray-50 rounded focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-center"
          to="/create"
        >
          Create New Game
        </Link>
        <a
          className="px-4 py-2 bg-pink-500 text-gray-50 rounded focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-center"
          href="/"
        >
          {/* TODO: Live game address */}
          Join Game
        </a>
        <a
          className="px-4 py-2 bg-blue-400 text-gray-50 rounded focus:outline-none transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-center"
          href="/"
          onClick={() => logout()}
        >
          Log Out
        </a>
      </div>
      <h3 className="mt-6 text-xl -mb-6">
        <span>My Games </span>
        <span className="font-thin text-gray-700 text-sm">
          {user.games.length}
        </span>
      </h3>
    </header>
  );
};

export default HomepageActions;
