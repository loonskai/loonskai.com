import { useRouter } from 'next/router';
import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Container } from '../../components/container';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';
import { Post } from '../../types/Post';

type Props = {
  post: Post
}

export default function PostPage({ post }: Props): JSX.Element {
  const router = useRouter();

  return (
    <Container>
      {router.isFallback ? <div>Loading...</div> : <>
        <article>
          <Head>
            <title>
              {post.title}
            </title>
          </Head>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </>}
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = typeof params.slug === 'string' && params.slug;
  const post = getPostBySlug(slug, [
    'title',
    'content',
  ]);
  const content = await markdownToHtml(post.content || '');
  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts([ 'slug' ]);
  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};
