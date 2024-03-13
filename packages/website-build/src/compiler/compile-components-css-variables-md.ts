import { Render } from '@mpxjs/vuese-markdown-render'
import { renderOptions } from '../common/options.js'
import { CACHE_DIR_NAME } from '../common/constant.js'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

/**
 *  生成组件CSS变量文档
 * @param {string} component
 * @returns {string}
 */
const genCompnentsCSSVariablesMd = function (component: string) {
  const themeVarInfo = require(`../../${CACHE_DIR_NAME}/theme-var-info.json`)
  const defaultThemeStyle = require(`../../${CACHE_DIR_NAME}/default-theme-style.json`)

  // 变量初始化
  let code = '## CSS Variable\n'
  const render = new (Render as any)()
  const cssVarOption = renderOptions.cssVariables

  //  统计全局CSS变量，用于判断是否为CSS全局变量
  const BASE_CSS_VARIABLES_MAP = (() => {
    const originData = defaultThemeStyle.base || {}
    const result: string[] = Reflect.ownKeys(originData).reduce((res, key) => {
      const itemData = originData[key]
      const itemKeyList = Reflect.ownKeys(itemData).reduce((itemRes: any, itemKey) => {
        return itemRes.concat(...Reflect.ownKeys(itemData[itemKey]))
      }, []).map(key => key.startsWith('$') ? key.slice(1) : key)
      return res.concat(...itemKeyList)
    }, [])
    return new Set(result)
  })()

  //  统计组件自身CSS变量，用于判断是否为CSS自身变量，且可用于生成md
  const SELF_CSS_VARIABLES_MAP = (() => {
    const originData = defaultThemeStyle?.components[component] || {}
    const result = Reflect.ownKeys(originData).reduce((res: any, key) => {
      return res.concat(...Reflect.ownKeys(originData[key]))
    }, []).map(key => key.startsWith('$') ? key.slice(1) : key)
    return new Set(result)
  })()

  const cssVarData: any = Array.from(SELF_CSS_VARIABLES_MAP).map(key => ({ ...themeVarInfo[`$${key}`] }))
  // 生成表格头
  code += render.renderTabelHeader(cssVarOption.map(item => item.zh))
  // 生成表格数据
  cssVarData.forEach((cssVarInfo) => {
    const row: string[] = []
    cssVarOption.forEach(({ type }) => {
      if (type === 'Name') {
        // 变量名
        row.push(`<span id="${cssVarInfo.name}" class="css-var-name">$${cssVarInfo.name}</span>`)
      } else if (type === 'Default') {
        let value = String(cssVarInfo.originValue || cssVarInfo.value || '-')
        if (/data:.+;base64/.test(value)) {
          value = value.slice(0, 30) + '...'
        }
        // 变量默认值
        const contentList = value.split(/\s/)
        // 正则数组顺序应由具体到抽象，目前为$var($color),$var(color),$color
        const regexpList = [/\$var\(\$(.+)\)/, /\$var\((.+)\)/, /\$(.+)/, /\$\(,/]
        const handledList = contentList.map(content => {
          // 引用变量则处理文本为跳转链接
          if (content.includes('$')) {
            for (let i = 0; i < regexpList.length; i++) {
              if (regexpList[i].test(content)) {
                // 回调函数：确认正则规则与文本后，判断CSS变量是全局、自身等情况后将其转为跳转链接
                const reg = regexpList[i]
                return content.replace(reg, (origin, matchText) => {
                  const varName = matchText.startsWith('$') ? matchText.slice(1) : matchText
                  if (BASE_CSS_VARIABLES_MAP.has(varName)) {
                    // 全局CSS变量
                    // return `<a href="javascript:;" data-target="/guide/design-tokens.html#${varName}" onclick="var __BASE_URL__=window.location.pathname.slice(0, document.location.pathname.indexOf('/components'));window.location.href=__BASE_URL__+this.dataset.target">${origin}</a>`
                    return `<RouterLink to="/guide/design-tokens.html#${varName}" v-slot="{href}"> <a :href="href">${origin}</a> </RouterLink>`
                  } else if (SELF_CSS_VARIABLES_MAP.has(varName)) {
                    // 自身CSS变量
                    return `<a class="css-var-default" href="#${varName}">${origin}</a>`
                  } else {
                    // 默认为其他同类组件CSS变量
                    return `<span>${origin}</span>`
                    // const ComponentAlias = varName.split('-')[0]
                    // return `<a href="javascript:;" data-target="/${ComponentAlias}.html#${varName}" onclick="var __BASE_URL__=window.location.pathname.slice(0, document.location.pathname.lastIndexOf('/'));window.location.href=__BASE_URL__+this.dataset.target">${origin}</a>`
                    // return `<RouterLink to="/component//${ComponentAlias}.html#${varName}" v-slot="{href}"><a :href="href">${origin}</a></RouterLink>`
                  }
                })
              }
            }
          }
          return content
        })
        row.push(`<div>${handledList.join(' ')}</div>`)
      } else if (type === 'Description') {
        // 变量描述
        row.push(cssVarInfo.desc || '-')
      } else {
        row.push('-')
      }
    })
    code += render.renderTabelRow(row)
  })
  return code
}

export default genCompnentsCSSVariablesMd
