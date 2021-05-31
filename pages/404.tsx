import Head from 'next/head';
import { css } from '@emotion/react';
import { Container } from '../components/container';
import { Heading } from '../components/ui/heading';

const Page404 = (): JSX.Element => (
  <>
    <Head>
      <title>Page not found| loonskai.com</title>
      <meta name="description" content="Page not found" />
    </Head>
    <section>
      <Heading>404 Not found</Heading>
      <Container>
        <p
          css={css`
            text-align: center;
          `}
        >Ooops, seems like this page doesn't exist :(</p>
      </Container>
    </section>
  </>
);

export default Page404;
