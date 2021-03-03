import { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../auth/AuthContext';
import { useDeckEditor } from './useDeckEditor';

const GameEditorContext = createContext();

export function useGameEditorContext() {
  return useContext(GameEditorContext);
}

const GameEditorContextProvider = ({
  children,
  questions: initialQuestions,
  answers: initialAnswers,
  isPrivate: initialIsPrivate,
  name: initialName = '',
  author,
  lng: initialLng = 'en',
  play = () => {},
  remove = () => {},
  save: saveFunc = () => {},
}) => {
  const { user } = useAuthContext();
  const isGameNew = !!!initialName; // if a title does not exist, the game is new.
  const isEditable = user._id === author?._id || isGameNew;
  const [name, setName] = useState(initialName);
  const [isPrivate, setPrivate] = useState(initialIsPrivate);
  const [lng, setLng] = useState(initialLng);
  const questions = useDeckEditor(initialQuestions);
  const answers = useDeckEditor(initialAnswers);
  const history = useHistory();

  const clearState = () => {
    questions.clearFocus();
    questions.clearState();
    answers.clearFocus();
    answers.clearState();
    if (isGameNew) {
      setLng(initialLng);
      setName(initialName);
      setPrivate(initialIsPrivate);
    }
  };

  const save = () => {
    let arg;
    if (isGameNew) {
      arg = {
        name,
        lng,
        isPrivate,
        questions: [...questions.added.values()],
        answers: [...answers.added.values()],
      };
    } else {
      arg = {
        questions: {
          added: [...questions.added.values()],
          modified: [...questions.modified.entries()],
          deleted: [...questions.deleted.values()],
        },
        answers: {
          added: [...answers.added.values()],
          modified: [...answers.modified.entries()],
          deleted: [...answers.deleted.values()],
        },
        isPrivate,
      };
    }
    saveFunc(arg);
    clearState(); // refresh
  };

  const discard = () => {
    clearState();
    history.push('/');
  };

  return (
    <GameEditorContext.Provider
      value={{
        isEditable,
        isGameNew,
        name,
        setName,
        isPrivate,
        setPrivate,
        lng,
        setLng,
        questions,
        answers,
        author: isGameNew ? user : author,
        play,
        remove,
        discard,
        save,
      }}
    >
      {children}
    </GameEditorContext.Provider>
  );
};

export default GameEditorContextProvider;
