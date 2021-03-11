import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export function useCreateGame() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  return {
    isLoading,
    create(game) {
      setLoading(true);
      return new Promise(resolve => {
        setTimeout(() => {
          setLoading(false);
          history.push('/game/1');
          resolve();
        }, 3000);
      });
    },
  };
}
