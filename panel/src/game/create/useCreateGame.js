import { useHistory } from 'react-router-dom';

export function useCreateGame() {
  const history = useHistory();
  return {
    create(game) {
      history.push('/game/1');
    },
  };
}
