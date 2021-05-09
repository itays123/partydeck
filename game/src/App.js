import GameContextProvider from './game/GameContext';
import RoundContextProvider from './round/RoundContext';
import Deck from './card/Deck';
import Question from './round/Question';
import LoadingFeedback from './round/LoadingFeedback';
import NavWrapper from './shared/Navigation/NavWrapper';
import PlayersUsed from './round/PlayersUsed';
import AdminControls from './round/AdminControls';

function App() {
  return (
    <NavWrapper>
      <GameContextProvider>
        <RoundContextProvider>
          <div className="scrollable">
            <Question />
            <LoadingFeedback />
            <PlayersUsed />
            <Deck />
            <AdminControls />
          </div>
        </RoundContextProvider>
      </GameContextProvider>
    </NavWrapper>
  );
}

export default App;
