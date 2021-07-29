const LocalStorageUtils = {
  getValues() {
    return [localStorage.getItem('gameCode'), localStorage.getItem('playerId')];
  },
  setValues(code: string, id: string) {
    localStorage.setItem('gameCode', code);
    localStorage.setItem('playerId', id);
  },
  deleteValues() {
    localStorage.removeItem('gameCode');
    localStorage.removeItem('playerId');
  },
};

export default LocalStorageUtils;
