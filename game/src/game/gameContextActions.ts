import { createGameAction } from './GameContext';

export const SkipButton = createGameAction('SKIP', ctx => ctx.overrideSkip());
export const NextButton = createGameAction('NEXT', ctx =>
  ctx.requestNextRound()
);
export const EndGameButton = createGameAction('END GAME', ctx =>
  ctx.manuallyEndGame()
);
