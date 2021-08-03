import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './auth/AuthContext';
import AuthOnly from './auth/AuthOnly';
import Login from './auth/login/Login';
import Profile from './auth/profile/Profile';
import Register from './auth/register/Register';
import About from './about/About';
import CookieDataPolicy from './about/CookieDataPolicy';
import CreatingDecksGuide from './about/CreatingDecksGuide';
import CreateGame from './game/CreateGame';
import GameViewEdit from './game/GameViewEdit';
import Home from './Home/Home';
import GameCreationPending from './shared/GamePending/GameCreationPending';
import GamePendingContextProvider from './shared/GamePending/GamePendingContext';
import MyGames from './shared/MyGames';
import NavWrapper from './components/Navigation/NavWrapper';
import PageNotFound from './shared/PageNotFound';
import SearchResults from './library/SearchResults';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <GamePendingContextProvider>
          {/* A small component that is essential for the `/pending` route */}
          <NavWrapper>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/my">
                <AuthOnly redirect="/">
                  <MyGames />
                </AuthOnly>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/about/decks">
                <CreatingDecksGuide />
              </Route>
              <Route exact path="/about/privacy">
                <CookieDataPolicy />
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
              <Route path="/pending">
                <AuthOnly redirect="/">
                  <GameCreationPending />
                </AuthOnly>
              </Route>
              <Route>
                <PageNotFound />
              </Route>
            </Switch>
          </NavWrapper>
        </GamePendingContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
