import Link from 'next/link';
import dayjs from 'dayjs';
import { Tag } from './ui/tag';

type Props = {
  title?: string;
  excerpt?: string;
  coverImage?: string;
  slug?: string;
  date?: string;
  keywords?: string[];
}

export const PostPreview = ({ 
  title,
  excerpt,
  coverImage,
  slug,
  date,
  keywords,
}: Props): JSX.Element => (
  <section className="block bg-skin-content rounded-3xl p-4" key={slug}>
    <div className="w-full text-center">
      <h2 className="text-2xl font-serif">{title}</h2>
    </div>
    <div className="flex justify-between w-full mb-1 text-sm">
      <div className="inline-block">
        {keywords.map((keyword, idx) => <Tag key={idx} tag={keyword} />)}
      </div>
      <span>{dayjs(date).format('DD/MM/YYYY')}</span>
    </div>
    <div className="flex w-full">
      <img
        className="object-cover"
        src={coverImage}
        alt={title}
      />
    </div>
    <p>{excerpt}</p>
    <Link
      as={`/posts/${slug}`}
      href="/posts/[slug]"
    >
      <a>Read more</a>
    </Link>
  </section>
);
