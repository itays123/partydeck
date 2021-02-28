import { createContext, useContext, useState } from 'react';
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
  name: initialName,
  author,
}) => {
  const { user } = useAuthContext();
  const isGameNew = !!!initialName; // if a title does not exist, the game is new.
  const isEditable = user._id === author?._id || isGameNew;
  const [name, setName] = useState(initialName);
  const [isPrivate, setIsPrivate] = useState(initialIsPrivate);
  const questions = useDeckEditor(initialQuestions);
  const answers = useDeckEditor(initialAnswers);

  return (
    <GameEditorContext.Provider
      value={{
        isEditable,
        isGameNew,
        name,
        setName,
        isPrivate,
        setIsPrivate,
        questions,
        answers,
      }}
    >
      {children}
    </GameEditorContext.Provider>
  );
};

export default GameEditorContextProvider;
