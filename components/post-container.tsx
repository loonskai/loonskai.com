import Head from 'next/head';
import { Post } from '../types/Post';

type Props = {
  post: Post
}

export const PostContainer = ({ post }: Props): JSX.Element => (
  <>
    <Head>
      <title>
        {post.title}
      </title>
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
    </Head>
    <article>
      <h1 className="font-serif text-5xl">{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  </>
);
