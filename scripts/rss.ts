import fs from 'fs';
import { Feed } from 'feed';
import { getAllBlogPosts } from '../lib/api';
import markdownToHtml from '../lib/markdownToHtml';

(async (): Promise<void> => {
  if (process.env.NODE_ENV === 'development') return;

  const baseUrl = process.env.BASE_URL;
  console.log('baseUrl', baseUrl);
  const date = new Date();
  const author = {
    name: 'Siarhei Lunski',
    email: 'loonskai@gmail.com',
    link: 'https://twitter.com/loonskai',
  };

  const feed = new Feed({
    title: 'Siarhei Lunski blog',
    description: 'Things about development and not only',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    copyright: `All rights reserved ${date.getFullYear()}, Siarhei Lunski`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
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
    'estimated',
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
  }));

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
})();
