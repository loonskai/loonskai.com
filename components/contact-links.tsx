import { css, useTheme } from '@emotion/react';
import { SocialLink } from '../components/styled/social-link';
import GmailIcon from '../public/assets/icons/social/gmail.svg';
import GithubIcon from '../public/assets/icons/social/github.svg';
import TelegramIcon from '../public/assets/icons/social/telegram.svg';
import TwitterIcon from '../public/assets/icons/social/twitter.svg';
import LinkedinIcon from '../public/assets/icons/social/linkedin.svg';

export const ContactLinks = (): JSX.Element => {
  const theme = useTheme();
  const iconCss = css`
    width: 100%;
    height: 100%;
    fill: ${theme.text.primary};
  `;

  return (
    <div
      css={css`
        display: flex;
        margin: 1rem 0;
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
  );
}; 
