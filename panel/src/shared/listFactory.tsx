import { withClass } from './buttonFactory';

export function createList(...items: string[]) {
  return function ({ className }: withClass) {
    return (
      <ul className={className}>
        {items.map((content, i) => (
          <li key={i}>{content}</li>
        ))}
      </ul>
    );
  };
}
