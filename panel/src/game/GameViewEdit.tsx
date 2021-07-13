import { useHistory, useParams } from 'react-router-dom';
import GameEditorContextProvider from './GameEditorContext';
import { useGame } from './useGame';
import GameSettingsViewEdit from './settings/GameSettingsViewEdit';
import { useSaveGame } from './action/useSaveGame';
import Spinner from '../shared/Spinner';
import { useDeleteGame } from './action/useDeleteGame';
import PageNotFound from '../shared/PageNotFound';
import { useGamePending } from '../shared/GamePending/GameCreationPending';
import DeckEditor from './deck/DeckEditor';
import GameAction from './action/GameAction';
import SvgWrapper from '../shared/SvgWrapper';
import EditorOnly from './wrapper/EditorOnly';

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
              <GameAction
                label="Play"
                disabled={({ isChanged }) => isChanged}
                action={redirectToPage}
              >
                <SvgWrapper>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M8 5v14l11-7z" />
                </SvgWrapper>
              </GameAction>
              <EditorOnly>
                <GameAction
                  label="Remove"
                  disabled={({ isChanged }) => isChanged || isSaveLoading}
                  action={remove}
                >
                  <SvgWrapper>
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                  </SvgWrapper>
                </GameAction>
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
                    })
                  }
                  onActionComplete={() => window.location.reload()}
                >
                  <SvgWrapper>
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                  </SvgWrapper>
                </GameAction>
                <GameAction
                  label="Discard"
                  action={({ clearState }) => {
                    clearState();
                    history.push('/');
                  }}
                  disabled={({ isChanged }) => !isChanged || isSaveLoading}
                >
                  <SvgWrapper>
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                  </SvgWrapper>
                </GameAction>
              </EditorOnly>
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
