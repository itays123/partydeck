import { useAuthContext } from '../auth/AuthContext';
import AuthOnly from '../auth/AuthOnly';
import { useProfile } from '../auth/profile/useProfile';
import GameList from '../shared/GameList/GameList';
import Search from '../shared/Search/Search';
import AboutText from './AboutText';
import MyGames from './MyGames';
import SignedOutActions from './SignedOutActions';

const Home = () => {
  return (
    <div className="home scrollable">
      <div className="container mx-auto">
        <AuthOnly shouldNotBeAuthenticated>
          <header className="homepage-actions mt-8 px-8 md:px-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900">
              Welcome!
            </h1>
            <AboutText />
            <div className="grid grid gird-cols-1 md:grid-cols-3 w-full md:w-3/4 lg:w-2/3 max-w-lg mt-4 gap-4">
              <SignedOutActions />
            </div>
          </header>
        </AuthOnly>
        <AuthOnly>
          <MyGames />
        </AuthOnly>
      </div>
    </div>
  );
};

export default Home;
