import { useHistory } from 'react-router';
import { useFetch } from '../../shared/helpers/useAsyncFetch';

export function useDeleteGame(gameId) {
  const { doFetch } = useFetch('/game/' + gameId, 'DELETE', false, false);
  const history = useHistory();

  return {
    remove() {
      doFetch().then(() => history.push('/'));
    },
  };
}
