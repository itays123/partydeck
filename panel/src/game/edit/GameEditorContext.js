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
  lng: initialLng = 'en',
}) => {
  const { user } = useAuthContext();
  const isGameNew = !!!initialName; // if a title does not exist, the game is new.
  const isEditable = user._id === author?._id || isGameNew;
  const [name, setName] = useState(initialName);
  const [isPrivate, setPrivate] = useState(initialIsPrivate);
  const [lng, setLng] = useState(initialLng);
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
        setPrivate,
        lng,
        setLng,
        questions,
        answers,
        author: isGameNew ? user : author,
      }}
    >
      {children}
    </GameEditorContext.Provider>
  );
};

export default GameEditorContextProvider;
