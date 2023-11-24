import { component, defineMarkdocConfig } from '@astrojs/markdoc/config';

import { markdocHTMLTagSchemas } from 'markdoc-html-tag-schemas';

const { nodes, tags } = markdocHTMLTagSchemas();

export default defineMarkdocConfig({
  nodes: {
    ...nodes,
    heading: {
      ...nodes.heading,
      render: component("./src/components/Heading.astro")
    }
  },
  tags: {
    ...tags,
  },
});
