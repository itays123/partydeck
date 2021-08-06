import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { Field } from '../components/forms/types';
import { useField } from '../components/forms/useField';
import { Wrapper } from '../components/types';
import { useGameContext } from '../game/GameContext';
import { useAsyncCodeValidator } from './useAsyncCodeValidator';
import { useGameCheck } from './useGameCheck';
import { useQuery } from './useQuery';

export enum JoinFormStage {
  CODE,
  VALIDATING_CODE,
  NAME,
  LOADING,
}

interface IJoinForm {
  stage: JoinFormStage;
  gameCode: Field;
  name: Field;
  checkGame(): void;
  join(): void;
}

export const JoinFormContext = createContext({} as IJoinForm);

export function useJoinForm() {
  return useContext(JoinFormContext);
}

const classicValidate = (errorMessage: string) => (value: string) =>
  value.trim().length === 0 ? errorMessage : null;

export function JoinFormProvider({ children }: Wrapper) {
  const { code: urlCode } = useQuery();
  const { checkGame, validateCode, allowCheck } = useGameCheck();
  const gameCode = useField(validateCode, urlCode);
  const name = useField(classicValidate('Name must be entered'));
  const [stage, setStage] = useState(JoinFormStage.CODE);
  const { join } = useGameContext();
  const checkGameCallback = useAsyncCodeValidator(
    gameCode,
    checkGame,
    setStage
  );

  useEffect(() => {
    if (urlCode && stage === JoinFormStage.CODE) checkGameCallback();
  }, [urlCode, stage, checkGameCallback]);

  useEffect(() => {
    allowCheck();
  }, [gameCode.value, allowCheck]);

  return (
    <JoinFormContext.Provider
      value={{
        gameCode,
        name,
        stage,
        checkGame: checkGameCallback,
        join() {
          setStage(JoinFormStage.LOADING);
          join(gameCode.value, name.value);
        },
      }}
    >
      {children}
    </JoinFormContext.Provider>
  );
}
