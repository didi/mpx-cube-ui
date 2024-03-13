import fs from 'fs'
import path from 'path'
import { Render } from '@mpxjs/vuese-markdown-render'
import { renderOptions } from '../common/options.js'
import { CACHE_DIR_NAME } from '../common/constant.js'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { readFileSync } from '../utils/index.js'

const require = createRequire(import.meta.url)
const __dirname = dirname(fileURLToPath(import.meta.url))
const rootPath = path.resolve(__dirname, '../../../../')
const resolve = (dir = '') => path.resolve(rootPath, dir)

const outPath = resolve('docs/guide')
const fileName = 'design-tokens.md'
const filepath = path.join(outPath, fileName)

const startTag = '<!-- @css-variable -> start -->'
const endTag = '<!-- @css-variable -> end -->'

/**
 * 生成全局CSS变量文档
 * @returns {void}
 */
const genBaseCSSVariablesMd = function () {
  const themeVarInfo = require(`../../${CACHE_DIR_NAME}/theme-var-info.json`)
  const defaultThemeStyle = require(`../../${CACHE_DIR_NAME}/default-theme-style.json`)

  // 变量初始化
  let code = readFileSync(filepath)
  code = code.replace(/\s*<!--\s*@css-variable\s*->\s*start\s*-->.+<!--\s*@css-variable\s*->\s*end\s*-->/s, '')
  code += `\n\n${startTag}\n`
  const render = new (Render as any)()
  const cssVarOption = renderOptions.cssVariables

  // 加工BaseCSS变量数据
  const originData = defaultThemeStyle.base || {}
  const cssVarDataList = Reflect.ownKeys(originData).sort().map(key => {
    const itemData = originData[key]
    const itemCssVarData = Reflect.ownKeys(itemData).reduce((res: any, itemKey) => {
      return res.concat(...Reflect.ownKeys(itemData[itemKey]))
    }, []).map(cssVarKey => ({ ...themeVarInfo[cssVarKey] }))

    return ({ title: key, cssVarData: itemCssVarData })
  })

  // JSON转md文本
  cssVarDataList.forEach((cssVarDataItem: any) => {
    code += `\n<card>\n\n ### ${cssVarDataItem.title}\n`
    // 生成表格头
    code += render.renderTabelHeader(cssVarOption.map(item => item.zh))
    // 生成表格数据
    const cssVarData = cssVarDataItem.cssVarData
    cssVarData.forEach((cssVarInfo) => {
      const row: string[] = []
      cssVarOption.forEach(({ type }) => {
        if (type === 'Name') {
          // 变量名
          row.push(`<span id="${cssVarInfo.name}" class="css-var-name">$${cssVarInfo.name}</span>`)
        } else if (type === 'Default') {
          // 默认值
          let content = String(cssVarInfo.originValue || cssVarInfo.value || '-')
          content = content.replace(/\$(\S+)/g, (origin, varName) => {
            return `<a class="css-var-default" href="#${varName}">${origin}</a>`
          })
          row.push(`<div>${content}</div>`)
        } else if (type === 'Description') {
          // 含义
          row.push(cssVarInfo.desc || '-')
        } else {
          row.push('-')
        }
      })
      code += render.renderTabelRow(row)
    })
    code += '\n\n</card>\n\n'
  })
  // 执行覆盖写入
  code += `${endTag}\n`
  fs.writeFileSync(filepath, code)
}

export default genBaseCSSVariablesMd
