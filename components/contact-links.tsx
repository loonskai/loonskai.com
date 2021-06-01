import { css, useTheme } from '@emotion/react';
import { SocialLink } from '../components/styled/social-link';
import GmailIcon from '../public/assets/icons/social/gmail.svg';
import GithubIcon from '../public/assets/icons/social/github.svg';
import TelegramIcon from '../public/assets/icons/social/telegram.svg';
import TwitterIcon from '../public/assets/icons/social/twitter.svg';
import LinkedinIcon from '../public/assets/icons/social/linkedin.svg';
import { mediaQueries } from '../shared/styles';

type Props = {
  center: boolean
}

export const ContactLinks = ({ center = false }: Props): JSX.Element => {
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
        justify-content: center;
        margin: 1rem 0;

        ${mediaQueries.laptopSmall} {
          justify-content: ${center ? 'center' : 'flex-start'};
        }
      `}
    >
      <SocialLink tabIndex={0} href="mailto:loonskai@gmail.com" target='_blank' rel='noopener noreferrer' aria-label='Gmail contact link'>
        <GmailIcon css={iconCss} />
      </SocialLink>
      <SocialLink tabIndex={0} href="https://github.com/loonskai" target='_blank' rel='noopener noreferrer' aria-label='Github link'>
        <GithubIcon css={iconCss} />
      </SocialLink>
      <SocialLink tabIndex={0} href="https://twitter.com/loonskai" target='_blank' rel='noopener noreferrer' aria-label='Twitter link'>
        <TwitterIcon css={iconCss} />
      </SocialLink>
      <SocialLink tabIndex={0} href="https://www.linkedin.com/in/siarhei-lunski" target='_blank' rel='noopener noreferrer' aria-label='Linkedin link'>
        <LinkedinIcon css={iconCss} />
      </SocialLink>
      <SocialLink tabIndex={0} href="https://t.me/loonskai" target='_blank' rel='noopener noreferrer' aria-label='Telegram link'>
        <TelegramIcon css={iconCss} />
      </SocialLink>
    </div>
  );
}; 
