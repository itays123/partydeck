import type { NextPage } from 'next';
import Layout from '../components/layout/Layout';
import LandingPage from '../components/LandingPage';

const Home: NextPage = () => {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
};

export default Home;
