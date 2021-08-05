import Growth from '../components/glyphs/Growth';
import LightBulb from '../components/glyphs/LightBulb';
import { externalLink } from '../components/buttonFactory';
import { createDecoratedText } from '../components/decoratedTextFactory';
import ScrollablePageWrapper from '../components/Footer/ScrollablePageWrapper';
import { createList } from '../components/listFactory';
import PageTitle from '../shared/PageTitle';

const IdeaSubtitle = createDecoratedText(LightBulb, 'The Idea of Partydeck');
const FeaturesList = createList(
  'Playable from distance',
  'Inclusive and fair - the game makes the judge or the round judge based on the quality of the answer card rather than the quality of the player who had it.',
  'Binding - it’s impossible to win when you are not 100% focused',
  'Personalized - each one can make their own customized version',
  'Connecting - the game makes you get to know the other players better'
);
const GettingBetterSubtitle = createDecoratedText(
  Growth,
  'Always Getting Better'
);
const GitHubLink = externalLink(
  'GitHub',
  'https://github.com/itays123/partydeck'
);

export default function About() {
  return (
    <ScrollablePageWrapper>
      <PageTitle>About Us</PageTitle>
      <IdeaSubtitle className="decorated-subtitle" />
      <section className="content-section">
        <p>When we thought of Partydeck, we wanted a game that is:</p>
        <FeaturesList />
        <p>
          Those Guiding Principals will keep guiding us in the next versions.
        </p>
      </section>
      <GettingBetterSubtitle className="decorated-subtitle" />
      <section className="content-section space-y-4">
        <p>
          Developing an application takes time and patience, and the result is
          not always perfect.
        </p>
        <p>
          <span>
            If you have a bug report, a suggestion, a comment or any feedback at
            all regarding this website, we encourage you to contact us via
          </span>{' '}
          <GitHubLink className="underline" />
          <span>, or the email link described there.</span>
        </p>
        <p>Thanks a lot, the Partydeck team.</p>
      </section>
    </ScrollablePageWrapper>
  );
}
