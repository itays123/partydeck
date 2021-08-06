import { createFormInput } from '../../shared/forms/formInputFactory';
import { AuthFormContext } from './AuthFormProvider';

export const NameInputField = createFormInput({
  context: AuthFormContext,
  name: 'name',
  label: 'Your Name',
  hint: 'Donald Duck',
  onKeyEnter: () => {},
});

export const EmailInputField = createFormInput({
  context: AuthFormContext,
  name: 'email',
  label: 'Your Email',
  type: 'email',
  hint: 'you@example.com',
  onKeyEnter: ctx => ctx.checkEmail(),
});

export const PasswordConfirmInputField = createFormInput({
  context: AuthFormContext,
  name: 'passwordConfirm',
  label: 'Your Password',
  type: 'password',
  hint: '********',
  onKeyEnter: () => {},
});

export const PasswordInputField = createFormInput({
  context: AuthFormContext,
  name: 'password',
  label: 'Your Password',
  type: 'password',
  hint: '********',
  onKeyEnter: ctx => ctx.onSubmit(),
});
