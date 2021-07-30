import AuthOnly from '../auth/AuthOnly';
import MyGames from './MyGames';
import Welcome from './Welcome';

const Home = () => {
  return (
    <div className="home scrollable">
      {/* }
      <div className="container mx-auto">
        <AuthOnly shouldNotBeAuthenticated>
          <Welcome />
        </AuthOnly>
        <AuthOnly>
          <MyGames />
        </AuthOnly>
      </div>
  { */}
    </div>
  );
};

export default Home;
