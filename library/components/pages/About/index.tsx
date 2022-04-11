import Link from 'next/link';
import Growth from '../../glyphs/Growth';
import LightBulb from '../../glyphs/LightBulb';
import GlyphLayout from '../../layout/GlyphLayout';
import ExternalLink from '../../navigation/ExternalLink';

const GITHUB_LINK = process.env.NEXT_PUBLIC_GITHUB_LINK;

export default function AboutPage() {
  return (
    <div className="about scrollable space-y-12 ">
      <h1 className="decorated-title">About Us</h1>
      <section className="content-section">
        <GlyphLayout glyph={LightBulb}>
          <h2 className="decorated-subtitle">The Idea of Partydeck</h2>
        </GlyphLayout>
        <p>When we thought of Partydeck, we wanted a game that is:</p>
        <ul>
          <li>Playable from distance</li>
          <li>
            Inclusive and fair - the game makes the judge or the round judge.
          </li>
          <li>
            based on the quality of the answer card rather than the quality of
            the player who had it.
          </li>
          <li>
            Binding - it’s impossible to win when you are not 100% focused
          </li>
          <li>Personalized - each one can make their own customized version</li>
          <li>
            Connecting - the game makes you get to know the other players better
          </li>
        </ul>
      </section>
      <section className="content-section">
        <GlyphLayout glyph={Growth}>
          <h2 className="decorated-subtitle">Always Getting Better</h2>
        </GlyphLayout>
        <p>
          Developing an application takes time and patience, and the result is
          not always perfect.
        </p>
        <p>
          If you have a bug report, a suggestion, a comment or any feedback at
          all regarding this website, we encourage you to contact us via{' '}
          <ExternalLink href={GITHUB_LINK!} className="underline">
            GitHub
          </ExternalLink>
          , or the email link described there. Thanks a lot, the Partydeck team.
        </p>
      </section>
    </div>
  );
}
