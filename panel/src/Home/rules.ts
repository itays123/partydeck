import CardPick from '../components/glyphs/CardPick';
import JudgePick from '../components/glyphs/JudgePick';
import Question from '../components/glyphs/Question';
import Victory from '../components/glyphs/Victory';
import { createDecoratedText } from '../components/decoratedTextFactory';

export const JudgePickedRule = createDecoratedText(
  JudgePick,
  'Each round, a judge is picked',
  'p'
);
export const QuestionRule = createDecoratedText(
  Question,
  'The other players are given a question and and 4 answer cards, and pick the funniest or most clever answer of their choice',
  'p'
);
export const BestMatchRule = createDecoratedText(
  CardPick,
  'The judge gets the question and the answers displayed anonymously, and picks the best answer of their choice',
  'p'
);
export const VictoryRule = createDecoratedText(
  Victory,
  'The player who submitted the answer, wins the round!',
  'p'
);
