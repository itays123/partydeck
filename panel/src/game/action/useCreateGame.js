import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../../shared/helpers/useFetch';

export function useCreateGame() {
  const history = useHistory();
  const { isLoading, doFetch, data } = useFetch('/game', 'POST', false);

  useEffect(() => {
    if (data.id && !isLoading) {
      history.push('/game/' + data.id);
    }
  }, [data, history, isLoading]);

  return {
    isLoading,
    create(game) {
      doFetch(game);
    },
  };
}
