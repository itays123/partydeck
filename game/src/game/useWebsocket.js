export function useWebsocket(context) {
  const { setGameCode } = context;
  return {
    join: (gameCode, name) => {
      setGameCode(gameCode);
    },
  };
}
