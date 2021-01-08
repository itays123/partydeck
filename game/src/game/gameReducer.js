export const initialGameState = {
  players: [],
  gameCode: undefined,
  round: 0,
  playerCount: 1,
  pickedCardId: '',
  playerWon: '',
  question: '',
  judge: '',
  selectedCardId: '',
  isJudge: false,
  use: [],
  pick: [],
  useMode: true,
  showEndScreen: false,
  scoreboard: [],
};

export function gameReducer(state, { type, payload }) {
  switch (type) {
    case 'JOINED': {
      return { ...state, gameCode: payload.gameCode };
    }
    case 'PLAYER_JOINED': {
      const newPlayers = [...state.players, payload.joined];
      const newCount = payload.count;
      return {
        ...state,
        players: newPlayers,
        playerCount: newCount,
        isAdmin: payload.isAdmin,
      };
    }
    case 'PLAYER_LEFT': {
      const index = state.players.findIndex(p => p === payload.left);
      const newPlayers = state.players.splice(index, 1);
      const newCount = payload.count;
      return {
        ...state,
        players: newPlayers,
        playerCount: newCount,
        isAdmin: payload.isAdmin,
      };
    }
    case 'ROUND_STARTED': {
      const round = state.round + 1;
      const pickedCardId = '';
      const playerWon = '';
      const question = payload.q;
      const judge = payload.j;
      const selectedCardId = '';
      const isJudge = payload.isJudge;
      const use = isJudge ? [] : payload.use;
      const pick = [];
      const useMode = !isJudge;
      return {
        ...state,
        round,
        pickedCardId,
        playerWon,
        question,
        judge,
        selectedCardId,
        isJudge,
        use,
        pick,
        useMode,
      };
    }
    case 'CARD_SELECTED': {
      return { ...state, selectedCardId: payload.selected };
    }
    case 'CARD_USED': {
      return { ...state, useMode: false };
    }
    case 'PICK': {
      return { ...state, pick: payload.pick };
    }
    case 'ROUND_ENDED': {
      return {
        ...state,
        playerWon: payload.playerWon,
        pickedCardId: payload.winningCard,
        isAdmin: payload.isAdmin,
      };
    }
    case 'ROUND_ENDED_404': {
      return {
        ...state,
        playerWon: '',
        pickedCardId: '',
      };
    }
    case 'GAME_ENDED': {
      return {
        ...state,
        showEndScreen: true,
        scoreboard: payload.scores,
      };
    }
    default: {
      return state;
    }
  }
}
