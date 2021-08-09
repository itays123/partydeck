import { action } from '../components/contextActionFactory';
import { GameContext } from '../game/GameContext';
import Skip from '../components/glyphs/Skip';

export const SkipButton = action(Skip, GameContext, ctx => ctx.overrideSkip());
