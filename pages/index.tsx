import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllPosts } from '../lib/api';
import { Container } from '../components/container';
import { SearchBar } from '../components/ui/search-bar';
import { PostPreview } from '../components/post-preview';
import { PostType } from '../components/post';

type Props = {
  allPosts: PostType[];
}

const IndexPage = ({ allPosts }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>loonskai.com</title>
      </Head>
      <Container>
        <SearchBar />
        <div>
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
    </>
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
