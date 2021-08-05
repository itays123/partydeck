import { useFetch } from '../../shared/helpers/useFetch';

export function useProfile(userId) {
  const { data, isLoading, status } = useFetch('/' + userId);
  return {
    ...data.user,
    status,
    isLoading,
  };
}
