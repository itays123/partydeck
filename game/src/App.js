import GameContextProvider from './game/GameContext';
import Navbar from './shared/Navbar';
import RoundContextProvider from './round/RoundContext';
import Deck from './card/Deck';
import Question from './round/Question';

function App() {
  return (
    <div className="app w-screen h-screen bg-purple-600 mx-0 overflow-y-hidden">
      <Navbar />
      <GameContextProvider>
        <RoundContextProvider>
          <Question />
          <Deck />
        </RoundContextProvider>
      </GameContextProvider>
    </div>
  );
}

export default App;
