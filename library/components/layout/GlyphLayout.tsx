import { Glyph } from '../glyphs/_glyphFactory';
import { Stylable, WrapperProps } from '../types';

export interface GlyphProps extends WrapperProps, Stylable {
  glyph: Glyph;
}

export default function GlyphLayout({
  className,
  children,
  glyph: Glyph,
}: GlyphProps) {
  return (
    <div className={`flex flex-responsive ${className}`}>
      <div className="flex-shrink-0 self-stretch flex justify-center">
        <Glyph />
      </div>
      <div className="flex-grow">{children}</div>
    </div>
  );
}
