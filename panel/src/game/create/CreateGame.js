import DeckEditorWrapper from '../edit/DeckEditorWrapper';
import GameEditorContextProvider from '../edit/GameEditorContext';
import GameActions from '../GameActions';
import GameSettingsViewEdit from '../GameSettingsViewEdit';
import GameNameForm from './GameNameForm';

const CreateGame = () => {
  return (
    <GameEditorContextProvider>
      <div className="game-view scrollable">
        <div className="bg-gray-100 w-full">
          <header className="container mx-auto pt-8 pb-4 px-2">
            <section className="details">
              <GameNameForm />
              <GameSettingsViewEdit />
            </section>
            <GameActions />
          </header>
        </div>
        <div>
          <DeckEditorWrapper title="Questions" contextEditor="questions" />
          <DeckEditorWrapper title="Answers" contextEditor="answers" />
        </div>
      </div>
    </GameEditorContextProvider>
  );
};

export default CreateGame;
