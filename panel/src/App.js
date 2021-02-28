import { BrowserRouter, Route } from 'react-router-dom';
import AuthContextProvider from './auth/AuthContext';
import Login from './auth/login/Login';
import Profile from './auth/profile/Profile';
import Register from './auth/register/Register';
import GameView from './game/view/GameView';
import NavWrapper from './shared/Navigation/NavWrapper';
import SearchResults from './shared/Search/SearchResults';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NavWrapper>
          <Route exact path="/">
            <Profile />
          </Route>
          <Route path="/game/:id">
            <GameView />
          </Route>
          <Route path="/user/:id">
            <Profile />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/start">
            <Register />
          </Route>
          <Route path="/search">
            <SearchResults />
          </Route>
        </NavWrapper>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
