import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import slug from 'remark-slug';
import toc from 'remark-toc';

export default async function markdownToHtml(markdown: string): Promise<string> {
  // TODO: Configure attributes for markdown items
  const result = await remark()
    .use(html)
    .use(prism)
    .use(slug)
    .use(toc)
    .process(markdown);

  return result.toString();
}
