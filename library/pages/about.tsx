import type { NextPage } from 'next';
import Layout from '../components/layout/Layout';
import AboutPage from '../components/pages/About';

const About: NextPage = () => {
  return (
    <Layout>
      <AboutPage />
    </Layout>
  );
};

export default About;
