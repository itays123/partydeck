import {
  BroadcastContext,
  ConnectionLifecycle,
  GameLifecycle,
  IGameAtom,
  RoundLifeCycle,
  RoundState,
} from './types';

export const updateStateFromContext = (
  context: BroadcastContext,
  data: any,
  prevState: IGameAtom
) => {
  switch (context) {
    case BroadcastContext.INIT:
      return {
        gameCode: data.gameCode,
        playerId: data.id,
        gameState: GameLifecycle.CREATED,
      };

    case BroadcastContext.PLAYER_JOINED:
    case BroadcastContext.PLAYER_LEFT:
      return { count: data.count, isAdmin: data.isAdmin };

    case BroadcastContext.GAME_STARTED:
      return { gameState: GameLifecycle.RESUMED };

    case BroadcastContext.ROUND_STARTED:
    case BroadcastContext.PLAYER_USAGE:
    case BroadcastContext.PICK:
    case BroadcastContext.ROUND_ENDED:
    case BroadcastContext.ROUND_ENDED_404:
      return {
        roundState: {
          ...prevState.roundState,
          ...roundStateChangeHandler(context, data, prevState.roundState),
        },
      };

    case BroadcastContext.GAME_ENDED:
      return {
        gameState: GameLifecycle.STOPPED,
        connectionState: ConnectionLifecycle.DESTOYED,
      };

    case BroadcastContext.GAME_INTERRUPTED:
      return {
        gameState: GameLifecycle.DESTROYED,
        connectionState: ConnectionLifecycle.DESTOYED,
      };

    default:
      return {};
  }
};

const roundStateChangeHandler = (
  context: BroadcastContext,
  data: any,
  prevState: RoundState
) => {
  switch (context) {
    case BroadcastContext.ROUND_STARTED:
      return {
        round: prevState.round + 1,
        isJudge: data.isJudge,
        question: data.q,
        judge: data.j,
        use: data.isJudge ? [] : data.use,
        state: data.isJudge
          ? RoundLifeCycle.PENDING_PLAYER_USAGES
          : RoundLifeCycle.USE,
        pick: [],
        playersUsed: new Map<string, string>(),
        pickedCardId: undefined,
        playerWon: undefined,
      };

    case BroadcastContext.PLAYER_USAGE:
      return {
        playersUsed: prevState.playersUsed.set(data.playerId, data.playerName),
      };

    case BroadcastContext.PICK:
      return {
        pick: data.pick,
        state: prevState.isJudge
          ? RoundLifeCycle.PICK
          : RoundLifeCycle.PENDING_JUDGE_PICK,
      };

    case BroadcastContext.ROUND_ENDED:
      return {
        playerWon: data.playerWon,
        pickedCardId: data.winningCard,
        state: RoundLifeCycle.PENDING_ADMIN_ACTION,
      };

    case BroadcastContext.ROUND_ENDED_404:
      return {
        state: RoundLifeCycle.PENDING_ADMIN_ACTION,
      };

    default:
      return {};
  }
};
