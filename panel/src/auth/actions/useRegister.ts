import { useCallback } from 'react';
import { useFetch } from '../../shared/helpers/useFetch';
import { useAuthContext } from '../AuthContext';
import { AuthCredentials } from '../AuthForm/AuthFormProvider';

type RegisterCredentials = { email: string; password: string; name: string };

export function useRegister() {
  const { refresh } = useAuthContext();
  const { doFetch } = useFetch<RegisterCredentials>(
    '/auth/register',
    'POST',
    false,
    false
  );
  return useCallback(
    ({ email, password, name }: AuthCredentials) =>
      doFetch({ email, password, name }).then(({ status }) => {
        const result = status === 201;
        if (result) refresh();
        return result;
      }),
    [doFetch, refresh]
  );
}
