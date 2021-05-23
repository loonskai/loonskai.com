import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import markdownToHtml from '../../lib/markdownToHtml';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import { Post } from '../../components/post';
import { codeStyles } from '../../shared/styles';

const PostPage = (props): JSX.Element => {
  const router = useRouter();

  return (
    <>
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
