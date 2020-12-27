import FormInput, { useModel } from '../shared/FormInput';
import { useGameCheck } from './useGameCheck';

const JoinForm = () => {
  const { validateGame, checkGame, awaitingConfirmation } = useGameCheck();
  const code = useModel('', validateGame);
  const name = useModel('');
  return (
    <div className="join-form w-full h-96 pt-20">
      {(code.error || awaitingConfirmation || code.value === '') && (
        <FormInput
          model={code}
          hint="GAME CODE"
          className="mx-auto"
          changeCallback={value => {
            code.setShowError(false);
            checkGame(value, () => code.setShowError(true));
          }}
        />
      )}
      {!code.error && !awaitingConfirmation && <FormInput model={name} />}
      <div className="mx-auto w-52">
        <button
          className="w-52 bg-gray-800 text-gray-100 py-2 focus:outline-none hover:bg-gray-700 disabled:opacity-70"
          disabled={code.value === '' || code.error || awaitingConfirmation}
        >
          GO
        </button>
      </div>
    </div>
  );
};

export default JoinForm;
