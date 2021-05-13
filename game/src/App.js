import GameContextProvider from './game/GameContext';
import RoundContextProvider from './round/RoundContext';
import Deck from './card/Deck';
import Question from './round/Question';
import NavWrapper from './shared/Navigation/NavWrapper';
import AdminControls from './round/AdminControls';
import ConnectedOnly from './game/filters/ConnectedOnly';
import JoinForm from './lobby/JoinForm';
import GameStartedOnly from './game/filters/GameStartedOnly';
import Lobby from './lobby/Lobby';
import ActiveRoundOnly from './game/filters/ActiveRoundOnly';
import Scoreboard from './scoreboard/Scoreboard';
import UnexpectedDisconnectionOnly from './game/filters/UnexpectedDisconnectionOnly';
import DisconnectionDialog from './game/DisconnectionDialog';
import LoadingFeedback from './round/LoadingFeedback';

function App() {
  return (
    <NavWrapper>
      <GameContextProvider>
        <ConnectedOnly fallback={<JoinForm />}>
          <GameStartedOnly fallback={<Lobby />}>
            <ActiveRoundOnly fallback={<Scoreboard />}>
              <RoundContextProvider>
                <div className="scrollable">
                  <Question />
                  <LoadingFeedback />
                  <Deck />
                  <AdminControls />
                </div>
              </RoundContextProvider>
            </ActiveRoundOnly>
          </GameStartedOnly>
          <UnexpectedDisconnectionOnly>
            <DisconnectionDialog />
          </UnexpectedDisconnectionOnly>
        </ConnectedOnly>
      </GameContextProvider>
    </NavWrapper>
  );
}

export default App;
