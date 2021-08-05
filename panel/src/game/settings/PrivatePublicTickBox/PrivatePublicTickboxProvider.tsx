import { action } from '../../../components/buttonFactory';
import Check from '../../../components/glyphs/Check';
import Checkbox from '../../../components/icons/Checkbox';
import { createWrapper } from '../../../components/logicalWrapeprFactory';
import { GameEditorContext } from '../../GameEditorContext';

export const UncheckButton = action(Check, GameEditorContext, ctx =>
  ctx.setPrivate(true)
);
export const CheckButton = action(Checkbox, GameEditorContext, ctx =>
  ctx.setPrivate(false)
);

export const Unchecked = createWrapper(GameEditorContext, ctx => ctx.isPrivate);
export const Checked = createWrapper(GameEditorContext, ctx => !ctx.isPrivate);
