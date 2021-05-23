import Head from 'next/head';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
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

const postContainerCss = css`
  padding: 5rem;
  background: white;
`;

const StyledArticle = styled.article`
  pre {
    line-height: inherit;
    padding: 15px;
    margin: 15px 0;
    border-radius: 10px;
    background: #2f2f2f;
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
`;

export const Post = ({ post }: Props): JSX.Element => (
  <>
    <Head>
      <title>{post.title}</title>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
    </Head>
    <div css={[ containerCss, postContainerCss ]}>
      <StyledArticle>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </StyledArticle>
    </div>
  </>
);
