export interface GlyphProps {
  className: string;
}

export default function createGlyph(src: string) {
  return function ({ className }: GlyphProps) {
    return <img src={src} alt="" className={className} />;
  };
}
