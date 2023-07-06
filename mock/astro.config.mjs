import { defineConfig } from 'astro/config';
import markdoc from '@astrojs/markdoc';

export default defineConfig({
  outDir: '../../dist/packages/mock',
  integrations: [markdoc()],
});
