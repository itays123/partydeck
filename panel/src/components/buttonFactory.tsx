import { useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { JSXProvider, withClass } from './types';

export function link(label: string, to: string) {
  return function LabledLink({ className }: withClass) {
    return (
      <NavLink to={to} className={className}>
        {label}
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
  consumer: (ctx: T) => void
) {
  return function ContextAction({ className, ...props }: withClass & Props) {
    const ctx = useContext(context);
    const action = useCallback(() => consumer(ctx), [ctx]);
    return (
      <button onClick={action} className={className}>
        {typeof label === 'string' ? label : label(props as unknown as Props)}
      </button>
    );
  };
}
