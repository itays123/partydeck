import { useFetch } from '../../shared/helpers/useFetch';
import { useAuthContext } from '../AuthContext';

export function useRegister() {
  const { refresh } = useAuthContext();
  const { doFetch, isLoading } = useFetch('/auth/register', 'POST', false);

  return {
    isRegisterLoading: isLoading,
    register(name, email, password) {
      const body = {
        name,
        email: String(email).toLowerCase(),
        password,
      };
      doFetch(body).then(refresh);
    },
  };
}
