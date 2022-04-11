import CardPick from '../glyphs/CardPick';
import CreateDecks from '../glyphs/CreateDecks';
import HostGames from '../glyphs/HostGames';
import InviteFriends from '../glyphs/InviteFriends';
import JudgePick from '../glyphs/JudgePick';
import PublishDecks from '../glyphs/PublishDecks';
import Question from '../glyphs/Question';
import Victory from '../glyphs/Victory';
import GlyphLayout from '../layout/GlyphLayout';
import LandingPageHeader from './LandingPageHeader';

export default function LandingPage() {
  return (
    <div className="home scrollable">
      <LandingPageHeader />
      <section className="how-it-works bg-theme-300 p-4 flex flex-col items-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl text-center text-theme-900 font-bold mb-4">
          How Does Partydeck Work?
        </h2>
        <div className="grid grid-rows-2 grid-cols-2 sm:grid-rows-1 sm:grid-cols-4 justify-items-center gap-2">
          <CreateDecks className="w-auto" />
          <PublishDecks className="w-auto" />
          <HostGames className="w-auto" />
          <InviteFriends className="w-auto" />
        </div>
      </section>
      <section className="max-w-[20rem] md:max-w-[40rem] mx-auto my-8 space-y-4 flex flex-col items-center md:items-start">
        <h1>Rules</h1>
        <GlyphLayout glyph={JudgePick} className="rule-section">
          <p>Each round, a judge is picked</p>
        </GlyphLayout>
        <GlyphLayout glyph={Question} className="rule-section">
          <p>
            The other players are given a question and and 4 answer cards, and
            pick the funniest or most clever answer of their choice
          </p>
        </GlyphLayout>
        <GlyphLayout glyph={CardPick} className="rule-section">
          <p>
            The judge gets the question and the answers displayed anonymously,
            and picks the best answer of their choice
          </p>
        </GlyphLayout>
        <GlyphLayout glyph={Victory} className="rule-section">
          <p>The player who submitted the answer, wins the round!</p>
        </GlyphLayout>
      </section>
    </div>
  );
}
