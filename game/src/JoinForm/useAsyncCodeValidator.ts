import { Dispatch, SetStateAction, useCallback } from 'react';
import { Field } from '../components/forms/types';
import { JoinFormStage } from './JoinFormProvider';

export function useAsyncCodeValidator(
  code: Field,
  checkGame: (value: string) => Promise<boolean>,
  setStage: Dispatch<SetStateAction<JoinFormStage>>
) {
  return useCallback(() => {
    setStage(JoinFormStage.VALIDATING_CODE);
    checkGame(code.value).then(valid => {
      setStage(valid ? JoinFormStage.NAME : JoinFormStage.CODE);
      if (!valid) code.showErrors();
    });
  }, [code, checkGame, setStage]);
}
