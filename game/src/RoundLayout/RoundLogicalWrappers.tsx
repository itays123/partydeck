import { useMemo } from 'react';
import { Wrapper } from '../components/types';
import { createRoundWrapper, useCurrentRound } from '../game/GameContext';
import { RoundLifecycle } from '../game/types';
import useDebouncedValue from '../JoinForm/animations/useDebouncedValue';

export function createRoundStatusDebouncedWrapper(
  consumer: (status: RoundLifecycle) => boolean
) {
  return function DebouncedLogicalWrapper({ children }: Wrapper) {
    const { status } = useCurrentRound();
    const debouncedStatus = useDebouncedValue(status, 1000);
    const shouldRender = useMemo(
      () => consumer(debouncedStatus),
      [debouncedStatus]
    );
    return <>{shouldRender ? children : null}</>;
  };
}

export const ActivePlayer = createRoundWrapper(
  ({ status }) =>
    status === RoundLifecycle.USE || status === RoundLifecycle.PICK
);
export const NotSkipped = createRoundWrapper(
  ({ status, playerWon }) =>
    status !== RoundLifecycle.PENDING_ADMIN_ACTION ||
    (!!playerWon && playerWon.length > 0)
);
export const Skipped = createRoundWrapper(
  ({ status, playerWon }) =>
    status === RoundLifecycle.PENDING_ADMIN_ACTION &&
    (!playerWon || playerWon.length === 0)
);
export const PendingNextRoundOnly = createRoundStatusDebouncedWrapper(
  status => status === RoundLifecycle.PENDING_ADMIN_ACTION
);
export const UsingOnly = createRoundStatusDebouncedWrapper(
  status => status === RoundLifecycle.USE
);
export const PickOptionsReady = createRoundStatusDebouncedWrapper(
  status =>
    status === RoundLifecycle.PICK ||
    status === RoundLifecycle.PENDING_JUDGE_PICK
);
export const JudgeOnly = createRoundWrapper(({ isJudge }) => isJudge);
export const WaitingForJudgeOnly = createRoundWrapper(
  ({ status }) => status === RoundLifecycle.PENDING_JUDGE_PICK
);
export const WaitingForPlayersOnly = createRoundStatusDebouncedWrapper(
  status => status === RoundLifecycle.PENDING_PLAYER_USAGES
);
