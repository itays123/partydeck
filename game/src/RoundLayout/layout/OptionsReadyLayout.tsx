import { CardPicker } from '../../components/CardPicker/CardPicker';
import Spinner from '../../components/Spinner/Spinner';
import { QuestionJudgeDisplay } from '../../components/QuestionJudgeDisplay/QuestionJudgeDisplay';
import { PickButton } from '../RoundActionButtons';
import { WaitingForJudgeOnly, JudgeOnly } from '../RoundLogicalWrappers';
import { AdminOnly } from '../../game/gameContextFilters';
import { SkipButton } from '../../game/gameContextActions';

export default function OptionsReadyLayout() {
  return (
    <>
      <QuestionJudgeDisplay />
      <WaitingForJudgeOnly>
        <Spinner label="Waiting For Judge..." className="text-white text-lg" />
        <AdminOnly>
          <SkipButton className="hovering-button" />
        </AdminOnly>
      </WaitingForJudgeOnly>
      <CardPicker of="pick" />
      <JudgeOnly>
        <PickButton className="hovering-button left-8 mx-auto mb-20" />
      </JudgeOnly>
    </>
  );
}
