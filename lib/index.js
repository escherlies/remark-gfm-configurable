/// <reference types="remark-parse" />
/// <reference types="remark-stringify" />

/**
 * @typedef {import('mdast').Root} Root
 * @typedef {import('mdast-util-gfm').Options} MdastOptions
 * @typedef {import('micromark-extension-gfm').Options} MicromarkOptions
 * @typedef {import('unified').Processor<Root>} Processor
 */

/**
 * @typedef {MicromarkOptions & MdastOptions} Options
 *   Configuration.
 */

// import {gfmFromMarkdown, gfmToMarkdown} from 'mdast-util-gfm'
// import {gfm} from 'micromark-extension-gfm'

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

/** @type {Options} */
const emptyOptions = {}

/**
 * Add support GFM (autolink literals, footnotes, strikethrough, tables,
 * tasklists).
 *
 * @param {Options | null | undefined} [extensionOptions]
 *   Configuration (optional).
 * @returns {undefined}
 *   Nothing.
 */
export default function remarkGfm(extensionOptions) {
  // @ts-expect-error: TS is wrong about `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {Processor} */ (this)
  const settings = extensionOptions || emptyOptions
  const data = self.data()

  const micromarkExtensions =
    data.micromarkExtensions || (data.micromarkExtensions = [])
  const fromMarkdownExtensions =
    data.fromMarkdownExtensions || (data.fromMarkdownExtensions = [])
  const toMarkdownExtensions =
    data.toMarkdownExtensions || (data.toMarkdownExtensions = [])

  // micromarkExtensions.push(gfm(settings))
  // fromMarkdownExtensions.push(gfmFromMarkdown())
  // toMarkdownExtensions.push(gfmToMarkdown(settings))

  // Add support for autolink literals
  micromarkExtensions.push(gfmAutolinkLiteral())
  fromMarkdownExtensions.push(gfmAutolinkLiteralFromMarkdown())
  toMarkdownExtensions.push(gfmAutolinkLiteralToMarkdown())

  // Add support for footnotes
  micromarkExtensions.push(gfmFootnote())
  fromMarkdownExtensions.push(gfmFootnoteFromMarkdown())
  toMarkdownExtensions.push(gfmFootnoteToMarkdown())

  // Add support for strikethrough
  micromarkExtensions.push(gfmStrikethrough(extensionOptions))
  fromMarkdownExtensions.push(gfmStrikethroughFromMarkdown())
  toMarkdownExtensions.push(gfmStrikethroughToMarkdown())

  // Add support for tables
  micromarkExtensions.push(gfmTable())
  fromMarkdownExtensions.push(gfmTableFromMarkdown())
  toMarkdownExtensions.push(gfmTableToMarkdown(extensionOptions))

  // Add support for task list items
  micromarkExtensions.push(gfmTaskListItem())
  fromMarkdownExtensions.push(gfmTaskListItemFromMarkdown())
  toMarkdownExtensions.push(gfmTaskListItemToMarkdown())
}
