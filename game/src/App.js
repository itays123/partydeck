import GameContextProvider from './game/GameContext';
import RoundContextProvider from './round/RoundContext';
import Deck from './card/Deck';
import Question from './round/Question';
import LoadingFeedback from './round/LoadingFeedback';
import NavWrapper from './shared/Navigation/NavWrapper';

function App() {
  return (
    <NavWrapper>
      <GameContextProvider>
        <RoundContextProvider>
          <Question />
          <LoadingFeedback />
          <Deck />
        </RoundContextProvider>
      </GameContextProvider>
    </NavWrapper>
  );
}

export default App;
