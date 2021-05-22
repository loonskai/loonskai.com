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
    <article className="post-container">
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  </>
);
