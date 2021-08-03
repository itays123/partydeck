import { GlyphProps } from './types';

export default function createGlyph(src: string) {
  return function Glyph({ className }: GlyphProps) {
    return <img src={src} alt="" className={className} />;
  };
}
