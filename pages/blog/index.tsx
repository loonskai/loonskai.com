import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllBlogPosts } from '../../lib/api';
import { Container } from '../../components/container';
// import { SearchBar } from '../components/ui/search-bar';
import { PostPreview } from '../../components/post-preview';
import { PostType } from '../../components/post';
import { Heading } from '../../components/ui/heading';

type Props = {
  allPosts: PostType[];
}

const BlogPage = ({ allPosts }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>loonskai.com</title>
      </Head>
      <Container>
        {/* <SearchBar /> */}
        <Heading>Recent posts</Heading>
        <div>
          {allPosts.map(post => <PostPreview key={post.slug} post={post} />)}
        </div>
      </Container>
    </>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllBlogPosts([
    'title',
    'slug',
    'excerpt',
    'keywords',
    'date',
    'estimated',
  ]);
  return {
    props: { allPosts },
  };
};
