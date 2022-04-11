import type { NextPage } from 'next';
import Growth from '../../components/glyphs/Growth';
import LightBulb from '../../components/glyphs/LightBulb';
import ContentSection from '../../components/layout/ContentSection';
import Layout from '../../components/layout/Layout';
import ExternalLink from '../../components/navigation/ExternalLink';

const GITHUB_LINK = process.env.NEXT_PUBLIC_GITHUB_LINK;

const About: NextPage = () => {
  return (
    <Layout>
      <div className="about scrollable space-y-12 ">
        <h1 className="decorated-title">About Us</h1>
        <ContentSection title="The Idea of Partydeck" glyph={LightBulb}>
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
            <li>
              Personalized - each one can make their own customized version
            </li>
            <li>
              Connecting - the game makes you get to know the other players
              better
            </li>
          </ul>
        </ContentSection>
        <ContentSection title="Always Getting Better" glyph={Growth}>
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
            , or the email link described there. Thanks a lot, the Partydeck
            team.
          </p>
        </ContentSection>
      </div>
    </Layout>
  );
};

export default About;
