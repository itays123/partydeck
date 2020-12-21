import GameContextProvider from './game/GameContext';
import Navbar from './navigation/Navbar';
import CardPicker from './card/CardPicker';
import RoundContextProvider from './round/RoundContext';
import Deck from './card/Deck';

function App() {
  return (
    <div className="app w-screen h-screen bg-purple-600 mx-0 overflow-y-hidden">
      <Navbar />
      <GameContextProvider>
        <RoundContextProvider>
          <Deck />
        </RoundContextProvider>
      </GameContextProvider>
    </div>
  );
}

export default App;
