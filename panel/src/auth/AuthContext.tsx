import { createContext, useContext, useEffect } from 'react';
import { createWrapper } from '../components/logicalWrapeprFactory';
import { ModalHook } from '../components/Modal/types';
import useModal from '../components/Modal/useModal';
import { Wrapper } from '../components/types';
import { useFetch } from '../shared/helpers/useFetch';
import { User } from './types';

interface IAuthContext {
  isLoading: boolean;
  isSignedIn: boolean;
  refresh(): void;
  logout(): void;
  user: User;
  loginModal: ModalHook;
  registerModal: ModalHook;
}

export const AuthContext = createContext({} as IAuthContext);

export function useAuthContext() {
  return useContext(AuthContext);
}

export const Authenticated = createWrapper(AuthContext, ctx => ctx.isSignedIn);
export const NotAuthenticated = createWrapper(
  AuthContext,
  ctx => !ctx.isSignedIn && !ctx.isLoading
);

const AuthContextProvider = ({ children }: Wrapper) => {
  const { doFetch, data, status, isLoading } = useFetch<
    undefined,
    { user: User }
  >('/auth/profile');
  const { doFetch: logout } = useFetch('/auth/logout', 'DELETE', false, false);
  const loginModal = useModal();
  const registerModal = useModal();

  useEffect(() => {
    if (status === 200) {
      loginModal.close();
      registerModal.close();
    }
  }, [loginModal, registerModal, status]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isSignedIn: status === 200,
        refresh() {
          doFetch();
        },
        logout() {
          logout().then(() => window.location.reload());
        },
        user: data.user,
        loginModal,
        registerModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
