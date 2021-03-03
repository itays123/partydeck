import { useHistory, useParams } from 'react-router-dom';
import GameEditorContextProvider from './edit/GameEditorContext';
import { useGame } from './useGame';
import DeckEditorWrapper from './edit/DeckEditorWrapper';
import { usePlayGame } from './view/usePlayGame';
import GameSettingsViewEdit from './GameSettingsViewEdit';
import GameActions from './GameActions';
import { useSaveGame } from './edit/useSaveGame';

const GameViewEdit = () => {
  const { id } = useParams();
  const game = useGame(id);
  const { save } = useSaveGame();
  const { play } = usePlayGame(id);
  const history = useHistory();
  return (
    <GameEditorContextProvider
      {...game}
      play={play}
      save={save}
      remove={() => history.push('/')}
    >
      <div className="game-view scrollable">
        <div className="bg-gray-100 w-full">
          <header className="container mx-auto pt-8 pb-4 px-2">
            <section className="details">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-purple-600">
                {game.name}
              </h1>
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

export default GameViewEdit;
