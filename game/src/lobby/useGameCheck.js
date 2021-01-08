import { useState } from 'react';

const getRequestUrl = gameCode =>
  `${process.env.REACT_APP_SERVER_URL}/check?code=${gameCode}`;

export function useGameCheck() {
  const [isGameExists, setGameExists] = useState(undefined);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(1);

  return {
    checkGame(code, callback = () => {}) {
      setGameExists(undefined);
      setAwaitingConfirmation(true);
      fetch(getRequestUrl(code))
        .then(res => {
          const result = res.status === 200;
          setGameExists(result);
          setAwaitingConfirmation(false);
          callback(result);
        })
        .catch(() => {
          setAwaitingConfirmation(false);
          setGameExists(false);
          callback(false);
        });
      /*
      if (code.length === 6)
        setTimeout(() => {
          setGameExists(code === '000000');
          setAwaitingConfirmation(false);
          callback(code === '000000');
        }, 3000);
        */
    },
    validateGame(code) {
      if (code.length !== 6) {
        return 'Invalid code';
      } else if (isGameExists === false) {
        return 'Game does not exist';
      } else {
        return undefined;
      }
    },
    awaitingConfirmation,
    clearErrors() {
      setGameExists(undefined);
    },
  };
}
