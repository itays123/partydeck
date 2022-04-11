import type { NextPage } from 'next';
import Layout from '../../components/layout/Layout';
import CookieDataPolicyPage from '../../components/pages/CookieDataPolicy';

const CookieDataPolicy: NextPage = () => {
  return (
    <Layout>
      <CookieDataPolicyPage />
    </Layout>
  );
};

export default CookieDataPolicy;
