import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './auth/AuthContext';
import About from './about/About';
import CookieDataPolicy from './about/CookieDataPolicy';
import CreatingDecksGuide from './about/CreatingDecksGuide';
import CreateGame from './game/CreateGame';
import GameViewEdit from './game/GameViewEdit';
import Home from './Home/Home';
import NavWrapper from './components/Navigation/NavWrapper';
import { AuthProtectedPage } from './auth/AuthProtectedPage';
import MyDecks from './library/MyDecks';
import GameLibrary from './library/GameLibrary';
import LoginModal from './auth/LoginModal';
import RegisterModal from './auth/RegisterModal';
import PageNotFound from './library/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <NavWrapper>
          <LoginModal />
          <RegisterModal />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/my">
              <AuthProtectedPage>
                <MyDecks />
              </AuthProtectedPage>
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
            <Route path="/search">
              <GameLibrary />
            </Route>
            <Route path="/create">
              <AuthProtectedPage>
                <CreateGame />
              </AuthProtectedPage>
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </NavWrapper>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
