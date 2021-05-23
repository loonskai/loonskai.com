import Head from 'next/head';
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { containerCss } from './container';
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
  codeBackground: string
}

const StyledArticle = styled.article<StyledArticleProps>(({ codeBackground }) => css`
  pre {
    line-height: inherit;
    padding: 1rem;
    margin: 1rem 0;
    border-radius: 0.5rem;
  }

  pre,
  pre > code {
    background: ${codeBackground};
  }

  p {
    margin-bottom: 10px;
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
`);


export const Post = ({ post }: Props): JSX.Element => {
  const theme = useTheme();

  const postContainerCss = css`
    margin-top: 2rem;
    padding: 5rem;
    background: ${theme.backgroundSecondary};
    border-radius: 2rem;
  `;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <div css={[ containerCss, postContainerCss ]}>
        <StyledArticle codeBackground={theme.code.background} >
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </StyledArticle>
      </div>
    </>
  );
}; 
