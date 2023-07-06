# Markdoc HTML Tag Schemas Mono-Repo

This repo is an NX repo that is created for the package **Markdoc HTML Tag Schemas**.
A package that is designed to allow people to create schemas for HTML.
I have decided to put an app that is designed to be used to test this package.
I put a docs project inside of here as well so that I can document this project.

## Sections

[Docs](#docs)

[Mock App](#mock-app)

[Packages](#packages)

## Docs

The docs app is a vitepress project where the pages reside in a pages folder.
Everything about Markdoc HTML Schemas is put here.

To start the project run.

```shell
nx run docs:dev
```

To build the project run.

```shell
nx run docs:build
```

## Mock App

This is an app that is meant to run a simulated `@astrojs/markdoc` setup.
This is made so that I can test how each tag works in isolation. This app
is not made to be used for anything other than debugging and testing.

To start the project run.

```shell
nx run mock-app:dev
```

To build the project run.

```shell
nx run mock-app:build
```

## Packages

The main package of this repo is Markdoc HTML Schemas.
The other packages in this repo make it so that they could be integrated with it.

Here is a list of packages used for Markdoc HTML Schemas

| Package            | Usage                                                                       |
| ------------------ | --------------------------------------------------------------------------- |
| tsup               | This package is used for bundling all the files into one and creating types |
| publint            | For making sure that the package.json file is correctly created             |
| `@markdoc/markdoc` | The package that this one relies on in this repo It's used to create it.    |

To develop run.

```shell
nx run markdoc-html-tags:dev
```

To release run.

```shell
nx run markdoc-html-tags:release
```

To lint run.

```shell
nx run markdoc-html-tags:lint
```

I decided to configure everything so that this package is an ESM-only package.

Here's a list of the other packages.

### For Astro Markdoc HTML Schemas Extension

This package is a package that is designed to quickly integrate markdoc html schemas into any astro project.****
