import { Card, ConnectionLifecycle, GameLifecycle, IGameData } from './types';

export const initialGameState: IGameData = {
  connectionStatus: ConnectionLifecycle.PRE_CREATED,
  gameStatus: GameLifecycle.PRE_CREATED,
  isAdmin: false,
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
  scoreboard: [],
};

export function gameReducer(
  state: IGameData,
  { type, payload }: any
): IGameData {
  switch (type) {
    case 'INIT': {
      return {
        ...state,
        gameCode: payload.game,
        playerId: payload.id,
        connectionStatus: ConnectionLifecycle.RESUMED,
        gameStatus: GameLifecycle.CREATED,
      };
    }
    case 'RECONNECTION_AFTER_RENDER': {
      return {
        ...state,
        gameCode: payload.game,
        playerId: payload.id,
        connectionStatus: ConnectionLifecycle.REFRESHING,
        gameStatus: GameLifecycle.CREATED,
      };
    }
    case 'REFRESH_FAILED': {
      return { ...state, connectionStatus: ConnectionLifecycle.PRE_CREATED };
    }
    case 'REJOIN': {
      return {
        ...state,
        connectionStatus: ConnectionLifecycle.RESUMED,
        playerId: payload.newId,
        gameCode: payload.game,
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
      return { ...state, gameStatus: GameLifecycle.RESUMED };
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
      const pick: Card[] = [];
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
        gameStatus: GameLifecycle.STOPPED,
        scoreboard: payload.scores,
      };
    }
    case 'GAME_INTERRUPTED': {
      return {
        ...state,
        gameStatus: GameLifecycle.DESTROYED,
      };
    }
    case 'SESSION_PAUSED': {
      return {
        ...state,
        connectionStatus: ConnectionLifecycle.PAUSED,
      };
    }
    case 'DISCONNECTED': {
      return { ...state, connectionStatus: ConnectionLifecycle.DESTROYED };
    }
    case 'GOING_AWAY': {
      return { ...state, connectionStatus: ConnectionLifecycle.GOING_AWAY };
    }
    default: {
      return state;
    }
  }
}
