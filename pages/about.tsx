import Head from 'next/head';
import { css, useTheme } from '@emotion/react';
import { Container } from '../components/container';
import { Heading } from '../components/ui/heading';
import { SubscribeForm } from '../components/subscribe-form';
import { serif } from '../shared/fonts';
import { SocialLink } from '../components/styled/social-link';
import GmailIcon from '../public/assets/icons/social/gmail.svg';
import GithubIcon from '../public/assets/icons/social/github.svg';
import TelegramIcon from '../public/assets/icons/social/telegram.svg';
import TwitterIcon from '../public/assets/icons/social/twitter.svg';
import LinkedinIcon from '../public/assets/icons/social/linkedin.svg';

const AboutPage = (): JSX.Element => {
  const theme = useTheme();
  const iconCss = css`
    width: 100%;
    height: 100%;
    fill: ${theme.text.primary};
  `;

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
          <p>My name is <strong>Siarhei Lunski</strong> and I’m a software developer. I was born in a small town in Belarus <span className="flag my-flag"/> called David-Horodok and currently I'm located in Warsaw, Poland. <span className="flag current-flag"/></p>
          <p>I have passion for everything related to web development, clean interfaces and both customer and developer experience. I work with JavaScript most of the time but I’m always interested in learning new things.</p>
          <p>Also I believe that DIY is the best way to understand things not only in software development but in the outside world as well.</p>
          <p>If I can help you in any way you can always reach me there:</p>
          <div
            css={css`
              display: flex;
            `}
          >
            <SocialLink tabIndex={0} href="mailto:loonskai@gmail.com" target='_blank' rel='noopener noreferrer'>
              <GmailIcon css={iconCss} />
            </SocialLink>
            <SocialLink tabIndex={0} href="https://github.com/loonskai" target='_blank' rel='noopener noreferrer'>
              <GithubIcon css={iconCss} />
            </SocialLink>
            <SocialLink tabIndex={0} href="https://twitter.com/loonskai" target='_blank' rel='noopener noreferrer'>
              <TwitterIcon css={iconCss} />
            </SocialLink>
            <SocialLink tabIndex={0} href="https://www.linkedin.com/in/siarhei-lunski" target='_blank' rel='noopener noreferrer'>
              <LinkedinIcon css={iconCss} />
            </SocialLink>
            <SocialLink tabIndex={0} href="https://t.me/loonskai" target='_blank' rel='noopener noreferrer'>
              <TelegramIcon css={iconCss} />
            </SocialLink>
          </div>
        </section>
        <SubscribeForm />
      </Container>
    </>
  );
};

export default AboutPage;
