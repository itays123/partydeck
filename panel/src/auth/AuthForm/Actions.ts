import { action } from '../../components/buttonFactory';
import { AuthFormContext } from './AuthFormProvider';

export const checkEmailButton = action('GO', AuthFormContext, ctx =>
  ctx.email.error ? ctx.email.showErrors() : ctx.checkEmail()
);
export const SubmitButton = action('GO', AuthFormContext, ctx =>
  ctx.onSubmit()
);
