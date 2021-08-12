import { action } from '../../components/buttonFactory';
import { AuthFormContext } from './AuthFormProvider';

export const CheckEmailButton = action(
  'GO',
  AuthFormContext,
  ctx => (ctx.email.error ? ctx.email.showErrors() : ctx.checkEmail()),
  ctx => !!ctx.email.error
);
export const SubmitButton = action(
  'GO',
  AuthFormContext,
  ctx => (ctx.password.error ? ctx.password.showErrors() : ctx.onSubmit()),
  ctx => !!ctx.password.error
);
