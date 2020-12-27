import { useState } from 'react';

export function useGameCheck() {
  const [isGameExists, setGameExists] = useState(undefined);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(true);

  return {
    checkGame(code, callback = () => {}) {
      setGameExists(undefined);
      setAwaitingConfirmation(true);
      if (code.length === 6)
        setTimeout(() => {
          setGameExists(code === '000000');
          setAwaitingConfirmation(false);
          callback(code === '000000');
        }, 3000);
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
  };
}
