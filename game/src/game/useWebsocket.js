export function useWebsocket(context) {
  const { setGameCode, setRound } = context;
  return {
    join: (gameCode, name) => {
      setGameCode(gameCode);
    },
    start: () => {
      setRound(1);
    },
  };
}
