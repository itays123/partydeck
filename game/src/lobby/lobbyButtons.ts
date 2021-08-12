import { action } from '../components/contextActionFactory';
import { createWrapper } from '../components/logicalWrapperFactory';
import { GameContext } from '../game/GameContext';
import Next from '../components/glyphs/Next';

export const EnoughPlayers = createWrapper(
  GameContext,
  ctx => ctx.playerCount >= 3
);

export const StartGameButton = action(Next, GameContext, ctx => ctx.start());
