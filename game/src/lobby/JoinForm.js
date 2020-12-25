import FormInput, { useModel } from '../shared/FormInput';

const JoinForm = () => {
  const code = useModel('', code => {
    if (!code) return 'You must enter a code';
  });
  const name = useModel('');
  return (
    <div className="join-form flex items-center justify-center w-full h-96">
      <form className="bg-gray-100 p-5 shadow">
        <FormInput model={code} hint="enter game code" />
        {!code.error && <FormInput model={name} />}
      </form>
    </div>
  );
};

export default JoinForm;
