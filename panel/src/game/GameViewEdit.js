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

const GameViewEdit = () => {
  const { id } = useParams();
  const game = useGame(id);
  const { save, isSaveLoading } = useSaveGame();
  const { play } = usePlayGame(id);
  const history = useHistory();
  return (
    <GameEditorContextProvider {...game}>
      <div className="game-view scrollable">
        <div className="bg-gray-100 w-full">
          <header className="container mx-auto pt-8 pb-4 px-2">
            <section className="details">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-purple-600">
                {game.name}
              </h1>
              <GameSettingsViewEdit />
            </section>
            <section className="actions flex justify-start flex-row-reverse">
              <Play onClick={play} />
              <Remove
                onClick={() => history.push('/')}
                disabled={isSaveLoading}
              />
              <Save onClick={save} disabled={isSaveLoading} />
              <Discard onClick={() => history.push('/')} />
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
