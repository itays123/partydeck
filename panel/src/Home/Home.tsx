import Footer from '../shared/Footer/Footer';
import CardCollection from './CardCollection';
import Header from './Header';
import {
  BestMatchRule,
  JudgePickedRule,
  QuestionRule,
  VictoryRule,
} from './rules';

const Home = () => {
  return (
    <div className="home scrollable">
      <Header />
      <CardCollection />
      <section className="rules container mx-auto my-8 space-y-4">
        <h1>Rules</h1>
        <JudgePickedRule className="rule-section" />
        <QuestionRule className="rule-section" />
        <BestMatchRule className="rule-section" />
        <VictoryRule className="rule-section" />
      </section>
      <Footer />
    </div>
  );
};

export default Home;
