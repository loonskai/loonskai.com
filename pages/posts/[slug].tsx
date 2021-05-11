import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Layout } from '../../components/layout';
import { PostContainer } from '../../components/post-container';
import { Container } from '../../components/container';
import { getAllPosts, getPostBySlug } from '../../lib/api';
import markdownToHtml from '../../lib/markdownToHtml';

const PostPage = (props): JSX.Element => {
  const router = useRouter();

  return (
    <Layout>
      <Container>
        {router.isFallback ? <div>Loading...</div> : <PostContainer {...props} />}
      </Container>
    </Layout>
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
