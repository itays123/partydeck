import { createWrapper } from '../../shared/Filters/ConditionalWrapper';
import { GameEditorContext } from '../GameEditorContext';

export const ExistingGamesOnly = createWrapper(
  GameEditorContext,
  ctx => !ctx.isGameNew
);

const NewGamesOnly = createWrapper(GameEditorContext, ctx => !ctx.isGameNew);

export default NewGamesOnly;
