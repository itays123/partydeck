import { useHistory } from 'react-router';
import { useFetch } from '../../shared/helpers/useFetch';

export function useDeleteGame(gameId: string) {
  const { doFetch } = useFetch('/game/' + gameId, 'DELETE', false, false);
  const history = useHistory();

  return {
    remove() {
      doFetch().then(() => history.push('/'));
    },
  };
}
