import { useFetch } from '../../shared/helpers/useAsyncFetch';

export function useProfile(userId) {
  const { data, isLoading } = useFetch('/' + userId);
  return {
    ...data.user,
    isLoading,
  };
}
