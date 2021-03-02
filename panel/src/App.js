import { BrowserRouter, Route } from 'react-router-dom';
import AuthContextProvider from './auth/AuthContext';
import AuthOnly from './auth/AuthOnly';
import Login from './auth/login/Login';
import Profile from './auth/profile/Profile';
import Register from './auth/register/Register';
import CreateGame from './game/create/CreateGame';
import GameViewEdit from './game/GameViewEdit';
import Home from './Home/Home';
import NavWrapper from './shared/Navigation/NavWrapper';
import SearchResults from './shared/Search/SearchResults';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NavWrapper>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/game/:id">
            <GameViewEdit />
          </Route>
          <Route path="/user/:id">
            <Profile />
          </Route>
          <Route path="/login">
            <AuthOnly shouldNotBeAuthenticated redirect="/">
              <Login />
            </AuthOnly>
          </Route>
          <Route path="/start">
            <AuthOnly shouldNotBeAuthenticated redirect="/">
              <Register />
            </AuthOnly>
          </Route>
          <Route path="/search">
            <SearchResults />
          </Route>
          <Route path="/create">
            <AuthOnly redirect="/">
              <CreateGame />
            </AuthOnly>
          </Route>
        </NavWrapper>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
