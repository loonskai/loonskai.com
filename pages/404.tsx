import { css } from '@emotion/react';
import { Container } from '../components/container';
import { Heading } from '../components/ui/heading';

const Page404 = (): JSX.Element => (
  <>
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

export const getStaticProps= async () => ({
  props: {
    title: 'Page not found',
    description: 'Page not found',
    displaySubscriptionForm: false,
  },
});

export default Page404;
