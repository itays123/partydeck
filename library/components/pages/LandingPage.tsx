import CardPick from '../glyphs/CardPick';
import JudgePick from '../glyphs/JudgePick';
import Question from '../glyphs/Question';
import Victory from '../glyphs/Victory';
import GlyphLayout from '../layout/GlyphLayout';

export default function LandingPage() {
  return (
    <div>
      <GlyphLayout glyph={JudgePick} className="rule-section">
        <p className="max-width-40">Each round, a judge is picked</p>
      </GlyphLayout>
      <GlyphLayout glyph={Question} className="rule-section">
        <p className="max-width-40">
          The other players are given a question and and 4 answer cards, and
          pick the funniest or most clever answer of their choice
        </p>
      </GlyphLayout>
      <GlyphLayout glyph={CardPick} className="rule-section">
        <p className="max-width-40">
          The judge gets the question and the answers displayed anonymously, and
          picks the best answer of their choice
        </p>
      </GlyphLayout>
      <GlyphLayout glyph={Victory} className="rule-section">
        <p className="max-width-40">
          The player who submitted the answer, wins the round!
        </p>
      </GlyphLayout>
    </div>
  );
}
