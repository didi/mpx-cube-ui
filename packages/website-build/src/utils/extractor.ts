import prettier from 'prettier'
import groupBy from 'lodash/groupBy.js'
// const { trimLineBreak } = require('./utils')

const templateReg = /<!--\s*@template:[\s.]*(\S+)[\s.]*-->/
const scriptReg = /\/\/\s*@script\.?(props|data|computed|methods|watch|custom)?:\s*(\S+)\s*\n?/
const styleReg = /\/\/\s*@style:\s*(\S+)\s*\n?/
// const exampleReg = /<!--\s*@example\:[\s.]*(\S+)[\s.]*-->/

const CODE_STYLE = {
  template: 'vue',
  script: 'vue',
  style: 'vue',
  default: 'vue'
}

const templateExtractor = (() => {
  return extractor({
    type: 'template',
    extractorReg: templateReg
  })
})()

const scriptExtractor = (() => {
  return extractor({
    type: 'script',
    extractorReg: scriptReg
  })
})()

const styleExtractor = (() => {
  return extractor({
    type: 'style',
    extractorReg: styleReg
  })
})()

function extractor(options) {
  return (html = '') => {
    const res: any[] = []
    const originHtml = html
    let index = 0
    const stack: any = []
    while (html) {
      const match = html.match(options.extractorReg)
      if (match) {
        const commentStart = match.index || 0
        const commentLength = match[0].length
        const startIndex = index + commentStart
        const endIndex = startIndex + commentLength

        let key = match[1]
        let subType = ''
        if (match[2]) {
          key = match[2]
          subType = match[1]
        }

        if (stack[stack.length - 1] && stack[stack.length - 1].key === key) {
          const lastItem = stack.pop()
          res.push({
            key,
            type: options.type,
            subType,
            content: originHtml.slice(lastItem.endIndex, startIndex)
          })
        } else {
          stack.push({
            key,
            startIndex,
            endIndex
          })
        }

        advance(commentStart + commentLength)
      } else {
        break
      }
    }

    function advance(n = 0) {
      index += n
      html = html.substring(n)
    }

    return groupBy(res, (item) => item.key)
  }
}

function componentCompose(template = {}, script = {}, style = {}) {
  const res = {}
  Object.keys(template).forEach((key) => {
    const _template = prettier.format(genTemplate(template[key]), {
      parser: 'vue'
    })

    const _script = prettier.format(genScript(script[key]), {
      parser: 'babel',
      semi: false,
      singleQuote: true,
      trailingComma: 'none',
      endOfLine: 'cr'
    })

    const _style = genStyle(style[key])

    res[key] = {
      template: _template,
      script: _script ? `<script>\n${_script}</script>\n` : '',
      style: _style
    }
  })

  function genTemplate(templateArr = []) {
    if (!templateArr.length) {
      return ''
    }
    return `<template>${genContent(templateArr)}</template>`
  }

  function genScript(scriptArr = []) {
    if (!scriptArr.length) {
      return ''
    }
    const optionsArr = [
      'props',
      'properties',
      'data',
      'computed',
      'watch',
      'methods'
    ]
    let res = 'createComponent({\n'
    optionsArr.forEach((option) => {
      const script: any = scriptArr.find((script: any) => {
        return script && script.subType === option
      })
      if (script) {
        res += option + ':{\n' + script.content + '},'
      }
    })
    res += '})'

    return `${res}`
  }

  function genStyle(styleArr = []) {
    if (!styleArr.length) {
      return ''
    }
    return `<style lang="stylus">${genContent(styleArr)}</style>`
  }

  function genContent(arr = []) {
    return arr.reduce((res, item: any) => {
      if (item.content) {
        return res + '\n' + item.content
      }
      return res
    }, '')
  }
  return res
}

const groupReg = /<!--\s*@group:\s*(?<name>\S+?)\s*->\s*start\s*-->(?<code>.+?)<!--\s*@group:\s*\1\s*->\s*end\s*-->/gs
const mdExampleReg = /<!--\s*@example:\s*(?<name>\S+?)\s*(->\s*(?<key>template|script|style)\s*(?<nowrap>no-wrap)?)?\s*(?<showStyle>show-style)?\s*-->/g

function addExampleToMd(content, component, theme) {
  content = filterExample(content, theme)

  let match
  const contentCopy = content

  // 先处理有分组的情况
  while ((match = groupReg.exec(contentCopy)) !== null) {
    const row = match[0]
    let { code } = match.groups
    let codeMatch
    const codeCopy = code
    // 提取每一行示例组件的相关内容
    while ((codeMatch = mdExampleReg.exec(codeCopy)) !== null) {
      const row = codeMatch[0]
      const { name, key, nowrap, showStyle } = codeMatch.groups
      const compoentContent = exampleReplaceRegionToDoc(component, name, key, {
        nowrap,
        showStyle,
        hasGroup: true
      })
      code = code.replace(row, compoentContent)
    }
    content = content.replace(row, wrapCode(code))
  }

  const contentCopy2 = content
  // 处理未分组的情况
  while ((match = mdExampleReg.exec(contentCopy2)) !== null) {
    const row = match[0]
    const { name, key, nowrap, showStyle } = match.groups
    const compoentContent = exampleReplaceRegionToDoc(component, name, key, {
      nowrap,
      showStyle
    })
    content = content.replace(row, compoentContent)
  }
  return content
}

