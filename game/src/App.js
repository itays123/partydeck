import GameContextProvider from './game/GameContext';
import Navbar from './navigation/Navbar';

function App() {
  return (
    <div className="app w-screen h-screen bg-purple-600 mx-0">
      <Navbar />
      <GameContextProvider></GameContextProvider>
    </div>
  );
}

export default App;
