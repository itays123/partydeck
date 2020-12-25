import { useState } from 'react';

export function useModel(
  initialValue = undefined,
  validation = () => undefined
) {
  const [value, setter] = useState(initialValue);
  return {
    value,
    setter,
    error: validation(value),
    validatedValue: validation(value) ? undefined : value,
  };
}

const FormInput = ({ model, hint }) => {
  const { value, setter, error } = model;
  return (
    <div className="input my-2">
      <input
        type="text"
        className="bg-gray-100 px-2 py-1"
        value={value}
        onChange={e => setter(e.target.value)}
        placeholder={hint}
      />
      {error && <div className="errors">{error}</div>}
    </div>
  );
};

export default FormInput;
