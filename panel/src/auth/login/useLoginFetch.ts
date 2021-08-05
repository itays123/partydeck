import { useState } from 'react';
import { useFetch } from '../../shared/helpers/useFetch';
import { useAuthContext } from '../AuthContext';

type LoginCredentials = { email: string; password: string };

export function useLogin() {
  const { refresh } = useAuthContext();
  const { doFetch, isLoading } = useFetch<LoginCredentials>(
    '/auth/login',
    'POST',
    false
  );
  const [loginFailed, setLoginFailed] = useState(false);

  return {
    isLoginLoading: isLoading,
    loginFailed: loginFailed,
    login(email: string, password: string) {
      doFetch({ email: email.toLowerCase(), password }).then(res => {
        setLoginFailed(res.status === 401);
        if (res.status === 200) refresh();
      });
    },
    clearError() {
      setLoginFailed(false);
    },
  };
}
