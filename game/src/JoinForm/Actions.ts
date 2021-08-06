import { action } from '../components/contextActionFactory';
import { JoinFormContext } from './JoinFormProvider';
import Next from '../components/glyphs/Next';

export const CheckCodeButton = action(
  Next,
  JoinFormContext,
  ({ gameCode, checkGame }) =>
    gameCode.error ? gameCode.showErrors() : checkGame()
);
export const JoinGameButton = action(Next, JoinFormContext, ({ name, join }) =>
  name.error ? name.showErrors() : join()
);
