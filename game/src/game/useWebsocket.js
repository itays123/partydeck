import { useEffect, useState } from 'react';
import { cards, cardsExtended, questions } from './testCards';

export function useWebsocket(context) {
  const { setGameCode, setRound, round } = context;
  const [use, setUse] = useState(cards);
  const [pick, setPick] = useState([]);
  const [useMode, setUseMode] = useState(true);
  const [isJudge, setJudge] = useState(false);
  const [question, setQuestion] = useState('');
  const [players, setPlayers] = useState([
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
    'player',
  ]);

  const newRound = () => {
    setRound(r => r + 1);
    setQuestion(questions.get(round));
    if (!isJudge) setUse(cards);
    if (isJudge) {
      setTimeout(emitUse, 3000);
    }
    setPick([]);
    setUseMode(true);
  };

  const emitUse = cardId => {
    setUseMode(false);
    if (!isJudge)
      setTimeout(() => {
        setPick(cardsExtended);
        setTimeout(emitPick, 3000);
      }, 3000);
  };

  const emitPick = cardId => {
    newRound();
  };

  useEffect(() => {
    if (isJudge)
      setTimeout(function () {
        emitUse();
      }, 3000);
  }, [isJudge]);

  return {
    join: (gameCode, name) => {
      setGameCode(gameCode);
    },
    start: () => {
      setRound(1);
    },
    players,
    useMode,
    use,
    pick,
    onCardClick: cardId => {
      if (useMode && !isJudge) {
        emitUse(cardId);
      } else if (!useMode && isJudge) {
        emitPick(cardId);
      }
    },
    isJudge,
    question,
  };
}
