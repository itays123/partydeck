import { useHistory, useParams } from 'react-router-dom';
import GameEditorContextProvider from './GameEditorContext';
import { useGame } from './useGame';
import GameSettingsViewEdit from './settings/GameSettingsViewEdit';
import { useSaveGame } from './action/useSaveGame';
import Play from './action/Play';
import Remove from './action/Remove';
import Save from './action/Save';
import Discard from './action/Discard';
import Spinner from '../shared/Spinner';
import { useDeleteGame } from './action/useDeleteGame';
import PageNotFound from '../shared/PageNotFound';
import { useGamePending } from '../shared/GamePending/GameCreationPending';
import DeckEditor from './deck/DeckEditor';
import GameAction from './action/GameAction';
import SvgWrapper from '../shared/SvgWrapper';

const GameViewEdit = () => {
  const { id } = useParams<{ id: string }>();
  const game = useGame(id);
  const { save, isSaveLoading } = useSaveGame(id);
  const { remove } = useDeleteGame(id);
  const { redirectToPage } = useGamePending(id);
  const history = useHistory();

  if (game.isLoading)
    return (
      <div className="container mx-auto mt-8 flex">
        <Spinner />
        Loading...
      </div>
    );

  if (game.status === 404) return <PageNotFound />;

  return (
    <GameEditorContextProvider initialGame={game}>
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
              <Play onClick={redirectToPage} />
              <Remove onClick={remove} disabled={isSaveLoading} />
              <GameAction
                label="Save"
                loadingLabel="Saving..."
                isLoading={isSaveLoading}
                disabled={({ isChanged }) => !isChanged}
                action={({ isPrivate, questions, answers }) =>
                  save({
                    isPrivate,
                    questions: questions.changes(),
                    answers: answers.changes(),
                  }).then(window.location.reload)
                }
              >
                <SvgWrapper>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                </SvgWrapper>
              </GameAction>
              <Discard
                onClick={() => history.push('/')}
                isSaveLoading={isSaveLoading}
              />
            </section>
          </header>
        </div>
        <div>
          <DeckEditor label="Questions" of="questions" />
          <DeckEditor label="Answers" of="answers" />
        </div>
      </div>
    </GameEditorContextProvider>
  );
};

export default GameViewEdit;
