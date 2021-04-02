import Head from 'next/head';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { getAllPosts } from '../lib/api';
import Layout from '../components/layout';
import Container from '../components/container';
import { Post } from '../types/Post';

type Props = {
  allPosts: Post[];
}

export default function Index({ allPosts }: Props): JSX.Element {
  return (
    <>
      <Layout>
        <Head>
          <title>Siarhei Lunski personal blog</title>
        </Head>
        <Container>
          {allPosts.map(post => (
            <section key={post.slug}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                <a>Read more</a>
              </Link>
            </section>),
          )}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'slug',
    'excerpt',
  ]);
  return {
    props: { allPosts },
  };
};
