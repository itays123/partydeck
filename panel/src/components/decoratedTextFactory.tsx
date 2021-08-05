import { createElement } from 'react';
import { GlyphProps } from './types';
import { JSXProvider, withClass } from './types';

type TextElem = 'p' | 'h2' | 'h3' | 'h4';

export function createDecoratedText(
  Glyph: JSXProvider<GlyphProps>,
  content: string,
  elemType: TextElem = 'h2'
) {
  const text = createElement(elemType, {}, content);
  return function DecoratedPharagraph({ className }: withClass) {
    return (
      <div className={className}>
        <Glyph className="h-full" />
        {text}
      </div>
    );
  };
}
