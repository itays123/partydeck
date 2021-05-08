import { useReducer, useState } from 'react';
import { initialGameState, gameReducer } from './gameReducer';

const getWSUri = (gameCode, name) =>
  `${process.env.REACT_APP_SERVER_WS}?code=${gameCode}&name=${name}`;

export function useWebsocket() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [ws, setWebsocket] = useState(null);

  const sendMessage = data => {
    if (ws) {
      ws.send(JSON.stringify(data));
    }
  };

  return {
    ...state,
    join: (gameCode, name) => {
      setWebsocket(() => {
        const ws = new WebSocket(getWSUri(gameCode, name));
        ws.onopen = () => {
          dispatch({ type: 'JOINED', payload: { gameCode } });
        };
        ws.onmessage = evt => {
          const data = JSON.parse(evt.data);
          console.log(data);
          if (data.context) dispatch({ type: data.context, payload: data });
        };
        ws.onclose = () => {
          dispatch({ type: 'DISCONNECTED' });
        };
        return ws;
      });
    },
    start: () => {
      sendMessage({ context: 'START' });
    },
    onCardClick: cardId => {
      dispatch({ type: 'CARD_SELECTED', payload: { selected: cardId } });
    },
    onCardButtonClick: () => {
      if (state.useMode && !state.isJudge) {
        dispatch({ type: 'CARD_USED' });
        sendMessage({ used: state.selectedCardId, context: 'USED' });
      } else if (!state.useMode && state.isJudge) {
        sendMessage({ picked: state.selectedCardId, context: 'PICKED' });
      }
    },
    manuallyEndGame: () => {
      sendMessage({ context: 'STOP' });
    },
  };
}
