import { withClass } from './types';

export function createList(...items: string[]) {
  return function List({ className }: withClass) {
    return (
      <ul className={className}>
        {items.map((content, i) => (
          <li key={i}>{content}</li>
        ))}
      </ul>
    );
  };
}