function filterExample(content, theme) {
  const startReg = '<!--\\s*@theme:[\\s.]*[driver|passenger]*[\\s.]*->*[\\s.]*start*[\\s.]*-->'
  const endReg = '<!--\\s*@theme:[\\s.]*[driver|passenger]*[\\s.]*->*[\\s.]*end*[\\s.]*-->'
  const themeCommentStartReg = `<!--\\s*@theme:[\\s.]*${theme}*[\\s.]*->*[\\s.]*start*[\\s.]*-->`
  const themeCommentStartEndReg = `<!--\\s*@theme:[\\s.]*${theme}*[\\s.]*->*[\\s.]*end*[\\s.]*-->`

  try {
    if (theme === 'default') return content

    const commentStartMatch = content.match(startReg)
    const commentEndMatch = content.match(endReg)
    const themeCommentStartMatch = content.match(themeCommentStartReg)
    const themeCommentEndMatch = content.match(themeCommentStartEndReg)

    if (!commentStartMatch && !commentEndMatch) {
      // 全已匹配完成
      return content
    } else if (themeCommentStartMatch && themeCommentEndMatch) {
      if (commentStartMatch.index === themeCommentStartMatch.index && commentEndMatch.index === themeCommentEndMatch.index) {
        // 当前匹配的是当前主题模块，需展示
        const themeCommentStartBlock = content.slice(themeCommentStartMatch.index, themeCommentStartMatch.index + themeCommentStartMatch[0].length)
        const themeCommentEndBlock = content.slice(themeCommentEndMatch.index, themeCommentEndMatch.index + themeCommentEndMatch[0].length)
        content = content.replace(themeCommentStartBlock, '')
        content = content.replace(themeCommentEndBlock, '')
        return filterExample(content, theme)
      } else {
        // 当前匹配的是非当前主题模块，需过滤
        let themeCommentBlock = ''
        const startIndex = commentStartMatch.index
        const endIndex = commentEndMatch.index + commentEndMatch[0].length
        themeCommentBlock = content.slice(startIndex, endIndex)
        content = content.replace(themeCommentBlock, '')
        return filterExample(content, theme)
      }
    } else {
      let themeCommentBlock = ''
      const startIndex = commentStartMatch.index
      const endIndex = commentEndMatch.index + commentEndMatch[0].length
      themeCommentBlock = content.slice(startIndex, endIndex)
      content = content.replace(themeCommentBlock, '')
      return filterExample(content, theme)
    }
  } catch (err) {
    return content
  }
}

function exampleReplaceRegionToDoc(
  component: Record<string, string>,
  name: string,
  componentRegion: string,
  options?: {
    nowrap?: boolean;
    showStyle?: boolean;
    hasGroup?: boolean
  }
) {
  let componentContent
  const { nowrap, showStyle, hasGroup } = options || {}
  const codeStyle = CODE_STYLE[componentRegion] || CODE_STYLE.default
  if (componentRegion) {
    const regionMatch = component[name].match(new RegExp(`<${componentRegion}[\\s\\S]*?>([\\s\\S]*)</${componentRegion}>`))
    componentContent = regionMatch ? regionMatch[Number(Boolean(nowrap))] : ''
    if (nowrap) {
      componentContent = componentContent.trim().split('\n').map(line => line.replace(/^\s{2}/, '')).join('\n')
    }
  } else {
    const styleBlockReg = /<style[^>]*>[\s\S]*?<\/style>/
    componentContent = component[name] || ''
    if (!showStyle) {
      componentContent = componentContent.replace(styleBlockReg, '')
    }
  }
  if (hasGroup) {
    return componentContent.trim()
  }
  return wrapCode(componentContent, codeStyle)
}

function wrapCode(code, codeStyle = CODE_STYLE.default) {
  if (!code) {
    return ''
  }
  return (
    '\n' +
    '<collapse-wrapper>' +
    '\n\n' +
    '```' + codeStyle +
    '\n' +
    code.trim() +
    '\n```\n\n' +
    '</collapse-wrapper>' +
    '\n'
  )
}

function composeExample(templateStr = '', scriptStr = '', styleStr = '') {
  return componentCompose(
    templateExtractor(templateStr),
    scriptExtractor(scriptStr),
    styleExtractor(styleStr)
  )
}

export {
  templateExtractor,
  scriptExtractor,
  styleExtractor,
  composeExample,
  addExampleToMd
}
