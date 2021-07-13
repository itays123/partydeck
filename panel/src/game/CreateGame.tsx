import { useHistory } from 'react-router';
import GameEditorContextProvider from './GameEditorContext';
import GameSettingsViewEdit from './settings/GameSettingsViewEdit';
import GameNameForm from './settings/GameNameForm';
import { useCreateGame } from './action/useCreateGame';
import DeckEditor from './deck/DeckEditor';
import { EMPTY_GAME } from './types';
import GameAction from './action/GameAction';
import SvgWrapper from '../shared/SvgWrapper';

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
              <GameAction
                label="Save"
                loadingLabel="Saving..."
                isLoading={isLoading}
                disabled={({ isChanged }) => !isChanged}
                action={({ name, lng, isPrivate, questions, answers }) =>
                  create({
                    name,
                    lng,
                    isPrivate,
                    questions: questions.getValue(),
                    answers: answers.getValue(),
                  })
                }
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
                disabled={({ isChanged }) => !isChanged || isLoading}
              >
                <SvgWrapper>
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                </SvgWrapper>
              </GameAction>
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

export default CreateGame;
