import Link from 'next/link';
import { css, useTheme } from '@emotion/react';
import { SubscribeForm } from '../components/subscribe-form';
import { ContactLinks } from '../components/contact-links';
import { svgIconHover, mediaQueries } from '../shared/styles';
import RssIcon from '../public/assets/icons/rss.svg';

export const Footer = (): JSX.Element => {
  const theme = useTheme();

  return (
    <footer
      css={css`
        margin-top: 2rem;
        padding: 2rem 0;
      `}
    >
      <section
        css={css`
          max-width: 800px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          text-align: center;

          ${mediaQueries.laptopSmall} {
            justify-content: space-between;
            text-align: left;
          }
        `}
      >
        <SubscribeForm />
        <section
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin: 1rem 0;
            align-items: center;
            text-align: center

            ${mediaQueries.laptopSmall} {
              margin: 0;
              align-items: flex-start;
              text-align: left;
            }
          `}
        >
          <div
            css={css`
              width: 100%;
            `}
          >
            <h3
              css={css`
                font-size: 1.7rem;
                line-height: 2.25rem;
            `}
            >Contact me:</h3>
            <ContactLinks />
          </div>
          <div
            css={css`
              width: 100%;
            `}
          >
            <Link href='/rss/feed.xml' passHref>
              <a 
                target='_blank' 
                rel='noopener noreferrer'
                css={css`
                cursor: pointer;
                text-decoration: none;
                color: ${theme.text.primary};
                ${svgIconHover}
              `}
              >
                <RssIcon
                  css={css`
                    fill: ${theme.text.primary};
                    width: 30px;
                    height: 30px;
                  `}
                />
              </a>
            </Link>
            <div
              css={css`
                align-self: flex-end;
                font-weight: 600;
              `}
            >© Siarhei Lunski, 2021
            </div>
          </div>
        </section>
      </section>
    </footer>
  );
}; 
