import { createContext, useContext } from 'react';
import { useGameContext } from '../game/GameContext';
import EndGameButton from './EndGameButton';
import SkipButton from './SkipButton';

const RoundContext = createContext();

const RoundContextProvider = ({ children }) => {
  const {
    useMode,
    pick,
    isJudge,
    round,
    pickedCardId,
    isAdmin,
  } = useGameContext();
  const isActive = (!isJudge && useMode) || (isJudge && pick.length > 0);
  const isWaitingForPlayers = (!useMode || isJudge) && !pick.length;
  const isWaitingForJudge = !isJudge && pick.length > 0 && !pickedCardId;
  const isWaitingForRound = pickedCardId.length > 0 && pick.length > 0;
  return (
    <RoundContext.Provider
      key={round}
      value={{
        isActive,
        isWaitingForPlayers,
        isWaitingForJudge,
        isWaitingForRound,
      }}
    >
      {children}
      {isAdmin && <EndGameButton />}
      {(isWaitingForJudge || isWaitingForPlayers) && isAdmin && <SkipButton />}
    </RoundContext.Provider>
  );
};

export function useRoundContext() {
  const context = useContext(RoundContext);
  return context;
}

export default RoundContextProvider;
