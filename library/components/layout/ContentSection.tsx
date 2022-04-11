import GlyphLayout, { GlyphProps } from './GlyphLayout';

export interface ContentSectionPage extends Omit<GlyphProps, 'className'> {
  title: string;
}

export default function ContentSection({
  title,
  children,
  glyph,
}: ContentSectionPage) {
  return (
    <>
      <GlyphLayout glyph={glyph}>
        <h2 className="decorated-subtitle">{title}</h2>
      </GlyphLayout>
      <section className="text-center md:text-left md:px-6 text-lg md:text-xl">
        {children}
      </section>
    </>
  );
}
