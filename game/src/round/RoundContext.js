import { createContext, useContext, useState } from 'react';
import { useGameContext } from '../game/GameContext';
import { cards, cardsExtended } from './testCards';

const RoundContext = createContext();

const RoundContextProvider = ({ children }) => {
  const [use, setUse] = useState(cards);
  const [pick, setPick] = useState(cardsExtended);
  const [isJudge, setJudge] = useState(false);
  const [question, setQuestion] = useState('');
  const { round } = useGameContext();
  return (
    <RoundContext.Provider key={round} value={{ use, pick, isJudge, question }}>
      {children}
    </RoundContext.Provider>
  );
};

export function useRoundContext() {
  const context = useContext(RoundContext);
  return context;
}

export default RoundContextProvider;
