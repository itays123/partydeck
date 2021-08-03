import { createWrapper } from '../../components/logicalWrapeprFactory';
import { GameEditorContext } from '../GameEditorContext';

export const ViewerOnly = createWrapper(
  GameEditorContext,
  ctx => !ctx.isEditable
);

const EditorOnly = createWrapper(GameEditorContext, ctx => ctx.isEditable);

export default EditorOnly;
