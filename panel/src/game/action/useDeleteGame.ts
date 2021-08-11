import { useHistory } from 'react-router';
import { useFetch } from '../../helpers/useFetch';

export function useDeleteGame(gameId: string) {
  const { doFetch, isLoading } = useFetch(
    '/game/' + gameId,
    'DELETE',
    false,
    false
  );
  const history = useHistory();

  return {
    isLoading,
    remove() {
      doFetch().then(() => history.push('/my'));
    },
  };
}
