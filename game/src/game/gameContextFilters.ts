import { createLogicalWrapper, createRoundWrapper } from './GameContext';
import { ConnectionLifecycle, GameLifecycle, RoundLifecycle } from './types';

// permissions
export const AdminOnly = createLogicalWrapper(({ isAdmin }) => isAdmin);
export const NotAdmin = createLogicalWrapper(({ isAdmin }) => !isAdmin);

// connection state
export const ConnectionCreatedOnly = createLogicalWrapper(
  ({ connectionStatus }) => connectionStatus !== ConnectionLifecycle.PRE_CREATED
);
export const ConnectionResumedOnly = createLogicalWrapper(
  ({ connectionStatus }) => connectionStatus === ConnectionLifecycle.RESUMED
);
export const UnexpectedDisconnectionOnly = createLogicalWrapper(
  ({ connectionStatus, gameStatus }) =>
    connectionStatus === ConnectionLifecycle.DESTROYED &&
    gameStatus !== GameLifecycle.STOPPED
);

// game state
export const GameCreatedOnly = createLogicalWrapper(
  ({ gameStatus }) =>
    gameStatus !== GameLifecycle.PRE_CREATED &&
    gameStatus !== GameLifecycle.STOPPED
);
export const GameStartedOnly = createLogicalWrapper(
  ({ gameStatus }) => gameStatus !== GameLifecycle.CREATED
);
export const GameResumedOnly = createLogicalWrapper(
  ({ gameStatus }) => gameStatus === GameLifecycle.RESUMED
);

// round state
export const ValidRoundOnly = createRoundWrapper(
  // when a player joins mid-game, the context is waiting for data
  ({ status }) => status !== RoundLifecycle.WAITING_FOR_DATA
);
