import Link from 'next/link';
import dayjs from 'dayjs';
import { css, useTheme } from '@emotion/react';
import { Tag } from './ui/tag';
import { PrimaryLink } from './ui/primary-link';
import { serif } from '../shared/fonts';

type Props = {
  title?: string;
  excerpt?: string;
  slug?: string;
  date?: string;
  keywords?: string[];
}

export const PostPreview = ({ 
  title,
  excerpt,
  slug,
  date,
  keywords,
}: Props): JSX.Element => {
  const theme = useTheme();

  return (
    <section
      key={slug}
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.25rem;
        background: ${theme.backgroundSecondary};
        border-radius: 1.5rem;
        padding: 1rem;
      `}
    >
      <div
        css={css`
          width: 100%;
        `}
      >
        <h2
          css={css`
            ${serif}
            font-size: 1.875rem;
            line-height: 2.25rem;
          `}
        >{title}</h2>
      </div>
      <span
        css={css`
          width: 100%;
          margin-bottom: 0.25rem;
        `}
      >{dayjs(date).format('MMMM D, YYYY')}</span>
      <p>{excerpt}</p>
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            margin: 0.5rem 0;
          `}
        >
          {keywords.map((keyword, idx) => <Tag key={idx} tag={keyword} />)}
        </div>
        <Link
          as={`/posts/${slug}`}
          href="/posts/[slug]"
          passHref
        >
          <PrimaryLink>Read more</PrimaryLink>
        </Link>
      </div>
    </section>
  );
};
