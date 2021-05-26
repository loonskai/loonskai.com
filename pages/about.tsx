import Head from 'next/head';
import { Container } from '../components/container';
import { InProgress } from '../components/in-progress';
import { Heading } from '../components/ui/heading';

const IndexPage = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>loonskai.com</title>
      </Head>
      <Container>
        <Heading>About Me</Heading>
        <InProgress />
      </Container>
    </>
  );
};

export default IndexPage;
