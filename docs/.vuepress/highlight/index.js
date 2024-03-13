/**
 * 代码高亮处理
 */
const hljs = require('highlight.js')

// 加入 v-pre 跳过 vue-compile，跳过 markdown-it fence render 流程
const wrapCode = (code, lang) => `<pre v-pre class="language-${lang}"><code>${code}</code></pre>`

module.exports = (md) => {
  md.options.highlight = (code, lang) => {
    return wrapCode(hljs.highlight(code, { language: lang !== 'vue' ? lang : 'html' }).value, lang)
  }
}