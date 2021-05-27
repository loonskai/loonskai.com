import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import LinkIcon from '../public/assets/icons/share/link.svg';
import TwitterIcon from '../public/assets/icons/share/twitter.svg';
import LinkedinIcon from '../public/assets/icons/share/linkedin.svg';
import FacebookIcon from '../public/assets/icons/share/facebook.svg';

const StyledShareLink = styled.a(({ theme }) => css`
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 0.4rem;
  cursor: pointer;
  
  &, & svg {
    transition: all ease 0.3s;
  }

  &:hover, &:focus {
    transform: scale(1.3);
    transition: all ease 0.3s;
    outline: 0;

    & svg {
      fill: ${theme.mainColor};
      transition: all ease 0.3s;
    }
  }
`);

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
        <FacebookIcon css={iconCss} />
      </StyledShareLink>
    </>
  );
}; 
