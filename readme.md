# remark-gfm-configurable

[![npm version](https://badge.fury.io/js/remark-gfm-configurable.svg)](https://www.npmjs.com/package/remark-gfm-configurable)
[![Build Status](https://github.com/escherlies/remark-gfm-configurable/actions/workflows/ci.yml/badge.svg)](https://github.com/escherlies/remark-gfm-configurable/actions)

A fork of [remark-gfm](https://github.com/remarkjs/remark-gfm) with configurable plugin options to enable or disable specific GitHub Flavored Markdown (GFM) features.

By default, [remark-gfm](https://github.com/remarkjs/remark-gfm) enables all underlying features: **autolink literals, footnotes, strikethrough, tables, and task list items**.

This fork lets you configure which features are enabled by specifying them through a unified options object, offering more granular control over GitHub Flavored Markdown (GFM) features and their behavior.

## Table of Contents

- [remark-gfm-configurable](#remark-gfm-configurable)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Configuring Options](#configuring-options)
  - [Options](#options)
    - [Plugin Options](#plugin-options)
      - [Available Plugin Options](#available-plugin-options)
    - [Extension Options](#extension-options)
      - [Strikethrough Extension Options](#strikethrough-extension-options)
      - [Table Extension Options](#table-extension-options)
      - [Complete Options Example](#complete-options-example)
  - [Differences from remark-gfm](#differences-from-remark-gfm)
  - [Contributing](#contributing)
    - [Development](#development)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Introduction

`remark-gfm-configurable` is a [remark](https://github.com/remarkjs/remark) plugin that adds support for GitHub Flavored Markdown (GFM) with the ability to configure which features are enabled. The options are unified into a single object, making it easy to swap this module with the original `remark-gfm` without changing your code structure.

## Features

- **Unified Options Object**: Combine plugin and extension options into a single object for simplicity.
- **Configurable Plugins**: Enable or disable specific GFM features as needed.
- **Extension Options**: Pass options directly to individual GFM extensions for fine-grained control.
- **Compatibility**: By default, all GFM features are enabled, maintaining compatibility with `remark-gfm`.

## Installation

Install via npm:

```sh
npm install remark-gfm-configurable
```

Or with Yarn:

```sh
yarn add remark-gfm-configurable
```

## Usage

### Basic Usage

```js
import { remark } from 'remark';
import remarkGfm from 'remark-gfm-configurable';

const markdown = `
This is a ~~strikethrough~~ text with a task list:

- [x] Task 1
- [ ] Task 2
`;

remark()
  .use(remarkGfm)
  .process(markdown)
  .then((file) => {
    console.log(String(file));
  });
```

### Configuring Options

You can customize both plugin features and extension options by passing an `options` object to `remarkGfm`. The `options` object can include plugin enable/disable settings under the `plugins` property and extension-specific options at the top level.

```js
import { remark } from 'remark';
import remarkGfm from 'remark-gfm-configurable';

const options = {
  plugins: {
    table: false,        // Disable tables
    footnote: false,     // Disable footnotes
  },
  singleTilde: true,     // Extension option for strikethrough
  tableCellPadding: false, // Extension option for tables (ignored since tables are disabled)
};

remark()
  .use(remarkGfm, options)
  .process(markdown)
  .then((file) => {
    console.log(String(file));
  });
```

In this example:

- **Plugin Options**: We disable `table` and `footnote` features by setting them to `false` under the `plugins` property.
- **Extension Options**: We set `singleTilde: true` to allow single tilde strikethrough.

## Options

The `options` object passed to `remarkGfm` can contain both plugin options (to enable or disable specific GFM features) and extension options (for fine-grained control over individual extensions).

```ts
interface Options extends MicromarkStrikethroughOptions, MdastTableOptions {
  plugins?: PluginOptions;
}
```

### Plugin Options

Plugin options are provided under the `plugins` property within the `options` object. All features are enabled by default.

```ts
interface PluginOptions {
  autolinkLiteral?: boolean; // Default: true
  footnote?: boolean;        // Default: true
  strikethrough?: boolean;   // Default: true
  table?: boolean;           // Default: true
  tasklist?: boolean;        // Default: true
}
```

#### Available Plugin Options

- `autolinkLiteral`: Enable or disable [autolink literals](https://github.github.com/gfm/#autolinks).
- `footnote`: Enable or disable [footnotes](https://github.github.com/gfm/#footnotes).
- `strikethrough`: Enable or disable [strikethrough](https://github.github.com/gfm/#strikethrough-extension-).
- `table`: Enable or disable [tables](https://github.github.com/gfm/#tables-extension-).
- `tasklist`: Enable or disable [task list items](https://github.github.com/gfm/#task-list-items-extension-).

### Extension Options

Extension options are provided at the top level of the `options` object. These options are directly passed to the corresponding GFM extensions.

#### Strikethrough Extension Options

```ts
interface MicromarkStrikethroughOptions {
  singleTilde?: boolean; // Default: false
}
```

- `singleTilde`: When set to `true`, allows single tilde (`~like this~`) to be used for strikethrough, in addition to double tildes (`~~like this~~`).

#### Table Extension Options

```ts
interface MdastTableOptions {
  tableCellPadding?: boolean; // Default: true
  tablePipeAlign?: boolean;   // Default: false
}
```

- `tableCellPadding`: When set to `false`, disables padding in table cells when generating Markdown.
- `tablePipeAlign`: When set to `true`, alignment markers (`:`) are placed next to the pipes in tables.

**Note:** Even if you provide extension options for a feature, they will be ignored if the corresponding plugin is disabled.

#### Complete Options Example

```js
const options = {
  plugins: {
    autolinkLiteral: true,
    footnote: false,       // Disable footnotes
    strikethrough: true,
    table: true,
    tasklist: true,
  },
  // Extension options
  singleTilde: true,       // Strikethrough option
  tableCellPadding: false, // Table option
  tablePipeAlign: true,    // Table option
};
```

## Differences from remark-gfm

- **Unified Options Object**: Unlike `remark-gfm`, this package uses a unified `options` object that includes both plugin and extension options, simplifying configuration.
- **Configurable Features**: Allows you to enable or disable specific GFM features under the `plugins` property.
- **Extension Options**: Provides the ability to pass options directly to GFM extensions at the top level of the `options` object.
- **Module Swapping Compatibility**: Designed to allow seamless swapping with `remark-gfm` without significant code changes.

## Contributing

Contributions are welcome! If you have suggestions or find a bug, please open an issue or submit a pull request on [GitHub](https://github.com/escherlies/remark-gfm-configurable).

### Development

To set up the development environment:

1. Clone the repository:

   ```sh
   git clone https://github.com/escherlies/remark-gfm-configurable.git
   ```

2. Install dependencies:

   ```sh
   cd remark-gfm-configurable
   npm install
   ```

3. Run tests:

   ```sh
   npm test
   ```

## License

[MIT](LICENSE)

## Acknowledgments

- [Titus Wormer](https://github.com/wooorm) for creating the original [`remark-gfm`](https://github.com/remarkjs/remark-gfm) package.
- The [remark](https://github.com/remarkjs/remark) and [unified](https://github.com/unifiedjs/unified) communities for their invaluable work.
