import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllPosts } from '../lib/api';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { PostPreview } from '../components/post-preview';
import { Post } from '../types/Post';
import { InProgress } from '../components/in-progress';

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
        <InProgress />
        {/* {allPosts.map(post => (
          <PostPreview
            key={post.slug}
            title={post.title}
            excerpt={post.excerpt}
            coverImage={post.coverImage}
            slug={post.slug}
            date={post.date}
          />
        ))} */}
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
    'date',
  ]);
  return {
    props: { allPosts },
  };
};
