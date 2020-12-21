import GameContextProvider from './game/GameContext';
import Navbar from './navigation/Navbar';
import RoundContextProvider from './round/RoundContext';

function App() {
  return (
    <div className="app w-screen h-screen bg-purple-600 mx-0">
      <Navbar />
      <GameContextProvider>
        <RoundContextProvider></RoundContextProvider>
      </GameContextProvider>
    </div>
  );
}

export default App;
