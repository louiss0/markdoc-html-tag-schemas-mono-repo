import { defineMarkdocConfig, nodes } from '@astrojs/markdoc/config';

import {
  ul,
  li,
  abbr,
  a,
  figure,
  figcaption,
  details,
  summary,
  dl,
  dd,
  dt,
  del,
  iframe,
  video,
  audio,
  img,
} from '@markdoc-html-schemas';

export default defineMarkdocConfig({
  nodes: {
    document: {
      ...nodes.document,
      render: null,
    },
  },
  tags: {
    ul,
    li,
    abbr,
    iframe,
    video,
    audio,
    del,
    img,
    a,
    figure,
    figcaption,
    details,
    summary,
    dl,
    dd,
    dt,
  },
});
