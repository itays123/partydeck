import { createContext, useContext, useState } from 'react';
import { useAuthContext } from '../../auth/AuthContext';

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
  const isEditable = user._id === author?._id;
  const isGameNew = !!!initialName; // if a title does not exist, the game is new.
  const [name, setName] = useState(initialName);
  const [isPrivate, setIsPrivate] = useState(initialIsPrivate);

  return (
    <GameEditorContext.Provider
      value={{
        isEditable,
        isGameNew,
        name,
        setName,
        isPrivate,
        setIsPrivate,
      }}
    >
      {children}
    </GameEditorContext.Provider>
  );
};

export default GameEditorContextProvider;
