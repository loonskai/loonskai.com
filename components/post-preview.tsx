import { css, useTheme } from '@emotion/react'
import { PrimaryLink } from './ui/primary-link'
import { IPost } from '../components/post'
import { PostPreviewPublicationInfo } from './post-preview-publication-info'

type Props = {
  post: IPost
}

export const PostPreview = ({ post }: Props): JSX.Element => {
  const theme = useTheme()
  const { title, description, slug } = post

  return (
    <section
      key={slug}
      css={css`
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.25rem;
        background: ${theme.background.secondary};
        box-shadow: rgba(51, 51, 51, 0.1) 0px 32px 64px 0px;
        border-radius: 1.5rem;
        padding: 1rem 2rem;
      `}
    >
      <div
        css={css`
          width: 100%;
        `}
      >
        <h2
          css={css`
            font-size: 1.875rem;
            line-height: 2.25rem;
          `}
        >
          {title}
        </h2>
      </div>
      <PostPreviewPublicationInfo post={post} />
      <p
        css={css`
          margin-bottom: 0.5rem;
        `}
      >
        {description}
      </p>
      <div
        css={css`
          align-self: flex-start;
        `}
      >
        <PrimaryLink
          as={`/blog/${slug}`}
          href='/blog/[slug]'
          aria-label={`Read the post "${title}"`}
        >
          Read more
        </PrimaryLink>
      </div>
    </section>
  )
}
