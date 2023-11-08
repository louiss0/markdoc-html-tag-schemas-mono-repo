import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import AttributeTable from '../../components/AttributeTable.vue';
import Default from './Default.vue';
export default {
    extends: DefaultTheme,
    Layout: Default,
    enhanceApp(ctx) {
        ctx.app.component("AttributeTable", AttributeTable)
    }
} satisfies Theme