import { css } from '@emotion/react';
import { CustomHead } from '../components/custom-head';
import { Container } from '../components/container';
import { Heading } from '../components/ui/heading';

const Page404 = (): JSX.Element => (
  <>
    <CustomHead title="Page not found" description="Page not found" />
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
    displaySubscriptionForm: false,
  },
});

export default Page404;
