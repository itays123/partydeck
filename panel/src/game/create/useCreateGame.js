import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export function useCreateGame() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  return {
    isLoading,
    create(game) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        history.push('/game/1');
      }, 3000);
    },
  };
}
