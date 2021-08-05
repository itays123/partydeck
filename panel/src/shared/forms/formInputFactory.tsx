import { useContext, useMemo } from 'react';
import { useState } from 'react';
import { withClass } from '../../components/types';
import { Field, IFormInputFactory } from './types';
import { useFocusOnRender } from './useFocusOnRender';

export function createFormInput<T extends {}>({
  name,
  label,
  onKeyEnter,
  onBlur,
  hideErrors,
  context,
  hint,
}: IFormInputFactory<T>) {
  return function Input({
    className,
    focusOnRender,
  }: withClass & { focusOnRender?: boolean }) {
    const ctx = useContext(context);
    const { value, setter, error } = useMemo(
      () => ctx[name] as unknown as Field,
      [ctx]
    );
    const ref = useFocusOnRender(focusOnRender);
    const [errorsVisible, setShowErrors] = useState(false);

    return (
      <div className={className}>
        <label htmlFor={name as string} className="" hidden={!label}>
          {label}
        </label>
        <input
          id={name as string}
          name={name as string}
          ref={ref}
          placeholder={hint}
          onChange={e => {
            setShowErrors(false);
            setter(e.target.value);
          }}
          value={value}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (error) setShowErrors(true && !hideErrors);
              else onKeyEnter(ctx);
            }
          }}
          onBlur={() => {
            onBlur && onBlur(ctx);
          }}
        />
        {!hideErrors && (
          <div
            className={'error ' + (error && errorsVisible ? 'exists' : 'valid')}
          >
            {error}
          </div>
        )}
      </div>
    );
  };
}
