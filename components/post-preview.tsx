import Link from 'next/link';

type Props = {
  title?: string;
  excerpt?: string;
  coverImage?: string;
  slug?: string;
  date?: string;
}

export const PostPreview = ({ 
  title,
  excerpt,
  coverImage,
  slug,
  date,
}: Props): JSX.Element => (
  <section key={slug}>
    <h2>{title}</h2>
    <p>{excerpt}</p>
    <span>{date.toString()}</span>
    <img
      src={coverImage}
      alt={title}
    />
    <Link
      as={`/posts/${slug}`}
      href="/posts/[slug]"
    >
      <a>Read more</a>
    </Link>
  </section>
);
