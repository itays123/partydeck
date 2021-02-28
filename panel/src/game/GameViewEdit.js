import { Link, useParams } from 'react-router-dom';
import languages from '../shared/helpers/languages';
import GameEditorContextProvider from './edit/GameEditorContext';
import { useGame } from './useGame';
import DeckEditorWrapper from './edit/DeckEditorWrapper';
import { usePlayGame } from './view/usePlayGame';
import EditorOnly from './edit/EditorOnly';
import PrivatePublicToggle from './edit/PrivatePublicToggle/PrivatePublicToggle';
import GameSettingsViewEdit from './GameSettingsViewEdit';
import GameActions from './GameActions';

const GameViewEdit = () => {
  const { id } = useParams();
  const game = useGame(id);
  const { play } = usePlayGame(id);
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
            <GameActions play={play} />
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
