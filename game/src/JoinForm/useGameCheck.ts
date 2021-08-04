export function useGameCheck() {
  return {
    gameFound: false,
    async checkGameExists(code: string) {
      return false;
    },
  };
}
