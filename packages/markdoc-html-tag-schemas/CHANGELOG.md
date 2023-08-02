# For Astro Markdoc HTML Tags



## [Unreleased]


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
