import { action } from '../components/contextActionFactory';
import { GameContext } from '../game/GameContext';
import Skip from '../components/glyphs/Skip';
import Use from '../components/glyphs/Use';
import Victory from '../components/glyphs/Victory';
import Next from '../components/glyphs/Next';

export const SkipButton = action(Skip, GameContext, ctx => ctx.overrideSkip());
export const UseButton = action(Use, GameContext, ctx =>
  ctx.onCardButtonClick()
);
export const PickButton = action(Victory, GameContext, ctx =>
  ctx.onCardButtonClick()
);
export const NextRoundButton = action(Next, GameContext, ctx =>
  ctx.requestNextRound()
);
export const EndGameButton = action(Skip, GameContext, ctx =>
  ctx.manuallyEndGame()
);
