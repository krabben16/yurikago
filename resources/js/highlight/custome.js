/**
 * サポート言語
 * https://github.com/highlightjs/highlight.js/blob/10.1.2/SUPPORTED_LANGUAGES.md
 */

/**
 * デフォルトだと全ての言語ライブラリを読み込むことでwebpackのバンドルサイズが肥大化するので
 * 必要な言語ライブラリのみ読み込む
 * https://github.com/highlightjs/highlight.js/tree/10.1.2#es6-modules
 */
import core from "highlight.js/lib/core"

import dockerfile from "highlight.js/lib/languages/dockerfile"
import ini from "highlight.js/lib/languages/ini"
import javascript from "highlight.js/lib/languages/javascript"
import json from "highlight.js/lib/languages/json"
import markdown from "highlight.js/lib/languages/markdown"
import php from "highlight.js/lib/languages/php"
import plaintext from "highlight.js/lib/languages/plaintext"
import python from "highlight.js/lib/languages/python"
import shell from "highlight.js/lib/languages/shell"
import xml from "highlight.js/lib/languages/xml"
import yaml from "highlight.js/lib/languages/yaml"

core.registerLanguage("dockerfile", dockerfile)
core.registerLanguage("ini", ini)
core.registerLanguage("javascript", javascript)
core.registerLanguage("json", json)
core.registerLanguage("markdown", markdown)
core.registerLanguage("php", php)
core.registerLanguage("plaintext", plaintext)
core.registerLanguage("python", python)
core.registerLanguage("shell", shell)
// NOTE: HTMLを含む
core.registerLanguage("xml", xml)
core.registerLanguage("yaml", yaml)

export const hljs = core
