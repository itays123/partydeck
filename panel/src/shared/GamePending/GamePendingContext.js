import { createContext, useContext, useEffect, useState } from 'react';

const GamePendingContext = createContext();

export function useGamePendingContext() {
  return useContext(GamePendingContext);
}

const GamePendingContextProvider = ({ children }) => {
  const [gameId, setGameId] = useState();
  const [liveCode, setLiveCode] = useState();
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    if (gameId) {
      setLoading(true);
      fetch('/api/play/' + gameId)
        .then(res => res.json())
        .then(({ code }) => {
          setLoading(false);
          return code ? setLiveCode(code) : setError(true);
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    }
  }, [gameId]);

  return (
    <GamePendingContext.Provider
      value={{
        isPending: isLoading || !gameId,
        hasError,
        gameId,
        setGameId,
        liveCode,
      }}
    >
      {children}
    </GamePendingContext.Provider>
  );
};

export default GamePendingContextProvider;
