import { Dispatch, SetStateAction, useCallback } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { action } from '../components/contextActionFactory';
import { createFormInput } from '../components/forms/formInputFactory';
import { NullableErrorMessage } from '../components/forms/types';
import Next from '../components/glyphs/Next';
import { createWrapper } from '../components/logicalWrapperFactory';
import { Wrapper } from '../components/types';
import { useGameContext } from '../game/GameContext';
import { useGameCheck } from './useGameCheck';
import { useQuery } from './useQuery';

enum FormStatus {
  CODE,
  NAME,
  LOADING,
}

interface IJoinForm {
  status: FormStatus;
  gameCode: string;
  setGameCode: Dispatch<SetStateAction<string>>;
  checkGameExists(value?: string): Promise<boolean>;
  validateGameCode(value: string): NullableErrorMessage;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  validateName(value: string): NullableErrorMessage;
  join(): void;
}

const JoinFormContext = createContext<IJoinForm>({} as IJoinForm);

export const ValidateCodeButton = action(Next, JoinFormContext, ctx =>
  ctx.checkGameExists()
);
export const JoinButton = action(Next, JoinFormContext, ctx => ctx.join());
export const LoadingWrapper = createWrapper(
  JoinFormContext,
  ctx => ctx.status === FormStatus.LOADING
);
export const CodeFieldActive = createWrapper(
  JoinFormContext,
  ctx => ctx.status === FormStatus.CODE
);
export const CodeInputField = createFormInput({
  name: 'Code',
  label: 'GAME CODE',
  context: JoinFormContext,
  onChange: (value, ctx) => ctx.setGameCode(value),
  validator: (value, ctx) => ctx.validateGameCode(value),
  onKeyEnter: ctx => ctx.checkGameExists(),
});
export const NameFieldActive = createWrapper(
  JoinFormContext,
  ctx => ctx.status === FormStatus.NAME
);
export const NameInputField = createFormInput({
  name: 'Name',
  label: 'Your Name...',
  context: JoinFormContext,
  onChange: (value, ctx) => ctx.setName(value),
  validator: (value, ctx) => ctx.validateName(value),
  onKeyEnter: ctx => ctx.join(),
});

export function JoinFormProvider({ children }: Wrapper) {
  const { code: urlCode } = useQuery();
  const [status, setStatus] = useState(
    urlCode ? FormStatus.LOADING : FormStatus.CODE
  );
  const [gameCode, setGameCode] = useState(urlCode);
  const [name, setName] = useState('');
  const { gameFound, checkGameExists } = useGameCheck();
  const { join } = useGameContext();
  const validateGameCode = useCallback(
    (value: string) => {
      if (value.length !== 6) {
        return 'Invalid code';
      } else if (!gameFound) {
        return 'Game does not exist';
      }
    },
    [gameFound]
  );
  const validateName = useCallback((value: string) => {
    if (value.trim().length === 0) {
      return 'Name must be entered';
    }
  }, []);
  const checkGameCallback = useCallback(
    (code?: string) => checkGameExists(code || gameCode),
    [checkGameExists, gameCode]
  );
  const joinCallback = useCallback(
    () => join(gameCode, name),
    [join, gameCode, name]
  );

  return (
    <JoinFormContext.Provider
      value={{
        status,
        gameCode,
        name,
        setGameCode,
        setName,
        checkGameExists: checkGameCallback,
        join: joinCallback,
        validateGameCode,
        validateName,
      }}
    >
      {children}
    </JoinFormContext.Provider>
  );
}
