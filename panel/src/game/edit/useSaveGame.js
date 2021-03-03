import { useHistory } from 'react-router-dom';

export function useSaveGame() {
  const history = useHistory();
  return {
    save(changes) {
      history.push('/game/1');
    },
  };
}
