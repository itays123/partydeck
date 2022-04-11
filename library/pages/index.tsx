import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="bg-theme-500">Hello</div>
    </Layout>
  );
};

export default Home;
