import { atom } from 'klyva';
import { useMemo } from 'react';
import { useCallback, useState } from 'react';
import { createContext, useContext } from 'react';
import { useAuthContext } from '../auth/AuthContext';
import { createWrapper } from '../components/logicalWrapeprFactory';
import { useDeckEditor } from './deck/useDeckEditor';
import { EMPTY_GAME, Game, IGameEditorContext, Deck } from './types';

export const GameEditorContext = createContext<IGameEditorContext>(
  {} as IGameEditorContext
);

export function useGameEditorContext(): IGameEditorContext {
  return useContext(GameEditorContext);
}

// wrappers
export const ViewerOnly = createWrapper(
  GameEditorContext,
  ctx => !ctx.isEditable
);

export const EditorOnly = createWrapper(
  GameEditorContext,
  ctx => ctx.isEditable
);

export const ExistingGamesOnly = createWrapper(
  GameEditorContext,
  ctx => !ctx.isGameNew
);

export const NewGamesOnly = createWrapper(
  GameEditorContext,
  ctx => ctx.isGameNew
);

// context provider logic
type Props = {
  children: JSX.Element | JSX.Element[];
  initialGame: Game;
  refresh?(): Promise<void>;
};

const questionsAtom = atom<Deck>([]);
const answersAtom = atom<Deck>([]);

export default function GameEditorContextProvider({
  children,
  initialGame = EMPTY_GAME,
  refresh,
}: Props) {
  const { user } = useAuthContext();
  const isGameNew = !!!initialGame.author;
  const isEditable = user?._id === initialGame.author?._id || isGameNew;
  const [name, setName] = useState(initialGame.name);
  const [isPrivate, setPrivate] = useState(initialGame.isPrivate);
  const [lng, setLng] = useState(initialGame.lng);
  const questions = useDeckEditor(questionsAtom, initialGame.questions, 3);
  const answers = useDeckEditor(answersAtom, initialGame.answers, 12);

  const clearState = useCallback(() => {
    questions.clearState();
    answers.clearState();
    setPrivate(initialGame.isPrivate);
    if (isGameNew) {
      setLng(initialGame.lng);
      setName(initialGame.name);
    }
  }, [questions, answers, isGameNew, initialGame]);

  const isChanged = useMemo(
    () =>
      name !== initialGame.name ||
      isPrivate !== initialGame.isPrivate ||
      lng !== initialGame.lng ||
      questions.isChanged ||
      answers.isChanged,
    [
      answers.isChanged,
      initialGame.isPrivate,
      initialGame.lng,
      initialGame.name,
      isPrivate,
      lng,
      name,
      questions.isChanged,
    ]
  );

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
        refresh,
      }}
    >
      {children}
    </GameEditorContext.Provider>
  );
}
