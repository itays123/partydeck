import { useParams } from 'react-router-dom';
import { useGame } from './useGame';
import { CreateLiveGameProvider } from './play/LiveGameModalProvider';
import LiveGameCreationModal from './play/LiveGameCreationModal';
import DeckEditors from './layout/DeckEditors';
import GameSettingsBar from './layout/GameSettingsBar';
import GameCrudProvider from './action/GameCrudProvider';
import GameReady from './layout/GameReady';
import GameHeader from './layout/GameHeader';
import { RefreshableGameEditorProvider } from './action/useSaveGameOnChange';

const GameViewEdit = () => {
  const { id } = useParams<{ id: string }>();
  const game = useGame(id);

  return (
    <GameReady status={game.status} isLoading={game.isLoading}>
      <CreateLiveGameProvider gameId={id}>
        <LiveGameCreationModal />
        <RefreshableGameEditorProvider initialGame={game}>
          <GameCrudProvider gameId={id}>
            <div className="game-view scrollable">
              <header className="bg-theme-200 w-full pt-8 pb-4 md:pb-12 px-8">
                <GameHeader />
                <GameSettingsBar />
              </header>
              <DeckEditors />
            </div>
          </GameCrudProvider>
        </RefreshableGameEditorProvider>
      </CreateLiveGameProvider>
    </GameReady>
  );
};

export default GameViewEdit;
