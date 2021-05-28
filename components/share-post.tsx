import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { getShareLinks } from '../lib/getShareLinks';
import { PopUpTooltip } from './ui/popup-tooltip';
import LinkIcon from '../public/assets/icons/share/link.svg';
import TwitterIcon from '../public/assets/icons/share/twitter.svg';
import LinkedinIcon from '../public/assets/icons/share/linkedin.svg';
import TelegramIcon from '../public/assets/icons/share/telegram.svg';
import FacebookIcon from '../public/assets/icons/share/facebook.svg';
import { svgIconHover } from '../shared/styles';
import { useEffect, useState } from 'react';

type Props = {
  title: string
}

const StyledShareLink = styled.a`
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 0.4rem;
  cursor: pointer;

  ${svgIconHover}
`;

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
    <>
      <StyledShareLink onClick={copyToClipboard} tabIndex={0} theme={theme}>
        {copiedToClipboard && <PopUpTooltip>Copied to clipboard</PopUpTooltip>}
        <LinkIcon css={iconCss} />
      </StyledShareLink>
      <StyledShareLink tabIndex={0} onClick={bindNewWindow(shareLinks.twitter)}>
        <TwitterIcon css={iconCss} />
      </StyledShareLink>
      <StyledShareLink tabIndex={0} onClick={bindNewWindow(shareLinks.linkedin)}>
        <LinkedinIcon css={iconCss} />
      </StyledShareLink>
      <StyledShareLink tabIndex={0} onClick={bindNewWindow(shareLinks.telegram)}>
        <TelegramIcon css={iconCss} />
      </StyledShareLink>
      <StyledShareLink tabIndex={0} onClick={bindNewWindow(shareLinks.facebook)}>
        <FacebookIcon css={iconCss} />
      </StyledShareLink>
    </>
  );
}; 
