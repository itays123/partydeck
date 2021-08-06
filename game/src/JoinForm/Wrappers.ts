import { createWrapper } from '../components/logicalWrapperFactory';
import { JoinFormContext, JoinFormStage } from './JoinFormProvider';

export const TypingCode = createWrapper(
  JoinFormContext,
  ctx => ctx.stage === JoinFormStage.CODE
);
export const ValidatingCode = createWrapper(
  JoinFormContext,
  ctx => ctx.stage === JoinFormStage.VALIDATING_CODE
);
export const TypingName = createWrapper(
  JoinFormContext,
  ctx => ctx.stage === JoinFormStage.NAME
);
export const JoiningGame = createWrapper(
  JoinFormContext,
  ctx => ctx.stage === JoinFormStage.LOADING
);
