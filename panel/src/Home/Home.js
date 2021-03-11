import { useAuthContext } from '../auth/AuthContext';
import AuthOnly from '../auth/AuthOnly';
import GameList from '../shared/GameList/GameList';
import Search from '../shared/Search/Search';
import AboutText from './AboutText';
import SignedInActions from './SignedInActions';
import SignedOutActions from './SignedOutActions';

const Home = () => {
  const { user } = useAuthContext();
  return (
    <div className="home scrollable">
      <div className="container mx-auto">
        <header className="homepage-actions mt-8 px-8 md:px-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900">
            <AuthOnly>Hi {String(user.name).split(' ')[0]}!</AuthOnly>
            <AuthOnly shouldNotBeAuthenticated>Welcome!</AuthOnly>
          </h1>
          <AuthOnly>
            <h2 className="mt-4 text-xl">What would you like to do?</h2>
          </AuthOnly>
          <AuthOnly shouldNotBeAuthenticated>
            <AboutText />
          </AuthOnly>
          <div className="grid grid gird-cols-1 md:grid-cols-3 w-full md:w-3/4 lg:w-2/3 max-w-lg mt-4 gap-4">
            <SignedInActions />
            <SignedOutActions />
          </div>
        </header>
        <AuthOnly>
          <h3 className="mt-6 text-xl md:-mb-6 px-8 md:px-0">
            <span className="font-medium text-2xl pb-2">My Games </span>
            <span className="text-gray-700 text-sm">{user.games.length}</span>
          </h3>
          <div className="md:hidden px-8 md:px-0 mt-2 -mb-4">
            <Search />
          </div>
          <GameList games={user.games} sharedAuthor={user} />
        </AuthOnly>
      </div>
    </div>
  );
};

export default Home;
