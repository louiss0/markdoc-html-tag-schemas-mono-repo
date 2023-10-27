import { defineMarkdocConfig } from '@astrojs/markdoc/config';

import { markdocHTMLTagSchemas } from 'markdoc-html-tag-schemas';

const { nodes, tags } = markdocHTMLTagSchemas();

export default defineMarkdocConfig({
  nodes: {
    ...nodes
  },
  tags: {
    ...tags,
  },
});
