import { createRoundWrapper } from '../game/GameContext';
import { RoundLifecycle } from '../game/types';

export const ActivePlayer = createRoundWrapper(
  ({ status }) =>
    status === RoundLifecycle.USE || status === RoundLifecycle.PICK
);
export const NotSkipped = createRoundWrapper(
  ({ status, playerWon }) =>
    status !== RoundLifecycle.PENDING_ADMIN_ACTION || !!playerWon
);
export const PendingNextRoundOnly = createRoundWrapper(
  ({ status }) => status === RoundLifecycle.PENDING_ADMIN_ACTION
);
export const UsingOnly = createRoundWrapper(
  ({ status }) => status === RoundLifecycle.USE
);
export const PickOptionsReady = createRoundWrapper(
  ({ status }) =>
    status === RoundLifecycle.PICK ||
    status === RoundLifecycle.PENDING_JUDGE_PICK
);
export const JudgeOnly = createRoundWrapper(({ isJudge }) => isJudge);
export const WaitingForJudgeOnly = createRoundWrapper(
  ({ status }) => status === RoundLifecycle.PENDING_JUDGE_PICK
);
export const WaitingForPlayersOnly = createRoundWrapper(
  ({ status }) => status === RoundLifecycle.PENDING_PLAYER_USAGES
);
