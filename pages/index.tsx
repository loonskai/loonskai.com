import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllPosts } from '../lib/api';
import { Container } from '../components/container';
import { Layout } from '../components/layout';
import { SearchBar } from '../components/ui/search-bar';
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
        <SearchBar />
        <div className="grid grid-cols-1 gap-4 auto-rows-max md:grid-cols-2">
          {allPosts.map(post => (
            <PostPreview
              key={post.slug}
              title={post.title}
              excerpt={post.excerpt}
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
    'keywords',
    'date',
  ]);
  return {
    props: { allPosts },
  };
};
