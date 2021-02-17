import { BrowserRouter, Route } from 'react-router-dom';
import { useProfile } from './auth/profile/useProfile';
import GameView from './game/view/GameView';
import GameList from './shared/GameList/GameList';

function App() {
  const profile = useProfile('');
  return (
    <BrowserRouter>
      <div className="app w-screen h-screen bg-gray-200 mx-0 overflow-y-hidden">
        <Route exact path="/">
          <GameList sharedAuthor={profile} games={profile.games} />
        </Route>
        <Route path="/game/:id">
          <GameView />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
