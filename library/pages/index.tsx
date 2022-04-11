import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/layout/Layout';
import LandingPage from '../components/pages/LandingPage';

const Home: NextPage = () => {
  return (
    <Layout>
      <LandingPage />
    </Layout>
  );
};

export default Home;
