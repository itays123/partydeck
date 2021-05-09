import { createContext, useContext, useEffect, useState } from 'react';
import { useFetch } from '../helpers/useAsyncFetch';

const GamePendingContext = createContext();

export function useGamePendingContext() {
  return useContext(GamePendingContext);
}

const GamePendingContextProvider = ({ children }) => {
  const [gameId, setGameId] = useState();
  const [liveCode, setLiveCode] = useState();
  const { data, doFetch, isLoading, status } = useFetch(
    '/play/' + gameId,
    'GET',
    false
  );

  useEffect(() => {
    if (gameId && status !== 500) doFetch();
  }, [gameId, doFetch, status]);

  useEffect(() => {
    if (data.code && !isLoading && data.code !== 500) setLiveCode(data.code);
  }, [data, isLoading]);

  return (
    <GamePendingContext.Provider
      value={{
        isPending: isLoading || !gameId,
        hasError: status === 500,
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
