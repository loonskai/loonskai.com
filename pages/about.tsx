import Head from 'next/head';
import Layout from '../components/layout';
import Container from '../components/container';

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
