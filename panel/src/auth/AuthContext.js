import { createContext, useContext } from 'react';

const AuthContext = createContext();

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}

const AuthContextProvider = ({ children }) => {
  const dummyData = {
    isSignedIn: true,
    logout() {},
    user: {
      _id: '1',
      name: 'Itay',
      games: [
        {
          lng: 'en',
          name: 'A Random Deck',
          isPrivate: false,
          questionCount: 12,
          answerCount: 54,
        },
        {
          lng: 'en',
          name: 'A Random Deck #2',
          isPrivate: true,
          questionCount: 43,
          answerCount: 183,
        },
      ],
    },
  };
  return (
    <AuthContext.Provider value={dummyData}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
