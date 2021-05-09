import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllPosts } from '../lib/api';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { PostPreview } from '../components/post-preview';
import { Post } from '../types/Post';

type Props = {
  allPosts: Post[];
}

const IndexPage = ({ allPosts }: Props): JSX.Element => {
  return (
    <Layout>
      <Head>
        <title>loonskai.com</title>
      </Head>
      <Container>
        <div className="grid grid-cols-1 auto-rows-max md:grid-cols-2 lg:grid-cols-3">
          {allPosts.map(post => (
            <PostPreview
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
              coverImage={post.coverImage}
              slug={post.slug}
              keywords={post.keywords}
              date={post.date}
            />
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'slug',
    'excerpt',
    'coverImage',
    'keywords',
    'date',
  ]);
  return {
    props: { allPosts },
  };
};
