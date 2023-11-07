import { defineConfig } from 'vitepress';

export default defineConfig({
  srcDir: 'pages',
  cleanUrls: true,
  title: 'Markdoc HTML Tag Schemas',
  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: [
      {
        text: 'Guide',
        link: '/guide/index',
      },
      {
        text: 'Concepts',
        items: [
          { text: 'Schemas', link: '/schemas/index' },
          { text: 'Attributes', link: '/attributes/index' },
        ],
      },
    ],
    sidebar: {
      '/schemas/': [
        {
          text: 'Schemas',
          items: [
            {
              text: 'External Media',
              link: '/schemas/external-media',
            },
            { text: 'Text', link: '/schemas/text' },
            { text: 'Container', link: '/schemas/container' },
            { text: 'Leaf', link: '/schemas/leaf' },
            { text: 'Images', link: '/schemas/images' },
          ],
        },
      ],
      '/attributes/': [
        {
          text: 'Attributes',
          link: '/attributes/index',
          items: [
            {
              text: '',
            },
            {
              text: 'Custom',
              link: '/attributes/custom',
            },
          ],
        },
      ],
    },
    footer: {
      message: 'Released under the MIT License',
      copyright: 'Copyright © 2023 - present by Shelton Louis',
    },
  },
});
