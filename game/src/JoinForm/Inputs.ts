import { createFormInput } from '../components/forms/formInputFactory';
import { JoinFormContext } from './JoinFormProvider';

export const GameCodeInput = createFormInput({
  context: JoinFormContext,
  name: 'gameCode',
  hint: 'GAME CODE',
  onKeyEnter: ctx => ctx.checkGame(),
});

export const NameInput = createFormInput({
  context: JoinFormContext,
  name: 'name',
  hint: 'Your Nickname',
  onKeyEnter: ctx => ctx.join(),
  hideErrors: true,
});
