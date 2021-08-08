import { useCallback, useContext, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { JSXProvider, withClass } from './types';

export function link<Props extends object = {}>(
  label: string | JSXProvider<Props>,
  to: string
) {
  return function LabledLink({ className, ...props }: withClass & Props) {
    return (
      <NavLink to={to} className={className}>
        {typeof label === 'string' ? label : label(props as unknown as Props)}
      </NavLink>
    );
  };
}

export function externalLink<Props extends object = {}>(
  label: string | JSXProvider<Props>,
  to: string
) {
  return function ExternalLink({ className, ...props }: withClass & Props) {
    return (
      <a href={to} className={className}>
        {typeof label === 'string' ? label : label(props as unknown as Props)}
      </a>
    );
  };
}

export function action<T extends object, Props extends object = {}>(
  label: string | JSXProvider<Props>,
  context: React.Context<T>,
  consumer: (ctx: T) => void,
  disabledConsumer?: (ctx: T) => boolean
) {
  return function ContextAction({ className, ...props }: withClass & Props) {
    const ctx = useContext(context);
    const action = useCallback(() => consumer(ctx), [ctx]);
    const disabled = useMemo(
      () => !!disabledConsumer && disabledConsumer(ctx),
      [ctx]
    );
    return (
      <button onClick={action} className={className} disabled={disabled}>
        {typeof label === 'string' ? label : label(props as unknown as Props)}
      </button>
    );
  };
}
