import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../../helpers/useFetch';
import { Game } from '../types';

type Body = Omit<Game, 'author'>;

export function useCreateGame() {
  const history = useHistory();
  const { isLoading, doFetch, data } = useFetch<Body>('/game', 'POST', false);

  useEffect(() => {
    if (data.id && !isLoading) {
      history.push('/game/' + data.id);
    }
  }, [data, history, isLoading]);

  return {
    isLoading,
    create: doFetch,
  };
}
