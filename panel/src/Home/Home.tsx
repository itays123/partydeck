import Footer from '../shared/Footer/Footer';
import CardCollection from './CardCollection';
import Header from './Header';

const Home = () => {
  return (
    <div className="home scrollable">
      <Header />
      <CardCollection />
      <Footer />
    </div>
  );
};

export default Home;
