import { CardPicker } from '../../components/CardPicker/CardPicker';
import { QuestionJudgeDisplay } from '../../components/QuestionJudgeDisplay/QuestionJudgeDisplay';
import { UseBtton } from '../RoundActionButtons';

export default function UseDeckLayout() {
  return (
    <>
      <QuestionJudgeDisplay />
      <CardPicker of="use" />
      <UseBtton className="hovering-button left-8 mx-auto mb-20" />
    </>
  );
}
