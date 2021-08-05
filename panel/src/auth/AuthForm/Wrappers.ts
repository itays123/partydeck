import { createWrapper } from '../../components/logicalWrapeprFactory';
import { AuthFormContext, AuthFormStage } from './AuthFormProvider';

export const TypingNameEndEmail = createWrapper(
  AuthFormContext,
  ctx => ctx.stage === AuthFormStage.TYPING_NAME_EMAIL
);
export const ValidatingEmail = createWrapper(
  AuthFormContext,
  ctx => ctx.stage === AuthFormStage.VALIDATING_EMAIL
);
export const TypingPassword = createWrapper(
  AuthFormContext,
  ctx => ctx.stage === AuthFormStage.TYPING_PASSWORD
);
export const Validating = createWrapper(
  AuthFormContext,
  ctx => ctx.stage === AuthFormStage.VALIDATING
);
