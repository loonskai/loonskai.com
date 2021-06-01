import { css } from '@emotion/react';
import { Container } from '../components/container';
import { Heading } from '../components/ui/heading';

const UnsubscribedPage = (): JSX.Element => (
  <>
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
    title: 'Unsubscribed',
    description: 'Successfully unsubscribed',
    displaySubscriptionForm: false,
  },
});

export default UnsubscribedPage;
