import { BrowserRouter } from 'react-router-dom';
import { useProfile } from './auth/profile/useProfile';
import GameList from './shared/GameList/GameList';

function App() {
  const profile = useProfile('');
  return (
    <BrowserRouter>
      <div className="app w-screen h-screen bg-gray-200 mx-0 overflow-y-hidden">
        <GameList sharedAuthor={profile} games={profile.games} />
      </div>
    </BrowserRouter>
  );
}

export default App;
