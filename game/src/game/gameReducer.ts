import { IGameData } from './types';

export const initialGameState: IGameData = {
  isConnected: true,
  isConnectionResumed: false,
  reconnectionAttemptMade: false,
  isStarted: false,
  gameCode: undefined,
  playerId: undefined,
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

export function gameReducer(state: IGameData, { type, payload }: any) {
  switch (type) {
    case 'INIT': {
      return {
        ...state,
        gameCode: payload.game,
        playerId: payload.id,
        isConnectionResumed: true,
      };
    }
    case 'RECONNECTION_AFTER_RENDER': {
      return {
        ...state,
        gameCode: payload.game,
        playerId: payload.id,
        reconnectionAttemptMade: true,
      };
    }
    case 'REJOIN': {
      return {
        ...state,
        isConnectionResumed: true,
        playerId: payload.newId,
        reconnectionAttemptMade: false,
      };
    }
    case 'PLAYER_JOINED':
    case 'CONNECTION_RESUME':
    case 'CONNECTION_PAUSE':
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
      const pick: string[] = [];
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
    case 'SESSION_PAUSED': {
      return {
        ...state,
        isConnectionResumed: false,
        reconnectionAttemptMade: true,
      };
    }
    case 'DISCONNECTED': {
      return { ...state, isConnected: false, isConnectionResumed: false };
    }
    default: {
      return state;
    }
  }
}
