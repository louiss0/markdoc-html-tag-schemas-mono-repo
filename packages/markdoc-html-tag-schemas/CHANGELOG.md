<!-- markdownlint-disable-file MD024 -->  
<!-- 

Types of changes

- Added for new features.
- Changed for changes in existing functionality.
- Deprecated for soon-to-be removed features.
- Removed for now removed features.
- Fixed for any bug fixes.
- Security in case of vulnerabilities.

-->

# Markdoc HTML Tags Schemas

This library does follow semver.

## [Unreleased]

### Changed

- `getHeadingSchema()` and `getDocSchema` are now `createHeadingSchema()` and `createDocSchema`.
- `createHeadingSchema()` and `createDocSchema` use nodes from markdoc instead of written code.

## [2.1.4]

### Fixed

Removed headings now render the level attribute.

## [2.1.3] - 2023-11-08

## Changed

- cite is now a non-primary schema with a children attribute
- wbr is now a non-primary schema with a self-closing attribute

## Fixed

- Wrote the descriptions for each self-closing tag properly

## [2.1.2] - 2023-11-08

### Fixed

- Added track as a viable child of video and audio
- Added blockquote as a viable child to details and blockquote.

## [2.1.1] - 2023-08-08

## Fixed

- audio, video and tags only allow source tags as children.
- picture tags only allow source and img as children.
- The p tag will allow other ones but will transform them into inline text
- The SrcSetAttribute requires the use of a "/" when using absolute paths.
- blockquote and details validation was refactored to find specific tags then specify which tags are allowed.
- All schemas that need children are not allowed to have no children.

## [2.1.0] - 2023-08-07

## Added

- Added validation to make sure that dd and dt tags are siblings of each other.

## Fixed

- The frontmatter attribute is written properly.
- The heading node is also written properly.
- Changed dt and dl to block schemas.

## [2.0.0] - 2023-08-06

### Added

- ul, ol, p col, colgroup,dl and a schemas have proper validations for children.

- ul and ol tags now only check for themselves as children along with li and their opposing versions.

### Changed

- details schema now allows
  - paragraphs code fences and list as nodes.
  - It also checks for p and summary tags.

- blockquote tag now only supports.
  - fence,list,image and paragraph nodes
  - p,ul,ol, and img tags.

- a schema only supports
  - text,strong,em,image,paragraph as nodes.
  - span img,mark,and small as tags.

- colgroup tag only supports col as children
- col is now a self-closing primary schema
- p tag only supports text and link as children

### Fixed

- The shape of schemas with children in them are typed properly.

### Removed
  
- address schema

## [1.1.1] - 2023-08-04

### Fixed

- The the transform function is put back into the `getGeneratePrimarySchema()` and `getGenerateNonPrimarySchema()`.
- The data attribute is now known when using a data schema.

## [1.1.0] - 2023-08-02

### Fixed

- Schemas from created by `getGenerateSelfClosingTag()`'s call are have the options that are
passed shown in it's result

### Added

- Types that make sure that attributes are typed properly.

### Changed

- Schema helper functions are functions that must be called before passing in options
  - `generateSelfClosingTagSchema()` is now `getGenerateSelfClosingTagSchema()`
  - `generatePrimarySchema()` is now `getGeneratePrimarySchema()`
  - `generateNonPrimarySchema()` is now `getGenerateNonPrimarySchema()`

## [1.0.2] - 2023-07-24

### Fixed

- Added the a and ul tags to the schemas in the extension.
- Removed default from all attributes and from the types for attributes.
- The class attribute for data schemas is unaffected it was an object.  

## [1.0.1] - 2023-07-24

### Fixed

- The repo url leads to the mono-repo in the readme.
- I had to remove map and area from the list of supported tags.

## [1.0.0] - 2023-07-23

This is the first version of this package.

### Added

- Markdoc attributes I call them attribute schemas.
- Schemas that are used for HTML tags suitable for writing articles.
- A function that can be used to extend Astro's markdoc config.  

## [0.0.0]

Not released here.
