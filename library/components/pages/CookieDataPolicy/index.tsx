import Cancel from '../../glyphs/Cancel';
import Check from '../../glyphs/Check';
import Cookie from '../../glyphs/Cookie';
import Privacy from '../../glyphs/Privacy';
import GlyphLayout from '../../layout/GlyphLayout';

export default function CookieDataPolicyPage() {
  return (
    <div className="scrollable space-y-12">
      <h1 className="decorated-title">Data & Cookie Policy</h1>
      <GlyphLayout glyph={Privacy}>
        <h2 className="decorated-subtitle">
          What Do We Know About Signed In Users?
        </h2>
      </GlyphLayout>
      <section className="content-section">
        <ul>
          <li>The name you submitted on register</li>
          <li>Your saved decks</li>
          <li>Your bookmarked decks</li>
        </ul>
        <p>That’s it.</p>
      </section>
      <GlyphLayout glyph={Cookie}>
        <h2 className="decorated-subtitle">What Do We Use Cookies For?</h2>
      </GlyphLayout>
      <section className="content-section">
        <ul>
          <li>
            Saving your login credentials, so you won’t have to sign in again
            every time you use the application
          </li>
          <li>Using your login credentials to save the decks you create</li>
        </ul>
      </section>
      <div className="md:flex items-baseline justify-evenly">
        <div className="content-section">
          <GlyphLayout glyph={Check}>
            <h2 className="decorated-subtitle">We Do</h2>
          </GlyphLayout>
          <ul>
            <li>Hash your password, so nobody can pretend to be you</li>
            <li>Display your public decks in the game library</li>
          </ul>
        </div>
        <div className="content-section">
          <GlyphLayout glyph={Cancel}>
            <h2 className="decorated-subtitle">We Don’t</h2>
          </GlyphLayout>
          <ul>
            <li>Use your data for advertizing purposes</li>
            <li>Sell your data to third party applications</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
