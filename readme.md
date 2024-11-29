# remark-gfm-configurable

[![npm version](https://badge.fury.io/js/remark-gfm-configurable.svg)](https://www.npmjs.com/package/remark-gfm-configurable)
[![Build Status](https://github.com/escherlies/remark-gfm-configurable/actions/workflows/ci.yml/badge.svg)](https://github.com/escherlies/remark-gfm-configurable/actions)

A fork of [remark-gfm](https://github.com/remarkjs/remark-gfm) with configurable plugin options to enable or disable specific GitHub Flavored Markdown (GFM) features.

Enable or disable, these underlying features: **autolink literals, footnotes, strikethrough, tables, and task list items**.

## Usage

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
interface Options extends RemarkGfmOptions {
  plugins?: {
    autolinkLiteral?: boolean; // Default: true
    footnote?: boolean;        // Default: true
    strikethrough?: boolean;   // Default: true
    table?: boolean;           // Default: true
    tasklist?: boolean;        // Default: true
  },
}
```

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

## Contributing

Contributions are welcome! If you have suggestions or find a bug, please open an issue or submit a pull request on [GitHub](https://github.com/escherlies/remark-gfm-configurable).

## License

[MIT](LICENSE)

## Acknowledgments

- [Titus Wormer](https://github.com/wooorm) for creating the original [`remark-gfm`](https://github.com/remarkjs/remark-gfm) package.
- The [remark](https://github.com/remarkjs/remark) and [unified](https://github.com/unifiedjs/unified) communities for their invaluable work.
