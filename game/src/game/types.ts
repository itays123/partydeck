export interface IGameAtom {
  session: WebSocket | null;
  connectionState: ConnectionLifecycle;
  gameState: GameLifecycle;
  roundState: RoundState;
  gameCode: string;
  playerId: string;
  count: number;
  isAdmin: boolean;
}

export interface RoundState {
  state: RoundLifeCycle;
  round: number;
  playerWon?: string;
  question: string;
  judge: string;
  isJudge: boolean;
  use: string[] | null;
  pick: string[];
  playersUsed: Map<string, string>;
  pickedCardId?: string;
}

export enum GameLifecycle {
  PRE_CREATED,
  CREATED,
  RESUMED,
  PAUSED,
  STOPPED,
  DESTROYED,
}

export enum ConnectionLifecycle {
  PRE_CREATED,
  RESUMED,
  PAUSED,
  DESTOYED,
  DESTROYED_UNEXPECTED,
}

export enum RoundLifeCycle {
  USE,
  PENDING_PLAYER_USAGES,
  PICK,
  PENDING_JUDGE_PICK,
  PENDING_ADMIN_ACTION,
}

export enum BroadcastContext {
  // server to client
  INIT,
  REJOIN,
  PLAYER_JOINED,
  CONNECTION_PAUSE,
  CONNECTION_RESUME,
  PLAYER_LEFT,
  GAME_STARTED,
  ROUND_STARTED,
  PLAYER_USAGE,
  PICK,
  ROUND_ENDED,
  ROUND_ENDED_404,
  GAME_PAUSED,
  GAME_RESUMED,
  GAME_INTERRUPTED,
  GAME_ENDED,
  // client to server
  START,
  STOP,
  SKIP,
  USED,
  PICKED,
  NEXT,
}
