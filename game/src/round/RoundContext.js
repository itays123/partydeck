import { createContext, useContext } from 'react';
import { useGameContext } from '../game/GameContext';
import Waiting from './Waiting';

const RoundContext = createContext();

const RoundContextProvider = ({ children }) => {
  const { useMode, pick, isJudge, round } = useGameContext();
  return (
    <RoundContext.Provider key={round} value={{ status: 'Awaiting' }}>
      {!useMode && !pick.length && <Waiting text="Waiting for Players..." />}
      {useMode && isJudge && <Waiting text="Waiting for Players..." />}
      {!isJudge && !!pick.length && <Waiting text="Waiting for Judge..." />}
      {children}
    </RoundContext.Provider>
  );
};

export function useRoundContext() {
  const context = useContext(RoundContext);
  return context;
}

export default RoundContextProvider;
