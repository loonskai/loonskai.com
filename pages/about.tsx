import Head from 'next/head';
import { css, useTheme } from '@emotion/react';
import { Container } from '../components/container';
import { Heading } from '../components/ui/heading';
import { serif } from '../shared/fonts';
import { ContactLinks } from '../components/contact-links';

const AboutPage = (): JSX.Element => {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>loonskai.com</title>
      </Head>
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
              ${serif}
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
            src="./assets/about/me.png"
            alt="This is me"
          />
          <p>My name is <strong>Siarhei Lunski</strong> and I’m a software developer. I was born in a small town in Belarus <span className="flag my-flag"/> called David-Gorodok and currently I'm located in Warsaw, Poland. <span className="flag current-flag"/></p>
          <p>I have passion for everything related to web development, clean interfaces and both customer and developer experience. I work with JavaScript most of the time but I’m always interested in learning new things.</p>
          <p>Also I believe that DIY is the best way to understand things not only in software development but in the outside world as well.</p>
          <p>If I can help you in any way you can always reach me there:</p>
          <ContactLinks />
        </section>
      </Container>
    </>
  );
};

export default AboutPage;
