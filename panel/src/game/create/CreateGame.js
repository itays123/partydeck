import { useHistory } from 'react-router';
import Discard from '../action/Discard';
import Save from '../action/Save';
import DeckEditorWrapper from '../edit/DeckEditorWrapper';
import GameEditorContextProvider from '../edit/GameEditorContext';
import GameSettingsViewEdit from '../GameSettingsViewEdit';
import GameNameForm from './GameNameForm';
import { useCreateGame } from './useCreateGame';

const CreateGame = () => {
  const { create, isLoading } = useCreateGame();
  const history = useHistory();
  return (
    <GameEditorContextProvider>
      <div className="game-view scrollable">
        <div className="bg-gray-100 w-full">
          <header className="container mx-auto pt-8 pb-4 px-8 md:px-2">
            <section className="details">
              <GameNameForm />
              <GameSettingsViewEdit />
            </section>
            <section className="actions flex justify-start flex-row-reverse">
              <Save onClick={create} isLoading={isLoading} />
              <Discard
                onClick={() => history.push('/')}
                isSaveLoading={isLoading}
              />
            </section>
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
