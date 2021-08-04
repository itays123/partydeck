import GameContextProvider from './game/GameContext';
import Deck from './components/Deck/Deck';
import Question from './round/Question';
import AdminControls from './round/AdminControls';
import ConnectionCreatedOnly from './game/filters/ConnectionCreatedOnly';
import JoinForm from './lobby/JoinForm';
import GameStartedOnly from './game/filters/GameStartedOnly';
import Lobby from './lobby/Lobby';
import GameCreatedOnly from './game/filters/GameCreatedOnly';
import Scoreboard from './scoreboard/Scoreboard';
import UnexpectedDisconnectionOnly from './game/filters/UnexpectedDisconnectionOnly';
import DisconnectionDialog from './components/UnexpectedDisconnectionDialog/DisconnectionDialog';
import LoadingFeedback from './round/LoadingFeedback';
import { ConnectionResumedOnly } from './game/filters/ConnectionResumedOnly';
import ConnectionPauseFeedback from './components/ConnectionPauseFeedback/ConnectionPauseFeedback';
import LocalStorageConnectionRestorer from './components/LocalStorageConnectionRestorer/LocalStorageConnectionRestorer';
import GameResumedOnly from './game/filters/GameResumedOnly';
import GamePauseFeeback from './components/GamePauseFeedback/GamePauseFeedback';
import ValidRoundOnly from './round/filters/ValidRoundOnly';
import InvalidRoundFeedback from './components/InvalidRoundFeedback/InvalidRoundFeedback';
import BrandWrapper from './components/brand/BrandWrapper';

function App() {
  return (
    <BrandWrapper>
      <GameContextProvider>
        <LocalStorageConnectionRestorer>
          <ConnectionCreatedOnly fallback={<JoinForm />}>
            <GameCreatedOnly fallback={<Scoreboard />}>
              <ConnectionResumedOnly fallback={<ConnectionPauseFeedback />}>
                <GameStartedOnly fallback={<Lobby />}>
                  <GameResumedOnly fallback={<GamePauseFeeback />}>
                    <ValidRoundOnly fallback={<InvalidRoundFeedback />}>
                      <div className="scrollable">
                        <Question />
                        <LoadingFeedback />
                        <Deck />
                        <AdminControls />
                      </div>
                    </ValidRoundOnly>
                  </GameResumedOnly>
                </GameStartedOnly>
              </ConnectionResumedOnly>
              <UnexpectedDisconnectionOnly>
                <DisconnectionDialog />
              </UnexpectedDisconnectionOnly>
            </GameCreatedOnly>
          </ConnectionCreatedOnly>
        </LocalStorageConnectionRestorer>
      </GameContextProvider>
    </BrandWrapper>
  );
}

export default App;
