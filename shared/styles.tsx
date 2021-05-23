import { css, Global } from '@emotion/react';
import { mainColor } from './themes';
import { mapValues } from '../lib/mapValues';

/* Media queries */
export const breakpoints = {
  mobile: '640px', 
  tablet: '768px', 
  laptopSmall: '1024px', 
  laptopMedium: '1280px', 
  laptopWide: '1536px', 
};

export const mediaQueries = mapValues(breakpoints, bp => `@media (min-width: ${bp})`);

/* Reset CSS */
export const resetStyles = (
  <Global
    styles={css`
      html, body, div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, abbr, address, cite, code, del, dfn, em, img, ins, kbd, q, samp, small, strong, sub, sup, var, b, i,dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td,article, aside, canvas, details, figcaption, figure, footer, header, hgroup, menu, nav, section, summary, time, mark, audio, video {
        margin:0;
        padding:0;
        border:0;
        outline:0;
        font-size:100%;
        vertical-align:baseline;
        background:transparent;
      }

      article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section { 
        display:block;
      }

      nav ul {
        list-style:none;
      }

      blockquote, q {
        quotes:none;
      }

      blockquote:before, blockquote:after,q:before, q:after {
        content:'';
        content:none;
      }

      a {
        margin:0;
        padding:0;
        font-size:100%;
        vertical-align:baseline;
        background:transparent;
      }

      table {
        border-collapse:collapse;
        border-spacing:0;
      }

      input, select {
        vertical-align:middle;
      }

      html,
      body,
      div#__next {
        min-height: 100vh;
        box-sizing: border-box;
      }
    `}
  />
);

/* Code snippets highlight.js theme */
export const codeStyles = (
  <Global
    styles={css`
      .hljs {
        color: #eae9e5;
        background: #2f2f2f;
      }

      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-literal,
      .hljs-section,
      .hljs-link {
        color: white;
      }

      .hljs-subst {
        /* default */
      }

      .hljs-string,
      .hljs-title,
      .hljs-name,
      .hljs-type,
      .hljs-attribute,
      .hljs-symbol,
      .hljs-bullet,
      .hljs-built_in,
      .hljs-addition,
      .hljs-variable,
      .hljs-template-tag,
      .hljs-template-variable {
        color: ${mainColor};
      }

      .hljs-deletion {
        color: #8e8e90;
      }

      .hljs-comment,
      .hljs-quote,
      .hljs-meta {
        color: #777;
      }

      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-literal,
      .hljs-title,
      .hljs-section,
      .hljs-doctag,
      .hljs-type,
      .hljs-name,
      .hljs-strong {
        font-weight: bold;
      }

      .hljs-emphasis {
        font-style: italic;
      }
    `}
  />
);

/* Visually hidden */
export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
`;
