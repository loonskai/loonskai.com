import remark from 'remark';
import html from 'remark-html';
import prism from 'remark-prism';
import slug from 'remark-slug';
import toc from 'remark-toc';
import all from 'mdast-util-to-hast/lib/all';
import normalize from 'mdurl/encode.js';

export default async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark()
    .use(html, {
      handlers: {
        link: (h, node) => {
          const props = { 
            href: normalize(node.url),
            target: null,
            rel: null,
          };

          const url = node.url as string;
          if (!url.startsWith('#')) {
            props.target = '_blank';
            props.rel = 'noopener noreferrer';
          }

          return h(node, 'a', props, all(h, node));
        },
      }, 
    })
    .use(prism)
    .use(slug)
    .use(toc)
    .process(markdown);

  return result.toString();
}
