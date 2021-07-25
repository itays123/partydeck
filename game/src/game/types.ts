export interface IGameContext {
  connectionState: ConnectionLifecycle;
  gameState: GameLifecycle;
  roundState: RoundState;
  gameCode: string;
  playerId: string;
  count: number;
  isAdmin: boolean;
}

type Card = { id: string; content: string };

export interface IGameData {
  isConnected: boolean;
  isConnectionResumed: boolean;
  isStarted: boolean;
  gameCode?: string;
  playerId?: string;
  round: number;
  playerCount: number;
  pickedCardId: string;
  playerWon: string;
  question: string;
  judge: string;
  selectedCardId: string;
  isJudge: boolean;
  skipped: boolean;
  use: Card[];
  playersUsed: Map<string, string>;
  pick: Card[];
  useMode: boolean;
  showEndScreen: boolean;
  scoreboard: any[];
}

export interface IGameContextValue extends IGameData {
  join(gameCode: string, name: string): void;
  start(): void;
  overrideSkip(): void;
  requestNextRound(): void;
  manuallyEndGame(): void;
  onCardClick(cardId: string): void;
  onCardButtonClick(): void;
}

export interface RoundState {
  state: RoundLifecycle;
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
  FINISHED,
  DESTROYED,
}

export enum RoundLifecycle {
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

export type SessionConnectHandler = (ev: Event) => any;
export type SessionMessageHnalder = (ev: MessageEvent<any>) => any;
export type SessionDisconnectHandler = (ev: Event) => any;
