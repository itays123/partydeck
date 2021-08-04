import {
  EndGameButton,
  NextButton,
  SkipButton,
} from '../game/gameContextActions';
import {
  AdminOnly,
  PendingNextRoundOnly,
  WaitingForJudgeOnly,
  WaitingForPlayersOnly,
} from '../game/gameContextFilters';

const AdminControls = () => {
  return (
    <AdminOnly>
      <div className="start-btn absolute bottom-0 left-0 right-0">
        <div className="w-screen max-w-screen-sm mx-auto px-4 pb-6 flex items-center justify-center space-x-4">
          <PendingNextRoundOnly>
            <NextButton className="w-full dark-button" />
            <EndGameButton className="w-full dark-button" />
          </PendingNextRoundOnly>
          <WaitingForJudgeOnly>
            <SkipButton className="w-full dark-button" />
          </WaitingForJudgeOnly>
          <WaitingForPlayersOnly>
            <SkipButton className="w-full dark-button" />
          </WaitingForPlayersOnly>
        </div>
      </div>
    </AdminOnly>
  );
};

export default AdminControls;
