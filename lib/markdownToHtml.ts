import prism from 'remark-prism'
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import raw from 'rehype-raw'
import slug from 'rehype-slug'
import format from 'rehype-format'
import toc from '@jsdevtools/rehype-toc'
import minify from 'rehype-preset-minify'
import html from 'rehype-stringify'
import visit from 'unist-util-visit'

export default async function markdownToHtml(data: string): Promise<string> {
  const result = await unified()
    .use(markdown)
    .use(prism)
    .use(remark2rehype, { allowDangerousHtml: true })
    .use(raw)
    .use(slug)
    .use(format)
    .use(toc)
    .use(minify)
    .use(prism)
    .use(() => (ast) => {
      visit(ast, 'element', (tree: any) => {
        if (tree.tagName === 'a') {
          const { href } = tree.properties
          if (href && !href.startsWith('#')) {
            tree.properties.target = '_blank'
            tree.properties.rel = 'noopener noreferrer'
          }
        }
      })
    })
    .use(html)
    .process(data)

  return result.toString()
}
