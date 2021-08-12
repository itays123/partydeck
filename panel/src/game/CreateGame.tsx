import GameEditorContextProvider from './GameEditorContext';
import { EMPTY_GAME } from './types';
import DeckEditors from './layout/DeckEditors';
import GameHeader from './layout/GameHeader';
import GameSettingsBar from './layout/GameSettingsBar';
import { NewGamesSaveProvider } from './action/NewGamesSaveProvider';

const CreateGame = () => {
  return (
    <GameEditorContextProvider initialGame={EMPTY_GAME}>
      <NewGamesSaveProvider>
        <div className="game-view scrollable">
          <header className="bg-theme-200 w-full pt-8 pb-4 md:pb-12 px-8">
            <GameHeader />
            <GameSettingsBar />
          </header>
          <DeckEditors />
        </div>
      </NewGamesSaveProvider>
    </GameEditorContextProvider>
  );
};

export default CreateGame;
