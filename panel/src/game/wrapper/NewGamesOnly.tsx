import { createWrapper } from '../../components/logicalWrapeprFactory';
import { GameEditorContext } from '../GameEditorContext';

export const ExistingGamesOnly = createWrapper(
  GameEditorContext,
  ctx => !ctx.isGameNew
);

const NewGamesOnly = createWrapper(GameEditorContext, ctx => !ctx.isGameNew);

export default NewGamesOnly;
