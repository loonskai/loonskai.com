import Head from 'next/head'
import styled from '@emotion/styled'
import { css, useTheme, Theme } from '@emotion/react'
import { containerCss } from './container'
import { PostPreviewPublicationInfo } from './post-preview-publication-info'
import { SharePost } from './share-post'
import { Heading } from './ui/heading'
import { mediaQueries } from '../shared/styles'
import { TopScroll } from './top-scroll'
import { visuallyHidden } from '../shared/styles'

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

const StyledArticle = styled.article<StyledArticleProps>(
  ({ theme }) => css`
    pre {
      line-height: inherit;
      border-radius: 0.5rem;
    }

    p {
      font-size: 1.125rem;
      margin-bottom: 1.5rem;
      line-height: 1.725rem;
    }

    p > code,
    li > code,
    strong > code {
      padding: 0.125rem 0.25rem;
      border-radius: 0.2rem;
      background: ${theme.background.primary};
      font-size: 1rem;
      word-wrap: break-word;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
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
      display: inline !important;
      color: ${theme.text.primary};
      text-decoration: none;
      font-style: italic;
      font-weight: 600;
      z-index: 0;
      background-image: linear-gradient(to bottom, ${theme.mainColor}, ${theme.mainColor});
      background-position: 0 1.3em;
      background-repeat: repeat-x;
      background-size: 8px 4px;
      padding-bottom: 4px;
      transition: all ease 0.3s;
    }

    a:hover {
      color: ${theme.mainColor};
      background-image: none;
      transition: all ease 0.3s;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
      border-radius: 0.2rem;
      margin: 2rem auto 1rem auto;
      box-shadow: 0px 0px 30px -15px rgba(0, 0, 0, 0.4);
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
      padding: 2rem 2rem 0 2rem;
    }

    .img-description {
      display: inline-block;
      text-align: center;
      width: 100%;
      font-size: 1rem;
      font-style: italic;
      color: ${theme.text.description};
    }

    ${mediaQueries.laptopMedium} {
      .toc {
        padding: 4rem 5rem 1rem 5rem;
      }
    }
  `,
)

export const Post = ({ post }: Props): JSX.Element => {
  const theme = useTheme()

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
  `

  return (
    <TopScroll>
      <span id='top' css={visuallyHidden} />
      <Head>
        <title>{post.title}</title>
      </Head>
      <div css={[containerCss, postContainerCss]}>
        <Heading>{post.title}</Heading>
        <PostPreviewPublicationInfo post={post}>
          <SharePost title={post.title} />
        </PostPreviewPublicationInfo>
        <StyledArticle theme={theme}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </StyledArticle>
      </div>
    </TopScroll>
  )
}
