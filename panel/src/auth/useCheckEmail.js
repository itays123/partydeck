export function useCheckEmail() {
  return {
    check(email) {
      setTimeout(() => {
        return 200; // 409
      }, 1000);
    },
  };
}
