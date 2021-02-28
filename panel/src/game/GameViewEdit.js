import { Link, useParams } from 'react-router-dom';
import languages from '../shared/helpers/languages';
import GameEditorContextProvider from './edit/GameEditorContext';
import { useGame } from './useGame';
import DeckEditorWrapper from './edit/DeckEditorWrapper';
import { usePlayGame } from './view/usePlayGame';
import EditorOnly from './edit/EditorOnly';
import PrivatePublicToggle from './edit/PrivatePublicToggle/PrivatePublicToggle';

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
              <h2 className="text-lg md:text-xl">
                Made by{' '}
                <Link to={'/' + game.author._id}>{game.author.name}</Link>
              </h2>
              <h3 className="text-md">
                {languages[game.lng] && (
                  <span>{languages[game.lng].nativeName}</span>
                )}
                <EditorOnly shouldNotBeEditor>
                  &middot;
                  {game.isPrivate ? 'Private' : 'Public'}
                </EditorOnly>
                <EditorOnly>
                  <PrivatePublicToggle />
                </EditorOnly>
              </h3>
            </section>
            <section className="actions flex justify-end">
              <button
                className="play px-3 py-1 ml-4 rounded bg-purple-600 text-gray-100 font-bold"
                onClick={() => play()}
              >
                Play
              </button>
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
