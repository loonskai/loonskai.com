import Head from 'next/head';
import { Container } from '../components/container';
import { InProgress } from '../components/in-progress';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>loonskai.com</title>
      </Head>
      <Container>
        <InProgress />
      </Container>
    </>
  );
};

export default IndexPage;
