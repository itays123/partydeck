import { useState } from 'react';
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
    setUse(cards);
    setPick([]);
    setUseMode(true);
  };

  const emitUse = cardId => {
    setUseMode(false);
    setTimeout(() => {
      setPick(cardsExtended);
    }, 3000);
  };

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
      }
    },
    isJudge,
    question,
  };
}
