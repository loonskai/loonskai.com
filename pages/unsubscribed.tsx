import { css } from '@emotion/react';
import { CustomHead } from '../components/custom-head';
import { Container } from '../components/container';
import { Heading } from '../components/ui/heading';

const UnsubscribedPage = (): JSX.Element => (
  <>
    <CustomHead title="Unsubscribed" description="Successfully unsubscribed" />
    <section>
      <Heading>Thanks and goodbye!</Heading>
      <Container>
        <p
          css={css`
            text-align: center;
          `}
        >And remember that you can always come back ;)</p>
      </Container>
    </section>
  </>
);

export const getStaticProps= async () => ({
  props: {
    displaySubscriptionForm: false,
  },
});

export default UnsubscribedPage;
