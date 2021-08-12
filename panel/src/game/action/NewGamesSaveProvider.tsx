import { createContext, useCallback } from 'react';
import { action } from '../../components/buttonFactory';
import { createWrapper } from '../../components/logicalWrapeprFactory';
import { Action } from '../types';
import Check from '../../components/glyphs/Check';
import { Wrapper } from '../../components/types';
import { useCreateGame } from './useCreateGame';
import { useHistory } from 'react-router-dom';
import { useGameEditorContext } from '../GameEditorContext';
import Cancel from '../../components/glyphs/Cancel';

interface INewGamesSave {
  save: Action;
  cancel: Action;
}

const NewGamesSaverContext = createContext({} as INewGamesSave);

export const SaveButton = action(Check, NewGamesSaverContext, ctx =>
  ctx.save.doFetch()
);
export const CancelButton = action(Cancel, NewGamesSaverContext, ctx =>
  ctx.cancel.doFetch()
);
export const SaveNewGameLoading = createWrapper(
  NewGamesSaverContext,
  ctx => ctx.save.isLoading
);
export const SaveNewGameNotLoading = createWrapper(
  NewGamesSaverContext,
  ctx => !ctx.save.isLoading
);

export function NewGamesSaveProvider({ children }: Wrapper) {
  const { create, isLoading } = useCreateGame();
  const { name, lng, isPrivate, questions, answers } = useGameEditorContext();
  const history = useHistory();

  const doFetch = useCallback(() => {
    create({
      name,
      lng,
      isPrivate,
      questions: questions.deck,
      answers: answers.deck,
    });
  }, [name, lng, isPrivate, questions.deck, answers.deck, create]);

  return (
    <NewGamesSaverContext.Provider
      value={{
        save: { doFetch, isLoading },
        cancel: { doFetch: () => history.push('/my'), isLoading: false },
      }}
    >
      {children}
    </NewGamesSaverContext.Provider>
  );
}
