import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import LinkIcon from '../public/assets/icons/share/link.svg';
import TwitterIcon from '../public/assets/icons/share/twitter.svg';
import LinkedinIcon from '../public/assets/icons/share/linkedin.svg';
import TelegramIcon from '../public/assets/icons/share/telegram.svg';
import FacebookIcon from '../public/assets/icons/share/facebook.svg';
import { svgIconHover } from '../shared/styles';

const StyledShareLink = styled.a`
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 0.4rem;
  cursor: pointer;

  ${svgIconHover}
`;

export const SharePost = (/* { children }: PropsWithChildren<ReactNode> */): JSX.Element => {
  const theme = useTheme();
  const iconCss = css`
    width: 100%;
    height: 100%;
    fill: ${theme.text.primary};
  `;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <>
      <StyledShareLink onClick={copyToClipboard} tabIndex={0} theme={theme}>
        <LinkIcon css={iconCss} />
      </StyledShareLink>
      <StyledShareLink tabIndex={0}>
        <TwitterIcon css={iconCss} />
      </StyledShareLink>
      <StyledShareLink tabIndex={0}>
        <LinkedinIcon css={iconCss} />
      </StyledShareLink>
      <StyledShareLink tabIndex={0}>
        <TelegramIcon css={iconCss} />
      </StyledShareLink>
      <StyledShareLink tabIndex={0}>
        <FacebookIcon css={iconCss} />
      </StyledShareLink>
    </>
  );
}; 
