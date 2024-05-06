import { css, useTheme } from '@emotion/react'
import { Container } from '../components/container'
import { Heading } from '../components/ui/heading'

const AboutPage = (): JSX.Element => {
  const theme = useTheme()

  return (
    <>
      <Container>
        <Heading>About Me</Heading>
        <section
          css={css`
            max-width: 500px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            font-size: 1.1rem;
            background: ${theme.background.secondary};
            box-shadow: rgba(51, 51, 51, 0.1) 0px 32px 64px 0px;
            border-radius: 1.5rem;
            padding: 2rem;

            & p {
              width: 100%;
              line-height: 1.5;
              text-align: left;
            }
          `}
        >
          <h2
            css={css`
              font-size: 2rem;
            `}
          >
            Hi!
          </h2>
          <img
            css={css`
              width: 10rem;
              height: 10rem;
              border-radius: 50%;
            `}
            src='./assets/about/me.jpg'
            alt='This is me'
          />
          <p>
            My name is <strong>Siarhei Lunski</strong> and I’m a software developer. I was born in a
            small town in Belarus <span className='flag my-flag' /> called David-Gorodok and
            currently I'm located in Warsaw working together with a great <strong>Zendesk</strong>{' '}
            team. <span className='flag current-flag' />
          </p>
          <p>
            I'm passionate about everything related to web development, clean interfaces and both
            customers and developers experience. I work with JavaScript most of the time but I’m
            always interested in learning new things.
          </p>
          <p>
            Also I believe that DIY is the best way to understand things not only in software
            development but in the outside world as well.
          </p>
        </section>
      </Container>
    </>
  )
}

export const getStaticProps = async () => ({
  props: {
    title: 'loonskai.com - About me',
    description: 'Things about web development and not only',
    currentUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
    displaySubscriptionForm: false,
  },
})

export default AboutPage
