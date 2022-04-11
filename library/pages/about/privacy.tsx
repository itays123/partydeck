import type { NextPage } from 'next';
import Cancel from '../../components/glyphs/Cancel';
import Check from '../../components/glyphs/Check';
import Cookie from '../../components/glyphs/Cookie';
import Privacy from '../../components/glyphs/Privacy';
import ContentSection from '../../components/layout/ContentSection';
import Layout from '../../components/layout/Layout';

const CookieDataPolicy: NextPage = () => {
  return (
    <Layout>
      <div className="scrollable space-y-12">
        <h1 className="decorated-title">Data & Cookie Policy</h1>
        <ContentSection
          title="What Do We Know About Signed In Users?"
          glyph={Privacy}
        >
          <ul>
            <li>The name you submitted on register</li>
            <li>Your saved decks</li>
            <li>Your bookmarked decks</li>
          </ul>
          <p>That’s it.</p>
        </ContentSection>
        <ContentSection title="What Do We Use Cookies For?" glyph={Cookie}>
          <ul>
            <li>
              Saving your login credentials, so you won’t have to sign in again
              every time you use the application
            </li>
            <li>Using your login credentials to save the decks you create</li>
          </ul>
        </ContentSection>
        <div className="md:flex items-baseline justify-evenly">
          <div>
            <ContentSection title="We Do" glyph={Check}>
              <ul>
                <li>Hash your password, so nobody can pretend to be you</li>
                <li>Display your public decks in the game library</li>
              </ul>
            </ContentSection>
          </div>
          <div>
            <ContentSection title="We Don't" glyph={Cancel}>
              <ul>
                <li>Use your data for advertizing purposes</li>
                <li>Sell your data to third party applications</li>
              </ul>
            </ContentSection>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CookieDataPolicy;
