import { useState } from 'react';
import { useFetch } from '../../shared/helpers/useAsyncFetch';
import { useAuthContext } from '../AuthContext';

export default function useLogin() {
  const { setSignedIn } = useAuthContext();
  const { doFetch, isLoading } = useFetch('/auth/login', 'POST', false);
  const [loginFailed, setLoginFailed] = useState(false);

  return {
    isLoginLoading: isLoading,
    loginFailed: loginFailed,
    login(email, password) {
      doFetch({ email: String(email).toLowerCase(), password }).then(res => {
        setLoginFailed(res.status === 401);
        setSignedIn(res.status === 200);
      });
    },
    clearError() {
      setLoginFailed(false);
    },
  };
}
