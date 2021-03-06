export const initialGameState = {
  isConnected: true,
  isStarted: false,
  gameCode: undefined,
  round: 0,
  playerCount: 1,
  pickedCardId: '',
  playerWon: '',
  question: '',
  judge: '',
  selectedCardId: '',
  isJudge: false,
  skipped: false,
  use: [],
  playersUsed: new Map(),
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
      const newCount = payload.count;
      return {
        ...state,
        playerCount: newCount,
        isAdmin: payload.isAdmin,
      };
    }
    case 'PLAYER_LEFT': {
      const newCount = payload.count;
      return {
        ...state,
        playerCount: newCount,
        isAdmin: payload.isAdmin,
      };
    }
    case 'GAME_STARTED': {
      return { ...state, isStarted: true };
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
        playersUsed: new Map(),
        skipped: false,
      };
    }
    case 'CARD_SELECTED': {
      return { ...state, selectedCardId: payload.selected };
    }
    case 'CARD_USED': {
      return { ...state, useMode: false };
    }
    case 'PLAYER_USAGE': {
      return {
        ...state,
        playersUsed: state.playersUsed.set(
          payload.playerId,
          payload.playerName
        ),
      };
    }
    case 'PICK': {
      return { ...state, pick: payload.pick };
    }
    case 'ROUND_ENDED': {
      return {
        ...state,
        playerWon: payload.playerWon,
        pickedCardId: payload.winningCard,
      };
    }
    case 'ROUND_ENDED_404': {
      return {
        ...state,
        playerWon: '',
        pickedCardId: '',
        skipped: true,
      };
    }
    case 'GAME_ENDED': {
      return {
        ...state,
        showEndScreen: true,
        scoreboard: payload.scores,
      };
    }
    case 'DISCONNECTED': {
      return { ...state, isConnected: false };
    }
    default: {
      return state;
    }
  }
}
