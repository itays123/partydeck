import {
  ConnectionLifecycle,
  GameLifecycle,
  IGameData,
  IRoundState,
  RoundLifecycle,
} from './types';

export const initialGameState: IGameData = {
  connectionStatus: ConnectionLifecycle.PRE_CREATED,
  gameStatus: GameLifecycle.PRE_CREATED,
  isAdmin: false,
  gameCode: undefined,
  playerId: undefined,
  players: new Map([
    ['admin', 'admin'],
    ['player1', 'player1'],
    ['player2', 'player2'],
    ['player3', 'player3'],
    ['player4', 'player4'],
    ['player5', 'player5'],
    ['player6', 'player6'],
    ['player7', 'player7'],
  ]),
  playerCount: 1,
  roundState: {
    status: RoundLifecycle.USE,
    round: 0,
    pickedCardId: '',
    playerWon: '',
    question: '',
    judge: '',
    selectedCardId: '',
    isJudge: false,
    use: [],
    playersUsed: new Map(),
    pick: [],
  },
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
        players: state.players
          ? state.players.set(payload.id, 'You')
          : new Map([[payload.id as string, 'You']]),
      };
    }
    case 'RECONNECTION_AFTER_RENDER': {
      const newRoundState: IRoundState = {
        ...state.roundState,
        status: RoundLifecycle.WAITING_FOR_DATA,
      };
      return {
        ...state,
        gameCode: payload.game,
        playerId: payload.id,
        connectionStatus: ConnectionLifecycle.REFRESHING,
        gameStatus: GameLifecycle.CREATED,
        roundState: newRoundState,
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
    case 'JOINED_MID_GAME': {
      const newRoundState: IRoundState = {
        ...state.roundState,
        status: RoundLifecycle.WAITING_FOR_DATA,
      };
      return {
        ...state,
        gameStatus: GameLifecycle.RESUMED,
        roundState: newRoundState,
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
      const { roundState: prev } = state;
      const { q, j, isJudge, use } = payload;
      const newRoundState: IRoundState = {
        status: isJudge
          ? RoundLifecycle.PENDING_PLAYER_USAGES
          : RoundLifecycle.USE,
        round: prev.round + 1,
        pickedCardId: '',
        selectedCardId: '',
        playerWon: '',
        question: q,
        judge: j,
        isJudge,
        use,
        pick: [],
        playersUsed: new Map(),
      };
      return {
        ...state,
        roundState: newRoundState,
      };
    }
    case 'CARD_SELECTED': {
      const newRoundState: IRoundState = {
        ...state.roundState,
        selectedCardId: payload.selected,
      };
      return { ...state, roundState: newRoundState };
    }
    case 'CARD_USED': {
      const newRoundState: IRoundState = {
        ...state.roundState,
        status: RoundLifecycle.PENDING_PLAYER_USAGES,
      };
      return { ...state, roundState: newRoundState };
    }
    case 'PLAYER_USAGE': {
      const { roundState: prevState } = state;
      const newRoundState: IRoundState = {
        ...prevState,
        playersUsed: prevState.playersUsed.set(
          payload.playerId,
          payload.playerName
        ),
      };
      return { ...state, roundState: newRoundState };
    }
    case 'PICK': {
      const newRoundState: IRoundState = {
        ...state.roundState,
        pick: payload.pick,
        status: state.roundState.isJudge
          ? RoundLifecycle.PICK
          : RoundLifecycle.PENDING_JUDGE_PICK,
      };
      return { ...state, roundState: newRoundState };
    }
    case 'ROUND_ENDED':
    case 'ROUND_ENDED_404': {
      const newRoundState: IRoundState = {
        ...state.roundState,
        playerWon: payload.playerWon,
        pickedCardId: payload.winningCard,
        status: RoundLifecycle.PENDING_ADMIN_ACTION,
      };
      return { ...state, roundState: newRoundState };
    }
    case 'PAUSE': {
      return {
        ...state,
        gameStatus: GameLifecycle.PAUSED,
      };
    }
    case 'GAME_PAUSED': {
      return { ...state, gameStatus: GameLifecycle.PAUSED };
    }
    case 'GAME_RESUMED': {
      return { ...state, gameStatus: GameLifecycle.RESUMED };
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
