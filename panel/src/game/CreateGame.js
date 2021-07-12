import { useHistory } from 'react-router';
import Discard from './action/Discard';
import Save from './action/Save';
import GameEditorContextProvider from './GameEditorContext';
import GameSettingsViewEdit from './settings/GameSettingsViewEdit';
import GameNameForm from './settings/GameNameForm';
import { useCreateGame } from './action/useCreateGame';
import DeckEditor from './deck/DeckEditor';
import { EMPTY_GAME } from './types';

const CreateGame = () => {
  const { create, isLoading } = useCreateGame();
  const history = useHistory();
  return (
    <GameEditorContextProvider initialGame={EMPTY_GAME}>
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
          <DeckEditor title="Questions" of="questions" />
          <DeckEditor title="Answers" of="answers" />
        </div>
      </div>
    </GameEditorContextProvider>
  );
};

export default CreateGame;
