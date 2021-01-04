import { useEffect, useState } from 'react';
import { cards, cardsExtended, questions } from './testCards';

export function useWebsocket(context) {
  const { setGameCode, setRound, round } = context;
  const [use, setUse] = useState(cards);
  const [pick, setPick] = useState([]);
  const [useMode, setUseMode] = useState(true);
  const [isJudge, setJudge] = useState(false);
  const [question, setQuestion] = useState('');
  const [selectedCardId, setSelectedCard] = useState(undefined);
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
    setSelectedCard(undefined);
    if (!isJudge) setUse(cards);
    if (isJudge) {
      setTimeout(emitUse, 3000);
    }
    setPick([]);
    setUseMode(true);
  };

  const emitUse = () => {
    // use selectedCard
    setUseMode(false);
    if (!isJudge)
      setTimeout(() => {
        setPick(cardsExtended);
        setTimeout(emitPick, 3000);
      }, 3000);
  };

  const emitPick = () => {
    // use selectedCard
    newRound();
  };

  useEffect(() => {
    if (isJudge)
      setTimeout(function () {
        emitUse();
      }, 3000);
  }, [isJudge]);

  useEffect(() => {
    console.log(selectedCardId);
  }, [selectedCardId]);

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
      if ((useMode && !isJudge) || (!useMode && isJudge)) {
        setSelectedCard(cardId);
      }
    },
    onCardButtonClick: () => {
      if (useMode && !isJudge) {
        emitUse();
      } else if (!useMode && isJudge) {
        emitPick();
      }
    },
    isJudge,
    question,
    selectedCardId,
  };
}
