import Head from 'next/head';
import { Container } from '../components/container';
import { Layout } from '../components/layout';

export default function IndexPage(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>loonskai.com</title>
      </Head>
      <Container>
        <h1>About</h1>
      </Container>
    </Layout>
  );
}
