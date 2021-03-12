import { createContext, useContext, useState } from 'react';
import { useFetch } from '../shared/helpers/useAsyncFetch';

const AuthContext = createContext();

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}

const AuthContextProvider = ({ children }) => {
  const { doFetch, data, status, isLoading } = useFetch('/auth/profile');

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isSignedIn: status === 200,
        refresh() {
          doFetch();
        },
        logout() {},
        user: data.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
