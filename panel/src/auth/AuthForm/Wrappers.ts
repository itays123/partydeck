import { createWrapper } from '../../components/logicalWrapeprFactory';
import { AuthFormContext, AuthFormStage } from './AuthFormProvider';

export const NameAndEmailStage = createWrapper(
  AuthFormContext,
  ctx =>
    ctx.stage === AuthFormStage.TYPING_NAME_EMAIL ||
    ctx.stage === AuthFormStage.VALIDATING_EMAIL
);
export const ValidatingEmail = createWrapper(
  AuthFormContext,
  ctx => ctx.stage === AuthFormStage.VALIDATING_EMAIL
);
export const PasswordStage = createWrapper(
  AuthFormContext,
  ctx =>
    ctx.stage === AuthFormStage.TYPING_PASSWORD ||
    ctx.stage === AuthFormStage.VALIDATING
);
export const Validating = createWrapper(
  AuthFormContext,
  ctx => ctx.stage === AuthFormStage.VALIDATING
);
