import Head from 'next/head';
import styled from '@emotion/styled';
import { css, useTheme, Theme } from '@emotion/react';
import { containerCss } from './container';
import { mediaQueries } from '../shared/styles';
import { serif } from '../shared/fonts';

export type PostType = {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  date?: string;
  keywords?: string[];
}

type Props = {
  post: PostType
}

type StyledArticleProps = {
  theme: Theme
}

const StyledArticle = styled.article<StyledArticleProps>(({ theme }) => css`
  pre {
    line-height: inherit;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.5rem;
    overflow-x: auto;
  }

  pre,
  pre > code {
    background: ${theme.snippet.background};
  }

  pre > code {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  p {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    line-height: 1.725rem;
  }

  p > code {
    padding: 0.125rem 0.250rem;
    border-radius: 0.2rem;
    background: ${theme.backgroundPrimary};
    font-size: 1rem;
    word-wrap: break-word;
  }

  h1, h2, h3, h4, h5, h6 {
    ${serif}
    font-weight: 700;
    line-height: 1.2;
  }

  h1 {
    font-size: 3.75rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2.5rem;
    margin: 2rem 0;
  }

  a {
    font-weight: 600;
    color: ${theme.textPrimary};
    position: relative;
    text-decoration: none;
    display: inline-block;
    padding: 0 1px;
    transition: color ease 0.3s;
    z-index: 0;
  }

  a::after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 10%;
    left: 0;
    bottom: 0;
    background-color: ${theme.mainColor};
    transition: all ease 0.3s;
  }
  
  a:hover {
    color: #ffffff;
  }

  a:hover::after {
    height: 100%;
  }

  img {
    display: block;
    border-radius: 0.2rem;
    margin: 2rem auto;
    box-shadow: 0px 0px 30px -15px rgba(0,0,0,0.4);
  }

  blockquote {
    padding: 1rem 2rem;
    border-left: 4px solid ${theme.mainColor};
    margin-bottom: 1.5rem;
    background: ${theme.backgroundPrimary};
  }

  blockquote > p {
    font-size: 1.2rem;
    font-style: italic;
    margin: 0;
  }
`);


export const Post = ({ post }: Props): JSX.Element => {
  const theme = useTheme();

  const postContainerCss = css`
    margin-top: 2rem;
    padding: 2rem;
    background: ${theme.backgroundSecondary};
    border-radius: 2rem;
    box-sizing: border-box;

    ${mediaQueries.laptopMedium} {
      padding: 5rem;
    }
  `;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <div css={[ containerCss, postContainerCss ]}>
        <StyledArticle theme={theme}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </StyledArticle>
      </div>
    </>
  );
}; 
