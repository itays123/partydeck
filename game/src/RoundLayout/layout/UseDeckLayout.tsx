import { CardPicker } from '../../components/CardPicker/CardPicker';
import { QuestionJudgeDisplay } from '../../components/QuestionJudgeDisplay/QuestionJudgeDisplay';
import { Colors, useBackground } from '../../components/theme/useBackground';
import { UseButton } from '../RoundActionButtons';

export default function UseDeckLayout() {
  useBackground(Colors.THEME);
  return (
    <>
      <QuestionJudgeDisplay />
      <CardPicker of="use" />
      <UseButton className="hovering-button left-8 mx-auto mb-20" />
    </>
  );
}
