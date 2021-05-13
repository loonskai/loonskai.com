import Head from 'next/head';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { InProgress } from '../components/in-progress';

const IndexPage = (): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>loonskai.com</title>
      </Head>
      <Container>
        <InProgress />
      </Container>
    </Layout>
  );
};

export default IndexPage;
