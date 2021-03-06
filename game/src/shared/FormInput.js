import { useEffect, useRef, useState } from 'react';

export function useModel(
  initialValue = undefined,
  validation = () => undefined
) {
  const [value, setter] = useState(initialValue);
  const [showError, setShowError] = useState(false);
  return {
    value,
    setter,
    showError,
    setShowError,
    error: validation(value),
    validatedValue: validation(value) ? undefined : value,
  };
}

export function classicValidate(value) {
  if (!value) return 'This field is required';
  else return undefined;
}

const FormInput = ({
  model,
  hint,
  changeCallback = () => {},
  className = '',
  onKeyEnter = () => {},
  focusOnRender,
}) => {
  const { value, setter, error, showError, setShowError } = model;
  const ref = useRef();

  useEffect(() => {
    if (focusOnRender) {
      ref.current.focus();
    }
  }, [focusOnRender]);

  return (
    <div className={'input my-2 bg-gray-100 px-4 pt-2 pb-3 w-52 ' + className}>
      <input
        type="text"
        className="outline-none bg-gray-100 w-48"
        ref={ref}
        value={value}
        onChange={e => {
          setter(e.target.value);
          setShowError(false);
          changeCallback(e.target.value);
        }}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            setShowError(true);
            onKeyEnter(value);
          }
        }}
        placeholder={hint}
      />
      {error && showError && (
        <div className="errors text-red-500 text-sm w-48">{error}</div>
      )}
    </div>
  );
};

export default FormInput;
