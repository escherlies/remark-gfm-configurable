# remark-gfm-configurable

[![npm version](https://badge.fury.io/js/remark-gfm-configurable.svg)](https://www.npmjs.com/package/remark-gfm-configurable)
[![Build Status](https://github.com/your-username/remark-gfm-configurable/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/remark-gfm-configurable/actions)

A fork of [remark-gfm](https://github.com/remarkjs/remark-gfm) with configurable plugin options to enable or disable specific GitHub Flavored Markdown (GFM) features.

## Table of Contents

- [remark-gfm-configurable](#remark-gfm-configurable)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Basic Usage](#basic-usage)
    - [Plugin Options](#plugin-options)
    - [Extension Options](#extension-options)
  - [Options](#options)
    - [Plugin Options](#plugin-options-1)
      - [Available Options](#available-options)
    - [Extension Options](#extension-options-1)
      - [Strikethrough Options](#strikethrough-options)
      - [Table Options](#table-options)
  - [Differences from remark-gfm](#differences-from-remark-gfm)
  - [Contributing](#contributing)
    - [Development](#development)
  - [License](#license)
  - [Acknowledgments](#acknowledgments)

## Introduction

`remark-gfm-configurable` is a [remark](https://github.com/remarkjs/remark) plugin that adds support for GitHub Flavored Markdown (GFM) with the ability to configure which features are enabled. This allows you to selectively enable or disable specific GFM extensions such as autolink literals, footnotes, strikethrough, tables, and task lists.

## Features

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

### Plugin Options

You can enable or disable specific GFM features by passing a plugin options object as the first argument:

```js
import { remark } from 'remark';
import remarkGfm from 'remark-gfm-configurable';

remark()
  .use(remarkGfm, { table: false, footnote: false }) // Disable tables and footnotes
  .process(markdown)
  .then((file) => {
    console.log(String(file));
  });
```

### Extension Options

Pass extension-specific options as the second argument:

```js
import { remark } from 'remark';
import remarkGfm from 'remark-gfm-configurable';

remark()
  .use(
    remarkGfm,
    { strikethrough: true }, // Plugin options
    {
      strikethrough: { singleTilde: true }, // Extension options
      table: { cellPadding: false },
    }
  )
  .process(markdown)
  .then((file) => {
    console.log(String(file));
  });
```

## Options

### Plugin Options

The first argument to `remarkGfm` is an optional `options` object to enable or disable specific GFM features. All features are enabled by default.

```ts
interface PluginOptions {
  autolinkLiteral?: boolean; // Default: true
  footnote?: boolean;        // Default: true
  strikethrough?: boolean;   // Default: true
  table?: boolean;           // Default: true
  tasklist?: boolean;        // Default: true
}
```

#### Available Options

- `autolinkLiteral`: Enable or disable [autolink literals](https://github.github.com/gfm/#autolinks).
- `footnote`: Enable or disable [footnotes](https://github.github.com/gfm/#footnotes).
- `strikethrough`: Enable or disable [strikethrough](https://github.github.com/gfm/#strikethrough-extension-).
- `table`: Enable or disable [tables](https://github.github.com/gfm/#tables-extension-).
- `tasklist`: Enable or disable [task list items](https://github.github.com/gfm/#task-list-items-extension-).

### Extension Options

The second argument is an optional `extensionOptions` object to pass options to individual GFM extensions.

```ts
interface ExtensionOptions {
  strikethrough?: {
    singleTilde?: boolean; // Default: false
  };
  table?: {
    cellPadding?: boolean; // Default: true
    pipeAlign?: boolean;   // Default: false
  };
}
```

#### Strikethrough Options

- `singleTilde`: When set to `true`, allows single tilde (`~like this~`) to be used for strikethrough, in addition to double tildes (`~~like this~~`).

#### Table Options

- `cellPadding`: When set to `false`, disables padding in table cells when generating Markdown.
- `pipeAlign`: When set to `true`, alignment markers (`:`) are placed next to the pipes in tables.

## Differences from remark-gfm

- **Configurable Features**: Unlike `remark-gfm`, this package allows you to enable or disable specific GFM features.
- **Extension Options**: Provides the ability to pass options directly to GFM extensions for customization.
- **Same Default Behavior**: By default, all features are enabled to maintain the same behavior as `remark-gfm`.

## Contributing

Contributions are welcome! If you have suggestions or find a bug, please open an issue or submit a pull request on [GitHub](https://github.com/your-username/remark-gfm-configurable).

### Development

To set up the development environment:

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/remark-gfm-configurable.git
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
