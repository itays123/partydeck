import { createContext } from 'react';
import { useContext } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { Wrapper } from '../../components/types';

export enum FocusedDeck {
  None,
  Questions,
  Answers,
}

export type FocusEntity = {
  isFocused: boolean;
  focus(): void;
};

interface IFocusContext {
  questions: FocusEntity;
  answers: FocusEntity;
}

const FocusContext = createContext({} as IFocusContext);

export function useFocus() {
  return useContext(FocusContext);
}

export function FocusProvider({ children }: Wrapper) {
  const [focus, setFocus] = useState(FocusedDeck.None);
  const focusedOnQuestions = useMemo(
    () => focus === FocusedDeck.Questions,
    [focus]
  );
  const focusOnQuestions = useCallback(
    () => setFocus(FocusedDeck.Questions),
    []
  );
  const focusedOnAnswers = useMemo(
    () => focus === FocusedDeck.Answers,
    [focus]
  );
  const focusOnAnswers = useCallback(() => setFocus(FocusedDeck.Answers), []);
  return (
    <FocusContext.Provider
      value={{
        questions: {
          isFocused: focusedOnQuestions,
          focus: focusOnQuestions,
        },
        answers: { isFocused: focusedOnAnswers, focus: focusOnAnswers },
      }}
    >
      {children}
    </FocusContext.Provider>
  );
}
