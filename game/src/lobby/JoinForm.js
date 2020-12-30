import { useState } from 'react';
import { useGameContext } from '../game/GameContext';
import FormInput, { classicValidate, useModel } from '../shared/FormInput';
import { useGameCheck } from './useGameCheck';

const JoinForm = () => {
  const { validateGame, checkGame, awaitingConfirmation } = useGameCheck();
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
          onKeyEnter={() => {
            if (name.validatedValue && !awaitingConfirmation)
              join(code.validatedValue, name.validatedValue);
          }}
        />
      )}
      <div className="mx-auto w-52">
        <button
          className="w-52 bg-gray-800 text-gray-100 py-2 focus:outline-none hover:bg-gray-700 disabled:opacity-70 flex justify-center"
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
          {awaitingConfirmation === true && code.validatedValue && (
            <svg
              class="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          GO
        </button>
      </div>
    </div>
  );
};

export default JoinForm;
