import { createContext, useContext } from 'react';
import { useGameContext } from '../game/GameContext';

const RoundContext = createContext();

const RoundContextProvider = ({ children }) => {
  const { round } = useGameContext();
  return (
    <RoundContext.Provider key={round} value={{}}>
      {children}
    </RoundContext.Provider>
  );
};

export function useRoundContext() {
  const context = useContext(RoundContext);
  return context;
}

export default RoundContextProvider;
