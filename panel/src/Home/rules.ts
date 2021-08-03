import CardPick from '../components/glyphs/CardPick';
import JudgePick from '../components/glyphs/JudgePick';
import Question from '../components/glyphs/Question';
import Victory from '../components/glyphs/Victory';
import { createDecoratedPharagraph } from '../components/decoratedPharagraphFactory';

export const JudgePickedRule = createDecoratedPharagraph(
  JudgePick,
  'Each round, a judge is picked'
);
export const QuestionRule = createDecoratedPharagraph(
  Question,
  'The other players are given a question and and 4 answer cards, and pick the funniest or most clever answer of their choice'
);
export const BestMatchRule = createDecoratedPharagraph(
  CardPick,
  'The judge gets the question and the answers displayed anonymously, and picks the best answer of their choice'
);
export const VictoryRule = createDecoratedPharagraph(
  Victory,
  'The player who submitted the answer, wins the round!'
);
