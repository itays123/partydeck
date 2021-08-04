import GameContextProvider from './game/GameContext';
import Deck from './components/Deck/Deck';
import Question from './round/Question';
import AdminControls from './round/AdminControls';
import JoinForm from './lobby/JoinForm';
import Lobby from './lobby/Lobby';
import Scoreboard from './scoreboard/Scoreboard';
import DisconnectionDialog from './components/UnexpectedDisconnectionDialog/DisconnectionDialog';
import LoadingFeedback from './round/LoadingFeedback';
import ConnectionPauseFeedback from './components/ConnectionPauseFeedback/ConnectionPauseFeedback';
import LocalStorageConnectionRestorer from './components/LocalStorageConnectionRestorer/LocalStorageConnectionRestorer';
import GamePauseFeedback from './components/GamePauseFeedback/GamePauseFeedback';
import InvalidRoundFeedback from './components/InvalidRoundFeedback/InvalidRoundFeedback';
import BrandWrapper from './components/brand/BrandWrapper';
import {
  ConnectionCreatedOnly,
  ConnectionResumedOnly,
  GameCreatedOnly,
  GameStartedOnly,
  GameResumedOnly,
  ValidRoundOnly,
  UnexpectedDisconnectionOnly,
} from './game/gameContextFilters';

function App() {
  return (
    <BrandWrapper>
      <GameContextProvider>
        <LocalStorageConnectionRestorer>
          <ConnectionCreatedOnly fallback={JoinForm}>
            <GameCreatedOnly fallback={Scoreboard}>
              <ConnectionResumedOnly fallback={ConnectionPauseFeedback}>
                <GameStartedOnly fallback={Lobby}>
                  <GameResumedOnly fallback={GamePauseFeedback}>
                    <ValidRoundOnly fallback={InvalidRoundFeedback}>
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
