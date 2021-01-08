import { useState } from 'react';
import { useGameContext } from '../game/GameContext';
import FormInput, { classicValidate, useModel } from '../shared/FormInput';
import Spinner from '../shared/Spinner';
import { useGameCheck } from './useGameCheck';

const JoinForm = () => {
  const {
    validateGame,
    checkGame,
    awaitingConfirmation,
    clearErrors,
  } = useGameCheck();
  const code = useModel('', validateGame);
  const name = useModel('', classicValidate);
  const { join } = useGameContext();
  const [mode, setMode] = useState('code');
  return (
    <div className="join-form w-full h-96 pt-20">
      {mode === 'code' && (
        <FormInput
          model={code}
          hint="GAME CODE"
          className="mx-auto"
          changeCallback={() => {
            clearErrors();
          }}
          onKeyEnter={value =>
            checkGame(value, result => {
              code.setShowError(true);
              if (result) setMode('name');
            })
          }
        />
      )}
      {mode === 'name' && (
        <FormInput
          model={name}
          hint="YOUR NAME"
          className="mx-auto"
          focusOnRender
          onKeyEnter={() => {
            if (name.validatedValue && !awaitingConfirmation)
              join(code.validatedValue, name.validatedValue);
          }}
        />
      )}
      <div className="mx-auto w-52">
        <button
          className="w-52 dark-button flex justify-center"
          disabled={
            (mode === 'code' && code.error) || (mode === 'name' && name.error)
          }
          onClick={() => {
            if (
              !awaitingConfirmation &&
              code.validatedValue &&
              name.validatedValue
            ) {
              join(code.validatedValue, name.validatedValue);
            } else {
              checkGame(code.value, result => {
                code.setShowError(true);
                if (result) setMode('name');
              });
            }
          }}
        >
          {awaitingConfirmation === true && code.validatedValue && <Spinner />}
          GO
        </button>
      </div>
    </div>
  );
};

export default JoinForm;
