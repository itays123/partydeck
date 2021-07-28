// import { withSavedInstanceState } from './components/SavedInstanceStateHOC/withSavedInstanceState';
import DisconnectionDialog from './components/UnexpectedDisconnectionDialog/DisconnectionDialog';
import { ConnectionLifecycle, GameLifecycle } from './game/types';
import JoinForm from './lobby/JoinForm';
import Lobby from './lobby/Lobby';
import Scoreboard from './scoreboard/Scoreboard';
import NavWrapper from './shared/Navigation/NavWrapper';

function App() {
  // const { gameState, connectionState: wsState } = useGame();
  return (
    <NavWrapper>
      {
        // gameState === GameLifecycle.PRE_CREATED && <JoinForm />}
        // {gameState === GameLifecycle.CREATED && <Lobby />}
        // {gameState === GameLifecycle.RESUMED && null}
        // {gameState === GameLifecycle.STOPPED && <Scoreboard />}
        // {wsState === ConnectionLifecycle.DESTROYED && <DisconnectionDialog />
      }
    </NavWrapper>
  );
}

export default App;
