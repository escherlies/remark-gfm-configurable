/// <reference types="remark-parse" />
/// <reference types="remark-stringify" />

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('unified').Processor<Root>} Processor
 * @typedef {import('micromark-extension-gfm-strikethrough').Options} MicromarkStrikethroughOptions
 * @typedef {import('mdast-util-gfm-table').Options} MdastTableOptions
 */

/**
 * @typedef PluginOptions
 *   Configuration for enabling/disabling GFM plugins.
 * @property {boolean} [autolinkLiteral=true]
 *   Enable GFM autolink literals (default: `true`).
 * @property {boolean} [footnote=true]
 *   Enable GFM footnotes (default: `true`).
 * @property {boolean} [strikethrough=true]
 *   Enable GFM strikethrough (default: `true`).
 * @property {boolean} [table=true]
 *   Enable GFM tables (default: `true`).
 * @property {boolean} [tasklist=true]
 *   Enable GFM task list items (default: `true`).
 */

/**
 * @typedef {MicromarkStrikethroughOptions & MdastTableOptions & { plugins?: PluginOptions}} Options
 *   Configuration.
 */

/** @type {Options} */
const emptyOptions = {}

import {
  gfmAutolinkLiteralFromMarkdown,
  gfmAutolinkLiteralToMarkdown
} from 'mdast-util-gfm-autolink-literal'
import {
  gfmFootnoteFromMarkdown,
  gfmFootnoteToMarkdown
} from 'mdast-util-gfm-footnote'
import {
  gfmStrikethroughFromMarkdown,
  gfmStrikethroughToMarkdown
} from 'mdast-util-gfm-strikethrough'
import {gfmTableFromMarkdown, gfmTableToMarkdown} from 'mdast-util-gfm-table'
import {
  gfmTaskListItemFromMarkdown,
  gfmTaskListItemToMarkdown
} from 'mdast-util-gfm-task-list-item'

import {gfmAutolinkLiteral} from 'micromark-extension-gfm-autolink-literal'
import {gfmFootnote} from 'micromark-extension-gfm-footnote'
import {gfmStrikethrough} from 'micromark-extension-gfm-strikethrough'
import {gfmTable} from 'micromark-extension-gfm-table'
import {gfmTaskListItem} from 'micromark-extension-gfm-task-list-item'

/**
 * Add support for GitHub Flavored Markdown (GFM) extensions.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration for enabling/disabling plugins (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkGfm(options) {
  /** @type {PluginOptions} */
  const defaultPluginOptions = {
    autolinkLiteral: true,
    footnote: true,
    strikethrough: true,
    table: true,
    tasklist: true
  }

  /** @type {PluginOptions} */
  const pluginOptions = {...defaultPluginOptions, ...options?.plugins}

  /** @type {Options} */
  const extOptions = {...emptyOptions, ...options}

  // @ts-expect-error: TS is wrong about `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor} */ (this)
  const data = self.data()

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = [])
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  if (pluginOptions.autolinkLiteral) {
    micromarkExtensions.push(gfmAutolinkLiteral())
    fromMarkdownExtensions.push(gfmAutolinkLiteralFromMarkdown())
    toMarkdownExtensions.push(gfmAutolinkLiteralToMarkdown())
  }

  if (pluginOptions.footnote) {
    micromarkExtensions.push(gfmFootnote())
    fromMarkdownExtensions.push(gfmFootnoteFromMarkdown())
    toMarkdownExtensions.push(gfmFootnoteToMarkdown())
  }

  if (pluginOptions.strikethrough) {
    micromarkExtensions.push(gfmStrikethrough(extOptions))
    fromMarkdownExtensions.push(gfmStrikethroughFromMarkdown())
    toMarkdownExtensions.push(gfmStrikethroughToMarkdown())
  }

  if (pluginOptions.table) {
    micromarkExtensions.push(gfmTable())
    fromMarkdownExtensions.push(gfmTableFromMarkdown())
    toMarkdownExtensions.push(gfmTableToMarkdown(extOptions))
  }

  if (pluginOptions.tasklist) {
    micromarkExtensions.push(gfmTaskListItem())
    fromMarkdownExtensions.push(gfmTaskListItemFromMarkdown())
    toMarkdownExtensions.push(gfmTaskListItemToMarkdown())
  }
}
