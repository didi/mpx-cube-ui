import path from 'path'
import hljs from 'highlight.js'
import {
  readFileSync,
  delScriptJsonBlock,
  delEmptyContentLineBreaks
} from '../utils/index.js'
import { parser } from '@mpxjs/vuese-parser'
import { Render } from '@mpxjs/vuese-markdown-render'
import { renderOptions } from '../common/options.js'

/**
 * 解析 cube-ui src 文件夹下的组件，生成md文档
 *
 * @param {string} srcDir cube-ui src目录地址
 * @param {string} component
 * @param {*} fnMixins
 * @return {*}
 */
const genSrcCodeMd = function (srcDir: string, component: string, fnMixins) {
  const componentRoot = path.resolve(srcDir, component)
  const mpxFile = path.resolve(componentRoot, 'index.mpx')

  let content = readFileSync(mpxFile)
  content = delScriptJsonBlock(content)
  content = delEmptyContentLineBreaks(content)
  const res = parser(content, {
    isMpx: true,
    basedir: componentRoot,
    fnMixins
  })
  // 这里有坑，res的tsType是数组，但是里面的每个对象都是同一个地址
  const text: typeof res = JSON.parse(JSON.stringify(res))
  const optionalMark = '___'
  text.tsType?.forEach(item => {
    item.type = item.type.replace(/&nbsp;/g, ' ')
    item.type = item.type.replace(/<br>/g, '\n')
    item.type = item.type.replace(/\?/g, optionalMark)
    item.type = `<pre v-pre class="language-typescript inside-td"><code>${hljs.highlight(item.type, { language: 'typescript' }).value}</code></pre>`
    item.type = item.type.replace(/:\s*([\w\\|]+);?/g, (m, $1) => {
      const types = $1.split('\\|')
      return m.replace($1, types.map(type => `<span class="hljs-built_in">${type}</span>`).join('\\|'))
    })
    item.type = item.type.replace(/\n/g, '<br>')
    item.type = item.type.replace(new RegExp(optionalMark, 'g'), '?')
  })
  const render = new Render(text, Object.assign({
    name: component
  } as any, renderOptions))

  return render.renderMarkdown('zh')
}

export default genSrcCodeMd
