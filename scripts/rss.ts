import fs from 'fs';
import { Feed } from 'feed';
import { getAllBlogPosts } from '../lib/api';
import markdownToHtml from '../lib/markdownToHtml';

(async (): Promise<void> => {
  if (process.env.NODE_ENV === 'development') return;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const date = new Date();
  const author = {
    name: 'Siarhei Lunski loonskai.com RSS Feed',
    email: 'loonskai@gmail.com',
    link: 'https://twitter.com/loonskai',
  };

  const feed = new Feed({
    title: 'Siarhei Lunski blog',
    description: 'Personal blog of Siarhei Lunski. Things about development and not only',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/image.png`,
    favicon: `${baseUrl}/favicon/favicon.ico`,
    copyright: 'All rights reserved 2021, Siarhei Lunski',
    updated: date,
    generator: 'Next.js',
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
    },
    author,
  });

  const posts = getAllBlogPosts([
    'title',
    'slug',
    'description',
    'keywords',
    'date',
    'content',
  ]);

  await Promise.all(posts.map(async (post) => {
    const url = `${baseUrl}/${post.slug}`;
    const content = await markdownToHtml(post.content);
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      content,
      author: [ author ],
      contributor: [ author ],
      date: new Date(post.date),
    });
    post.keywords.forEach(keyword => {
      feed.addCategory(keyword);
    });
  }));

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
})();
