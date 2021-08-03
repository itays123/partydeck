import { GlyphProps } from '../resources/Glyph';
import { JSXProvider, withClass } from './buttonFactory';

export function createDecoratedPharagraph(
  Glyph: JSXProvider<GlyphProps>,
  content: string
) {
  return function ({ className }: withClass) {
    return (
      <div className={className}>
        <Glyph className="h-full" />
        <p>{content}</p>
      </div>
    );
  };
}
