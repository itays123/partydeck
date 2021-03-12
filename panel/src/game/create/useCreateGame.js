import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../../shared/helpers/useAsyncFetch';

export function useCreateGame() {
  const history = useHistory();
  const { isLoading, doFetch, data } = useFetch('/game', 'POST', false);

  useEffect(() => {
    if (data.id && !isLoading) {
      history.push('/');
    }
  }, [data, history, isLoading]);

  return {
    isLoading,
    create(game) {
      doFetch(game);
    },
  };
}
