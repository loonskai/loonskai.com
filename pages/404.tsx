import { css } from '@emotion/react'
import { Container } from '../components/container'
import { Heading } from '../components/ui/heading'

const Page404 = (): JSX.Element => (
  <>
    <section>
      <Heading>404 Not found</Heading>
      <Container>
        <p
          css={css`
            text-align: center;
          `}
        >
          Ooops, seems like this page doesn't exist :(
        </p>
      </Container>
    </section>
  </>
)

export const getStaticProps = async () => ({
  props: {
    title: 'loonskai.com - Page not found',
    description: "This resource doesn't exist.",
    currentUrl: process.env.NEXT_PUBLIC_BASE_URL,
    displaySubscriptionForm: false,
  },
})

export default Page404
