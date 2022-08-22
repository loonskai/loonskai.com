import { GetStaticProps } from 'next'
import { getAllBlogPosts } from '../../lib/api'
import { Container } from '../../components/container'
import { PostPreview } from '../../components/post-preview'
import { IPost } from '../../components/post'
import { Heading } from '../../components/ui/heading'

type Props = {
  allPosts: IPost[]
}

const BlogPage = ({ allPosts }: Props): JSX.Element => {
  return (
    <>
      <Container>
        <Heading>Recent posts</Heading>
        <div>
          {allPosts.map((post) => (
            <PostPreview key={post.slug} post={post} />
          ))}
        </div>
      </Container>
    </>
  )
}

export default BlogPage

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllBlogPosts([
    'title',
    'slug',
    'description',
    'keywords',
    'date',
    'estimated',
  ])

  return {
    props: {
      title: 'loonskai.com - A blog by Siarhei Lunski',
      description: 'Things about software development, web technologies, and life.',
      currentUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
      allPosts,
    },
  }
}
