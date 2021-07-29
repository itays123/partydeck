export type Card = { id: string; content: string };

export interface IGameData {
  connectionStatus: ConnectionLifecycle;
  gameStatus: GameLifecycle;
  isAdmin: boolean;
  gameCode?: string;
  playerId?: string;
  playerCount: number;
  roundState: IRoundState;
  scoreboard: any[];
}

export interface IGameContextValue extends IGameData {
  join(gameCode: string, name: string): void;
  reconnect(gameCode: string, playerId: string): void;
  close(): void;
  start(): void;
  overrideSkip(): void;
  requestNextRound(): void;
  manuallyEndGame(): void;
  onCardClick(cardId: string): void;
  onCardButtonClick(): void;
}

export interface IRoundState {
  status: RoundLifecycle;
  round: number;
  playerWon?: string;
  question: string;
  judge: string;
  isJudge: boolean;
  use: Card[] | null;
  pick: Card[];
  playersUsed: Map<string, string>;
  pickedCardId?: string;
  selectedCardId: string;
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
  GOING_AWAY,
  REFRESHING,
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
  WAITING_FOR_DATA,
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

export interface Contextable {
  context: string;
}

export type ConnectFN = (
  gameCode: string,
  name: string | null,
  playerId?: string
) => void;

export type SessionHook = [
  ConnectFN,
  <T extends Contextable>(args: T) => void,
  () => void
];
export type PauseHandlerHook = [(fn: ConnectFN) => void, () => void];
