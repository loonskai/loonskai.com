import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import markdownToHtml from '../../lib/markdownToHtml';
import { getAllBlogPosts, getPostBySlug } from '../../lib/api';
import { Post, IPost } from '../../components/post';
import { codeStyles } from '../../shared/styles';

type Props = {
  post: IPost
}

const PostPage = (props: Props): JSX.Element => {
  const router = useRouter();
  const { post } = props;

  return (
    <>
      <Head>
        <title>{post.title} | loonskai.com</title>
        <meta name="description" content={post.description} />
      </Head>
      {codeStyles}
      {router.isFallback ? <div>Loading...</div> : <Post {...props} />}
    </>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = typeof params.slug === 'string' && params.slug;
  const post = getPostBySlug(slug, [
    'title',
    'description',
    'content',
    'keywords',
    'date',
    'estimated',
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
  const posts = getAllBlogPosts([ 
    'slug',
    'keywords',
    'date',
    'estimated',
  ]);

  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
};
