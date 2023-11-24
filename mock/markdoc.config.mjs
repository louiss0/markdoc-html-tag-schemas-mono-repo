import { component, defineMarkdocConfig, } from '@astrojs/markdoc/config';

import { markdocHTMLTagSchemas } from 'markdoc-html-tag-schemas';

const { nodes, tags } = markdocHTMLTagSchemas();

export default defineMarkdocConfig({
  nodes: {
    ...nodes,
    heading: {
      render: component("./src/components/Heading.astro"),
      attributes: nodes.heading.attributes,
      children: nodes.heading.children,
    }
  },
  tags: {
    ...tags,
  },
});
