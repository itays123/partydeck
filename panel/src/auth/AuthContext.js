import { createContext, useContext } from 'react';
import { useFetch } from '../shared/helpers/useFetch';

export const AuthContext = createContext();

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}

const AuthContextProvider = ({ children }) => {
  const { doFetch, data, status, isLoading } = useFetch('/auth/profile');
  const { doFetch: logout } = useFetch('/auth/logout', 'DELETE', false, false);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
