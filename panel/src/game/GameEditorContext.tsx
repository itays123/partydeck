import { atom } from 'klyva';
import { useState } from 'react';
import { createContext, useContext } from 'react';
import { useAuthContext } from '../auth/AuthContext';
import { useDeckEditor } from './deck/useDeckEditor';
import { EMPTY_GAME, Game, IGameEditorContext, Deck } from './types';

export const GameEditorContext = createContext<IGameEditorContext>(
  {} as IGameEditorContext
);

export function useGameEditorContext(): IGameEditorContext {
  return useContext(GameEditorContext);
}

type Props = {
  children: JSX.Element | JSX.Element[];
  initialGame: Game;
};

const questionsAtom = atom<Deck>([]);
const answersAtom = atom<Deck>([]);

export default function GameEditorContextProvider({
  children,
  initialGame = EMPTY_GAME,
}: Props) {
  const { user } = useAuthContext();
  const isGameNew = !!!initialGame.author;
  const isEditable = user?._id === initialGame.author?._id || isGameNew;
  const [name, setName] = useState(initialGame.name);
  const [isPrivate, setPrivate] = useState(initialGame.isPrivate);
  const [lng, setLng] = useState(initialGame.lng);
  const questions = useDeckEditor(questionsAtom, initialGame.questions, 3);
  const answers = useDeckEditor(answersAtom, initialGame.answers, 12);

  const clearState = () => {
    questions.clearState();
    answers.clearState();
    setPrivate(initialGame.isPrivate);
    if (isGameNew) {
      setLng(initialGame.lng);
      setName(initialGame.name);
    }
  };

  const isChanged =
    name !== initialGame.name ||
    isPrivate !== initialGame.isPrivate ||
    lng !== initialGame.lng ||
    questions.isChanged ||
    answers.isChanged;

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
        author: isGameNew ? user : initialGame.author,
        clearState,
        isChanged,
      }}
    >
      {children}
    </GameEditorContext.Provider>
  );
}
