import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export function useSaveGame() {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  return {
    isSaveLoading: isLoading,
    save(changes) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        history.push('/game/1');
      }, 3000);
    },
  };
}
