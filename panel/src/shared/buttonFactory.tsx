import { useCallback, useContext } from 'react';
import { NavLink } from 'react-router-dom';

export type withClass = { className?: string };
export type JSXProvider<Props> = (props: Props) => JSX.Element;

export function link(label: string, to: string) {
  return function ({ className }: withClass) {
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
  return function ({ className, ...props }: withClass & Props) {
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
  return function ({ className, ...props }: withClass & Props) {
    const ctx = useContext(context);
    const action = useCallback(() => consumer(ctx), [ctx]);
    return (
      <button onClick={action} className={className}>
        {typeof label === 'string' ? label : label(props as unknown as Props)}
      </button>
    );
  };
}
