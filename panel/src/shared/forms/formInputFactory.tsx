import { useContext, useMemo } from 'react';
import { withClass } from '../../components/types';
import { Field, IFormInputFactory } from './types';
import { useFocusOnRender } from './useFocusOnRender';

type FormInputProps = withClass & {
  focusOnRender?: boolean;
  overrideLabel?: string;
  overrideHint?: string;
};

export function createFormInput<T extends {}>({
  name,
  label,
  type,
  onKeyEnter,
  onBlur,
  hideErrors,
  context,
  hint,
}: IFormInputFactory<T>) {
  return function Input({
    className,
    focusOnRender,
    overrideLabel,
    overrideHint,
  }: FormInputProps) {
    const ctx = useContext(context);
    const { value, setter, error, errorsVisible, showErrors } = useMemo(
      () => ctx[name] as unknown as Field,
      [ctx]
    );
    const ref = useFocusOnRender(focusOnRender);

    return (
      <div className={className}>
        <label htmlFor={name as string} className="" hidden={!label}>
          {overrideLabel || label}
        </label>
        <input
          id={name as string}
          name={name as string}
          ref={ref}
          placeholder={overrideHint || hint}
          type={type}
          onChange={e => {
            setter(e.target.value);
          }}
          value={value}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (error) showErrors();
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
