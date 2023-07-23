<template>
    <Layout>
        <template #home-features-before>
            <div class="home-features-before">
                <div class="container">
                    <div class="content">
                        <strong class="title">Motivation</strong>
                        <p>
                            Markdoc does not support writing HTML in markdown at all.
                            That means HTML can only be written by using tags.
                            Instead of having to write them for every project
                            I <a href="https://github.com/louiss0">Shelton Louis</a> created this library so that no one has to anymore.
                            You get all the HTML tags you will ever need for writing articles and all the attributes you need to create more of them.
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </Layout>
</template>

<script lang="ts" setup>

import DefaultTheme from 'vitepress/theme';

const { Layout, } = DefaultTheme

</script>

<style>
:root {
    --primary-text-color: hsl(221, 39%, 11%);

    --accent-text-color: hsl(50, 100%, 50%);

    --accent-text-color-light: hsl(50, 100%, 70%);

    --accent-text-color-lighter: hsl(50, 100%, 60%);

    --accent-text-color-dark: hsl(50, 100%, 40%);

    --accent-text-color-darker: hsl(50, 100%, 30%);

    --primary-bg-color: hsl(0, 0%, 100%);

    --vp-c-brand: var(--accent-text-color);
    --vp-c-brand-light: var(--accent-text-color-light);
    --vp-c-brand-lighter: var(--accent-text-color-lighter);
    --vp-c-brand-dark: var(--accent-text-color-dark);
    --vp-c-brand-darker: var(--accent-text-color-darker);

}

.home-features-before {

    & .container {
        margin: 0 auto;
        width: 60%;
        padding-inline: 1.5rem;
        padding-block: 1.5rem;
        margin-bottom: 4rem;
    }

    & .title {
        font-size: 2rem;
        align-self: center;

    }

    & p {

        font-size: 1.25rem;
        line-height: 1.75rem;
    }

    & .content {
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }


}
</style>