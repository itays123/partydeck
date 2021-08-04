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
  asyncValidator,
  onValueValidated,
  hideErrors,
  context,
}: IFormInputFactory<T>) {
  return function Input({
    className,
    focusOnRender,
  }: withClass & { focusOnRender?: boolean }) {
    const [value, setValue] = useState('');
    const ctx = useContext(context);
    const { validateAsync, validState, error } = useValidator(
      validator,
      asyncValidator,
      value,
      ctx
    );
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
              validateAsync().then(valid => valid && onKeyEnter(ctx));
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
        <div className={'error ' + (error || hideErrors ? 'exists' : 'valid')}>
          {error}
        </div>
      </div>
    );
  };
}
