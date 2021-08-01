export interface GlyphProps {
  size?: number;
}

export default function createGlyph(src: string) {
  return function ({ size }: GlyphProps) {
    return <img src={src} alt="" width={size} height={size} />;
  };
}
