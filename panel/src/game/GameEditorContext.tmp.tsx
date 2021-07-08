import { atom } from 'klyva';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { useAuthContext } from '../auth/AuthContext';
import { Deck } from './deck/DeckEditorTypes';
import { useDeckEditor } from './deck/useDeckEditor.tmp';
import { EMPTY_GAME, Game, IGameEditorContext } from './types';

export const GameEditorContext = createContext<IGameEditorContext>(
  {} as IGameEditorContext
);

export function useGameEditor(): IGameEditorContext {
  return useContext(GameEditorContext);
}

type Props = {
  children: JSX.Element | JSX.Element[];
  initialGame: Game;
};

const questionsAtom = atom<Deck>([]);
const answersAtom = atom<Deck>([]);

export function GameEditorContextProvider({
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

  useEffect(() => {
    questions.clearState();
    answers.clearState();
  }, [questions, answers]);

  const clearState = () => {
    questions.clearFocus();
    questions.clearState();
    answers.clearFocus();
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
