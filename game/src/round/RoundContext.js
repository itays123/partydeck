import { createContext, useState } from 'react';
import { useGameContext } from '../game/GameContext';

const RoundContext = createContext();

const RoundContextProvider = ({ children }) => {
  const [use, setUse] = useState([]);
  const [pick, setPick] = useState([]);
  const [isJudge, setJudge] = useState(false);
  const [question, setQuestion] = useState('');
  const { round } = useGameContext();
  return (
    <RoundContext.Provider key={round} value={{ use, pick, isJudge, question }}>
      {children}
    </RoundContext.Provider>
  );
};

export default RoundContextProvider;
