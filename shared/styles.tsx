import { css, Global } from '@emotion/react';
import { mapValues } from '../lib/mapValues';
import { mainColor, secondaryColor } from './themes';

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
    `}
  />
);

export const globalStyles = (
  <Global
    styles={css`
      html,
      body,
      div#__next {
        min-height: 100vh;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
      }

      main {
        flex: 1;
        padding: 1rem;
      }

      // https://openmoji.org/library/#group=flags%: 2Fcountry flag;
      .flag {
        width: 1.63rem;
        height: 1rem;
        display: inline-block;
        background-size: cover;
      }
      .my-flag {
        background-image: url('/assets/about/belarus.svg');
      }
      .current-flag {
        background-image: url('/assets/about/poland.svg');
      }
    `}
  />
);


export const codeStyles = (
  <Global
    styles={css`
      code[class*="language-"],
      pre[class*="language-"] {
        color: #f8f8f2;
        background: none;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        font-size: 0.9rem;

        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;

        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
      }

      /* Code blocks */
      pre[class*="language-"] {
        padding: 1em;
        padding-right: 0;
        margin: 0.5em 0;
        overflow: auto;
        border-radius: 0.3em;
        float: left;
        min-width: 100%;
        box-sizing: border-box;
      }

      :not(pre) > code[class*="language-"],
      pre[class*="language-"] {
        background: #414142;
      }

      /* Inline code */
      :not(pre) > code[class*="language-"] {
        padding: 0.1em;
        border-radius: 0.3em;
        white-space: normal;
      }

      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: #b0b0b0;
      }

      .token.punctuation {
        color: #fefefe;
      }

      .token.property,
      .token.tag,
      .token.constant,
      .token.symbol,
      .token.deleted {
        color: #ff8eb9;
      }

      .token.boolean,
      .token.number {
        color: #00e0e0;
      }

      .token.selector,
      .token.attr-name,
      .token.string,
      .token.char,
      .token.builtin,
      .token.inserted {
        color: #51e8a7;
      }

      .token.operator,
      .token.entity,
      .token.url,
      .language-css .token.string,
      .style .token.string,
      .token.variable {
        color: #00e0e0;
      }

      .token.atrule,
      .token.attr-value,
      .token.function {
        color: #00ffaa;
      }

      .token.keyword {
        color: #00e0e0;
      }

      .token.regex,
      .token.important {
        color: #ffd700;
      }

      .token.keyword,
      .token.important,
      .token.bold {
        font-weight: bold;
      }

      .token.italic {
        font-style: italic;
      }

      .token.entity {
        cursor: help;
      }

      .remark-highlight {
        overflow: auto;
      }

      .remark-highlight-code-line {
        display: block;
        background: #575757;
        box-shadow: inset 5px 0 0 #51e8a7;
        margin-left: -16px;
        padding: 0 16px;
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

export const focusOutline = css`
  &:focus, &:active {
    outline: 0;
    box-shadow: 0 0 0 3px ${secondaryColor};
    transition: all ease 0.3s;
  }
`;

export const svgIconHover = css`
  &, & svg {
    transition: all ease 0.3s;
  }

  &:hover {
    transition: all ease 0.3s;
    outline: 0;

    & svg {
      fill: ${mainColor};
      transition: all ease 0.3s;
    }
  }
`;
