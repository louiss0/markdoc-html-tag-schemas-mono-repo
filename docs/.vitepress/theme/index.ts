import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import Default from './Default.vue';
export default {
    ...DefaultTheme,
    Layout: Default
} satisfies Theme