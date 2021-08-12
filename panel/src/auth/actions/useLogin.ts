import { useCallback } from 'react';
import { useFetch } from '../../helpers/useFetch';
import { useAuthContext } from '../AuthContext';
import { AuthCredentials } from '../AuthForm/AuthFormProvider';

type LoginCredentials = { email: string; password: string };

export function useLogin() {
  const { refresh } = useAuthContext();
  const { doFetch } = useFetch<LoginCredentials>(
    '/auth/login',
    'POST',
    false,
    false
  );
  return useCallback(
    ({ email, password }: AuthCredentials) =>
      doFetch({ email, password }).then(({ status }) => {
        const result = status === 200;
        if (result) refresh();
        return result;
      }),
    [doFetch, refresh]
  );
}
