import { defineMarkdocConfig } from '@astrojs/markdoc/config';

import { markdocHTMLTagSchemas } from 'markdoc-html-tag-schemas';

export default defineMarkdocConfig({
  extends: [markdocHTMLTagSchemas()],
});
