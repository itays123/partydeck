import GameContextProvider from './game/GameContext';
import DisconnectionDialog from './components/UnexpectedDisconnectionDialog/DisconnectionDialog';
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
import JoinForm from './JoinForm/JoinForm';
import { ThemeProvider } from './components/theme/ThemeProvider';
import { Lobby } from './Lobby/Lobby';
import GameOver from './GameOver/GameOver';
import RoundLayout from './RoundLayout/RoundLayout';

function App() {
  return (
    <ThemeProvider>
      <BrandWrapper>
        <GameContextProvider>
          <LocalStorageConnectionRestorer>
            <ConnectionCreatedOnly fallback={JoinForm}>
              <GameCreatedOnly fallback={GameOver}>
                <ConnectionResumedOnly fallback={ConnectionPauseFeedback}>
                  <GameStartedOnly fallback={Lobby}>
                    <GameResumedOnly fallback={GamePauseFeedback}>
                      <ValidRoundOnly fallback={InvalidRoundFeedback}>
                        <RoundLayout />
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
    </ThemeProvider>
  );
}

export default App;
