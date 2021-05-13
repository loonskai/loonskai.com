import Link from 'next/link';
import dayjs from 'dayjs';
import { Tag } from './ui/tag';
import { PrimaryLink } from './ui/primary-link';

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
}: Props): JSX.Element => (
  <section className="flex flex-col justify-between gap-1 bg-secondary rounded-3xl p-4" key={slug}>
    <div className="w-full text-center">
      <h2 className="text-3xl font-serif">{title}</h2>
    </div>
    <div className="flex justify-between w-full mb-1 text-sm">
      <span>{dayjs(date).format('MMMM D, YYYY')}</span>
      <div className="inline-block">
        {keywords.map((keyword, idx) => <Tag key={idx} tag={keyword} />)}
      </div>
    </div>
    <p>{excerpt}</p>
    <div className="full text-right">
      <Link
        as={`/posts/${slug}`}
        href="/posts/[slug]"
        passHref
      >
        <PrimaryLink>
        Read more
        </PrimaryLink>
      </Link>
    </div>
  </section>
);
