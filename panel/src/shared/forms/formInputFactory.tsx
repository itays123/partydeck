import { useContext } from 'react';
import { useState } from 'react';
import { withClass } from '../../components/types';
import { IFormInputFactory, ValidatorState } from './types';
import { useFocusOnRender } from './useFocusOnRender';
import { useValidator } from './useValidator';
import { useValueValidatedCallback } from './useValueValidatedCallback';

export function createFormInput<T>({
  name,
  label,
  loadingLabel,
  onKeyEnter,
  validator,
  onValueValidated,
  context,
}: IFormInputFactory<T>) {
  return function Input({
    className,
    focusOnRender,
  }: withClass & { focusOnRender: boolean }) {
    const [value, setValue] = useState('');
    const ctx = useContext(context);
    const { validate, validState, error } = useValidator(validator, value, ctx);
    const ref = useFocusOnRender(focusOnRender);

    useValueValidatedCallback(onValueValidated, value, validState, ctx);

    return (
      <div className={className}>
        <label htmlFor={name} className="" hidden={!label}>
          {label}
        </label>
        <input
          id={name}
          name={name}
          ref={ref}
          onChange={e => setValue(e.target.value)}
          value={value}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (validState === ValidatorState.INITIAL) validate();
              if (validState === ValidatorState.VALIDATED) onKeyEnter(ctx);
            }
          }}
        />
        <div
          className={
            'loading ' +
            (validState === ValidatorState.VALIDATING ? 'active' : 'inactive')
          }
        >
          {loadingLabel}
        </div>
        <div className={'error ' + (error ? 'exists' : 'valid')}>{error}</div>
      </div>
    );
  };
}
