import Head from 'next/head';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
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
  textColor: string
  mainColor: string
  codeBg: string
  snippetBg: string
}

const StyledArticle = styled.article<StyledArticleProps>(({ textColor, mainColor, snippetBg, codeBg }) => css`
  pre {
    line-height: inherit;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.5rem;
    overflow-x: auto;
  }

  pre,
  pre > code {
    background: ${snippetBg};
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
    background: ${codeBg};
    word-wrap: break-word;
  }

  h1, h2, h3, h4, h5, h6 {
    ${serif}
    font-weight: 700;
    line-height: 1.2;
  }

  h1 {
    font-size: 3.75rem;
    margin-bottom: 40px;
  }

  h2 {
    font-size: 2.5rem;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  a {
    text-decoration: none;
    font-weight: 600;
    color: ${textColor};
    border-bottom: 2px solid ${mainColor};
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
        <StyledArticle 
          textColor={theme.textPrimary} 
          mainColor={theme.mainColor} 
          snippetBg={theme.snippet.background} 
          codeBg={theme.backgroundPrimary}
        >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </StyledArticle>
      </div>
    </>
  );
}; 
