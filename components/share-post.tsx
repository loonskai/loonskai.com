import { css, useTheme } from '@emotion/react';
import { getShareLinks } from '../lib/getShareLinks';
import { PopUpTooltip } from './ui/popup-tooltip';
import { SocialLink } from './styled/social-link';
import LinkIcon from '../public/assets/icons/social/link.svg';
import TwitterIcon from '../public/assets/icons/social/twitter.svg';
import LinkedinIcon from '../public/assets/icons/social/linkedin.svg';
import TelegramIcon from '../public/assets/icons/social/telegram.svg';
import FacebookIcon from '../public/assets/icons/social/facebook.svg';
import { useEffect, useState } from 'react';

type Props = {
  title: string
}

export const SharePost = ({ title }: Props): JSX.Element => {
  const theme = useTheme();
  const [ copiedToClipboard, setCopiedToClipboard ] = useState(false);
  const shareLinks = getShareLinks({ title, url: window.location.href });

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopiedToClipboard(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [ copiedToClipboard ]);

  const iconCss = css`
    width: 100%;
    height: 100%;
    fill: ${theme.text.primary};
  `;

  const copyToClipboard = () => {
    setCopiedToClipboard(true);
    navigator.clipboard.writeText(window.location.href);
  };

  const bindNewWindow = (url: string) => () => {
    window.open(url, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
  };

  return (
    <div
      css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      `}
    >
      <span
        css={css`
          white-space: nowrap;
          font-style: italic;
          margin-right: 1rem;
          margin-bottom: 1rem;
        `}
      >
        Share this post:</span>
      <div
        css={css`
          display: flex;
        `}
      >
        <SocialLink onClick={copyToClipboard} tabIndex={0} theme={theme}>
          {copiedToClipboard && <PopUpTooltip>Copied to the clipboard</PopUpTooltip>}
          <LinkIcon css={iconCss} />
        </SocialLink>
        <SocialLink tabIndex={0} onClick={bindNewWindow(shareLinks.twitter)}>
          <TwitterIcon css={iconCss} />
        </SocialLink>
        <SocialLink tabIndex={0} onClick={bindNewWindow(shareLinks.linkedin)}>
          <LinkedinIcon css={iconCss} />
        </SocialLink>
        <SocialLink tabIndex={0} onClick={bindNewWindow(shareLinks.telegram)}>
          <TelegramIcon css={iconCss} />
        </SocialLink>
        <SocialLink tabIndex={0} onClick={bindNewWindow(shareLinks.facebook)}>
          <FacebookIcon css={iconCss} />
        </SocialLink>
      </div>
    </div>
  );
}; 
