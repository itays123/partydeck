import { useMemo } from 'react';
import { Wrapper } from '../../components/types';
import { JoinFormStage, useJoinForm } from '../JoinFormProvider';
import useDebouncedValue from './useDebouncedValue';

export function DebouncedStageWrapper({
  renderWhen,
  children,
}: { renderWhen: JoinFormStage } & Wrapper) {
  const { stage } = useJoinForm();
  const debouncedStage = useDebouncedValue(stage, 1000);
  const shouldRender = useMemo(
    () => debouncedStage === renderWhen,
    [renderWhen, debouncedStage]
  );
  return <>{shouldRender ? children : null}</>;
}

function createDebouncedWrapper(stage: JoinFormStage) {
  return function ConditionalWrapper({ children }: Wrapper) {
    return DebouncedStageWrapper({ renderWhen: stage, children });
  };
}

export const DebouncedTypingCode = createDebouncedWrapper(JoinFormStage.CODE);
export const DebouncedVlidatingCode = createDebouncedWrapper(
  JoinFormStage.VALIDATING_CODE
);
export const DebouncedTypingName = createDebouncedWrapper(JoinFormStage.NAME);
export const DebouncedJoining = createDebouncedWrapper(JoinFormStage.LOADING);
