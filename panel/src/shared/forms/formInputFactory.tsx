import { useContext } from 'react';
import { useState } from 'react';
import { withClass } from '../../components/types';
import { IFormInputFactory, ValidatorState } from './types';
import { useFocusOnRender } from './useFocusOnRender';
import { useValidator } from './useValidator';

export function createFormInput<T>({
  name,
  label,
  loadingLabel,
  onKeyEnter,
  validator,
  asyncValidator,
  onChange,
  onBlur,
  hideErrors,
  context,
}: IFormInputFactory<T>) {
  return function Input({
    className,
    focusOnRender,
  }: withClass & { focusOnRender?: boolean }) {
    const [value, setValue] = useState('');
    const ctx = useContext(context);
    const { validate, validateAsync, validState, error } = useValidator(
      validator,
      asyncValidator,
      value,
      ctx
    );
    const ref = useFocusOnRender(focusOnRender);

    return (
      <div className={className}>
        <label htmlFor={name} className="" hidden={!label}>
          {label}
        </label>
        <input
          id={name}
          name={name}
          ref={ref}
          onChange={e => {
            const { value } = e.target;
            setValue(value);
            validate() || onChange(value, ctx);
          }}
          value={value}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              validateAsync().then(valid => valid && onKeyEnter(ctx));
            }
          }}
          onBlur={() => {
            onBlur && onBlur(ctx);
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
        <div className={'error ' + (error && !hideErrors ? 'exists' : 'valid')}>
          {error}
        </div>
      </div>
    );
  };
}
