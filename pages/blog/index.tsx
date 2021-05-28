import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllBlogPosts } from '../../lib/api';
import { Container } from '../../components/container';
import { PostPreview } from '../../components/post-preview';
import { IPost } from '../../components/post';
import { Heading } from '../../components/ui/heading';
import { SubscribeForm } from '../../components/subscribe-form';

type Props = {
  allPosts: IPost[];
}

const BlogPage = ({ allPosts }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>loonskai.com</title>
      </Head>
      <Container>
        <Heading>Recent posts</Heading>
        <div>
          {allPosts.map(post => <PostPreview key={post.slug} post={post} />)}
        </div>
        <SubscribeForm />
      </Container>
    </>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllBlogPosts([
    'title',
    'slug',
    'description',
    'keywords',
    'date',
    'estimated',
  ]);
  return {
    props: { allPosts },
  };
};
