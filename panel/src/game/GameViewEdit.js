import { useHistory, useParams } from 'react-router-dom';
import GameEditorContextProvider from './edit/GameEditorContext';
import { useGame } from './useGame';
import DeckEditorWrapper from './edit/DeckEditorWrapper';
import { usePlayGame } from './view/usePlayGame';
import GameSettingsViewEdit from './GameSettingsViewEdit';
import { useSaveGame } from './edit/useSaveGame';
import Play from './action/Play';
import Remove from './action/Remove';
import Save from './action/Save';
import Discard from './action/Discard';
import Spinner from '../shared/Spinner';

const GameViewEdit = () => {
  const { id } = useParams();
  const game = useGame(id);
  const { save, isSaveLoading } = useSaveGame(id);
  const { play } = usePlayGame(id);
  const history = useHistory();
  return game.isLoading ? (
    <div className="container mx-auto mt-8 flex">
      <Spinner />
      Loading...
    </div>
  ) : (
    <GameEditorContextProvider {...game}>
      <div className="game-view scrollable">
        <div className="bg-gray-100 w-full">
          <header className="container mx-auto pt-8 pb-4 px-8 md:px-2">
            <section className="details">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-purple-600">
                {game.name}
              </h1>
              <GameSettingsViewEdit />
            </section>
            <section className="actions flex justify-start flex-row-reverse mt-2">
              <Play onClick={play} />
              <Remove
                onClick={() => history.push('/')}
                disabled={isSaveLoading}
              />
              <Save
                onClick={save}
                isLoading={isSaveLoading}
                callback={() => window.location.reload()}
              />
              <Discard
                onClick={() => history.push('/')}
                isSaveLoading={isSaveLoading}
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

export default GameViewEdit;
