import { useCallback } from "react";
import { useContext } from "react";
import { JSXProvider, withClass } from "./types";

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
}