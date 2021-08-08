import { User } from '../types';
import { useFetch } from '../../shared/helpers/useFetch';

export function useProfile(userId: string) {
  const { data, isLoading, status } = useFetch<unknown, { user: User }>(
    '/' + userId
  );
  return {
    ...data.user,
    status,
    isLoading,
  };
}
