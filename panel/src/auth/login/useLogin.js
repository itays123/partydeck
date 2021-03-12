import { useFetch } from '../../shared/helpers/useAsyncFetch';
import { useAuthContext } from '../AuthContext';

export default function useLogin() {
  const { setSignedIn } = useAuthContext();
  const { doFetch, isLoading } = useFetch('/auth/login', 'POST', false);

  return {
    isLoginLoading: isLoading,
    login(email, password) {
      doFetch({ email: String(email).toLowerCase(), password }).then(res => {
        setSignedIn(res.status === 200);
      });
    },
  };
}
