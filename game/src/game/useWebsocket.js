import { useReducer } from 'react';
import { initialGameState, gameReducer } from './gameReducer';

export function useWebsocket() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  return {
    ...state,
    join: (gameCode, name) => {},
    start: () => {},
    onCardClick: cardId => {
      dispatch({ type: 'CARD_SELECTED', payload: { selected: cardId } });
    },
    onCardButtonClick: () => {
      if (state.useMode && !state.isJudge) {
        dispatch({ type: 'CARD_USED' });
      } else if (!state.useMode && state.isJudge) {
      }
    },
    manuallyEndGame: () => {},
  };
}
