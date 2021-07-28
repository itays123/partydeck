import GameContextProvider from './game/GameContext';
import RoundContextProvider from './round/RoundContext';
import Deck from './components/Deck/Deck';
import Question from './round/Question';
import NavWrapper from './shared/Navigation/NavWrapper';
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

function App() {
  return (
    <NavWrapper>
      <GameContextProvider>
        <LocalStorageConnectionRestorer>
          <ConnectionCreatedOnly fallback={<JoinForm />}>
            <GameCreatedOnly fallback={<Scoreboard />}>
              <ConnectionResumedOnly fallback={<ConnectionPauseFeedback />}>
                <GameStartedOnly fallback={<Lobby />}>
                  <GameResumedOnly fallback={<GamePauseFeeback />}>
                    <RoundContextProvider>
                      <div className="scrollable">
                        <Question />
                        <LoadingFeedback />
                        <Deck />
                        <AdminControls />
                      </div>
                    </RoundContextProvider>
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
    </NavWrapper>
  );
}

export default App;
