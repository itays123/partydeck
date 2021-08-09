import PageTitle from '../components/PageTitle/PageTitle';
import Spinner from '../components/Spinner/Spinner';
import { AdminOnly } from '../game/gameContextFilters';
import { PlayerAnswerFeeback } from './PlayerAnswerFeedback';
import { SkipButton } from './RoundActionButtons';
import { WaitingForPlayersOnly } from './RoundLogicalWrappers';

export default function RoundLayout() {
  return (
    <div className="flex flex-col items-center w-full h-full py-8">
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
    </div>
  );
}
