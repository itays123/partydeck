import PageTitle from '../../components/PageTitle/PageTitle';
import Spinner from '../../components/Spinner/Spinner';
import { AdminOnly } from '../../game/gameContextFilters';
import { PlayerAnswerFeeback } from '../../components/PlayerAnswerFeedback/PlayerAnswerFeedback';
import { SkipButton } from '../RoundActionButtons';
import { Colors, useBackground } from '../../components/theme/useBackground';

export default function BeforeOptionsReadyLayout() {
  useBackground(Colors.THEME);
  return (
    <>
      <PageTitle>Waiting For Responses...</PageTitle>
      <Spinner label="Recieved Answers From:" className="text-white text-lg" />
      <PlayerAnswerFeeback />
      <AdminOnly>
        <SkipButton className="hovering-button" />
      </AdminOnly>
    </>
  );
}
