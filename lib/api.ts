import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { IPost } from '../components/post'

const blogDirectory = join(process.cwd(), '_blog')

export function getBlogSlugs(): string[] {
  return fs.readdirSync(blogDirectory)
}

export function getPostBySlug(slug: string, fields = []): IPost {
  const realSlug = slug.replace(/.md$/, '')
  const fullPath = join(blogDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }
    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllBlogPosts(fields = []): IPost[] {
  const slugs = getBlogSlugs()
  return slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
}
