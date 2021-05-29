import Head from 'next/head';
import styled from '@emotion/styled';
import { css, useTheme, Theme } from '@emotion/react';
import { containerCss } from './container';
import { PostPreviewPublicationInfo } from './post-preview-publication-info';
import { SharePost } from './share-post';
import { Heading } from './ui/heading';
import { mediaQueries } from '../shared/styles';
import { serif } from '../shared/fonts';
import { TopScroll } from './top-scroll';
import { visuallyHidden } from '../shared/styles';

export type IPost = {
  title?: string
  slug?: string
  description?: string
  content?: string
  date?: string
  keywords?: string[]
  estimated?: string
}

type Props = {
  post: IPost
}

type StyledArticleProps = {
  theme: Theme
}

const StyledArticle = styled.article<StyledArticleProps>(({ theme }) => css`
  pre {
    line-height: inherit;
    border-radius: 0.5rem;
  }

  p {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
    line-height: 1.725rem;
  }

  p > code, li > code {
    padding: 0.125rem 0.250rem;
    border-radius: 0.2rem;
    background: ${theme.background.primary};
    font-size: 1rem;
    word-wrap: break-word;
  }

  h1, h2, h3, h4, h5, h6 {
    ${serif}
    font-weight: 700;
    line-height: 1.2;
  }

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 0;
  }

  a {
    font-weight: 600;
    color: ${theme.text.primary};
    position: relative;
    text-decoration: none;
    font-style: italic;
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
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 0.2rem;
    margin: 2rem auto 1rem auto;
    box-shadow: 0px 0px 30px -15px rgba(0,0,0,0.4);
  }

  blockquote {
    padding: 1rem 2rem;
    border-left: 4px solid ${theme.mainColor};
    margin-bottom: 1.5rem;
    background: ${theme.background.primary};
  }

  blockquote > p {
    font-size: 1.2rem;
    font-style: italic;
    margin: 0;
  }

  ul {
    padding: 1rem 2rem;
    margin-bottom: 1.5rem;
  }

  li {
    font-size: 1.125rem;
    margin-bottom: 1.125rem;
    line-height: 1.5;
  }

  .toc {
    padding: 1rem 5rem;
  }

  .img-description {
    display: inline-block;
    text-align: center;
    width: 100%;
    font-size: 1rem;
    font-style: italic;
    color: ${theme.text.description};
  }
`);

export const Post = ({ post }: Props): JSX.Element => {
  const theme = useTheme();

  const postContainerCss = css`
    margin-top: 2rem;
    padding: 2rem;
    background: ${theme.background.secondary};
    border-radius: 2rem;
    box-sizing: border-box;
    box-shadow: rgba(51, 51, 51, 0.1) 0px 32px 64px 0px;

    ${mediaQueries.laptopMedium} {
      padding: 5rem;
    }
  `;

  return (
    <TopScroll>
      <span id="top" css={visuallyHidden} />
      <Head>
        <title>{post.title}</title>
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
      </Head>
      <div css={[ containerCss, postContainerCss ]}>
        <Heading>{post.title}</Heading>
        <PostPreviewPublicationInfo post={post}>
          <SharePost title={post.title} />
        </PostPreviewPublicationInfo>
        <StyledArticle theme={theme}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </StyledArticle>
      </div>
    </TopScroll>
  );
}; 
