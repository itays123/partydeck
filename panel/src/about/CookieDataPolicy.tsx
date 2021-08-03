import Cancel from '../components/glyphs/Cancel';
import Check from '../components/glyphs/Check';
import Cookie from '../components/glyphs/Cookie';
import Privacy from '../components/glyphs/Privacy';
import { createDecoratedPharagraph } from '../components/decoratedPharagraphFactory';
import ScrollablePageWrapper from '../shared/Footer/ScrollablePageWrapper';
import { createList } from '../components/listFactory';
import PageTitle from '../shared/PageTitle';

const PrivacySubtitle = createDecoratedPharagraph(
  Privacy,
  'What Do We Know About Signed In Users?'
);
const WhatWeKnow = createList(
  'The name and email you submitted on register',
  'Your saved decks'
);
const CookiesSubtitle = createDecoratedPharagraph(
  Cookie,
  'What Do We Use Cookies For?'
);
const CookieUsages = createList(
  "Saving your login credentials, so you won't have to sign in again every time you use the application",
  'Using your login credentials to save the decks you create'
);
const WeDoSubtitle = createDecoratedPharagraph(Check, 'We Do');
const WeDoList = createList(
  'Hash your password, so nobody can pretend to be you',
  'Display your public decks in the game library'
);
const WeDontSubtitle = createDecoratedPharagraph(Cancel, "We Don't");
const WeDontList = createList(
  'Use your data for advertizing purposes',
  'Sell your data to third party applications'
);

export default function CookieDataPolicy() {
  return (
    <ScrollablePageWrapper>
      <PageTitle>Data & Cookie Policy</PageTitle>
      <PrivacySubtitle className="decorated-subtitle" />
      <section className="content-section">
        <WhatWeKnow />
        <p>That's it.</p>
      </section>
      <CookiesSubtitle className="decorated-subtitle" />
      <section className="content-section py-4">
        <CookieUsages />
      </section>
      <div className="md:flex items-baseline justify-evenly">
        <div>
          <WeDoSubtitle className="decorated-subtitle" />
          <WeDoList className="content-section my-4" />
        </div>
        <div>
          <WeDontSubtitle className="decorated-subtitle" />
          <WeDontList className="content-section my-4" />
        </div>
      </div>
    </ScrollablePageWrapper>
  );
}
