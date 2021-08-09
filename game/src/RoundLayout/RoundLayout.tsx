import { CardPicker } from '../components/CardPicker/CardPicker';
import GameCodeDisplay from '../components/GameCodeDisplay/GameCodeDisplay';
import PageTitle from '../components/PageTitle/PageTitle';
import Spinner from '../components/Spinner/Spinner';
import { Colors, useBackground } from '../components/theme/useBackground';
import { AdminOnly } from '../game/gameContextFilters';
import { PlayerAnswerFeeback } from './PlayerAnswerFeedback';
import { QuestionJudgeDisplay } from './QuestionJudgeDisplay';
import { SkipButton } from './RoundActionButtons';
import { UsingOnly, WaitingForPlayersOnly } from './RoundLogicalWrappers';

export default function RoundLayout() {
  useBackground(Colors.THEME);
  return (
    <div className="flex flex-col items-center w-full h-full py-8 px-8">
      <UsingOnly>
        <QuestionJudgeDisplay />
        <CardPicker of="use" />
      </UsingOnly>
      <WaitingForPlayersOnly>
        <PageTitle>Waiting For Responses...</PageTitle>
        <Spinner
          label="Recieved Answers From:"
          className="text-white text-lg"
        />
        <PlayerAnswerFeeback />
        <AdminOnly>
          <SkipButton className="hovering-button" />
        </AdminOnly>
      </WaitingForPlayersOnly>
      <div className="absolute bottom-0 left-0 px-8 py-4">
        <GameCodeDisplay />
      </div>
    </div>
  );
}
