import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getAllBlogPosts } from '../../lib/api';
import { Container } from '../../components/container';
import { PostPreview } from '../../components/post-preview';
import { IPost } from '../../components/post';
import { Heading } from '../../components/ui/heading';

type Props = {
  allPosts: IPost[];
}

const BlogPage = ({ allPosts }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>Blog | loonskai.com</title>
        <meta name="description" content="Siarhei Lunski personal blog page" />
        <meta property="og:title" content="Siarhei Lunski personal blog page" key="ogtitle" />
        <meta property="og:description" content="Things about web development and not only." key="ogdesc" />
      </Head>
      <Container>
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
    'description',
    'keywords',
    'date',
    'estimated',
  ]);
  return {
    props: { allPosts },
  };
};
