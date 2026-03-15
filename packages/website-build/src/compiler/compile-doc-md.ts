import fs from 'fs'
import path from 'path'
import componentGroupConfig from '../common/config.js'
import { getMixinsConfig } from '../utils/get-mixins-config.js'
import { camelize, mkdirSync } from '../utils/index.js'
import genSrcCodeMd from './compile-src-code-md.js'
import genExampleMd from './compile-example-md.js'
import genComponentsCSSVariablesMd from './compile-components-css-variables-md.js'
import genBaseCSSVariablesMd from './compile-base-css-variables-md.js'

const reg = /<card>([\s\S]+?)<\/card>/g
const tableReg = /(\|---)+\|\n\s*\n/g
const addCardWrap = function (content, separator) {
  if (!content) {
    return content
  }
  if (!separator) {
    return `<card> \n \n ${content} \n \n </card>`
  }
  const subcontents = content.split(separator)
  let result = ''
  for (const sub of subcontents) {
    if (sub) {
      result += `<card> \n \n ${separator.padEnd(3, separator)}${sub}  \n</card> \n \n`
    }
  }
  return result
}

const genDocMd = (
  examples: string[],
  dirConfig: {
    srcDir: string,
    mdDistDir: string,
    exampleDir: string
  },
  options: Options
) => {
  const fnMixins = getMixinsConfig(options)
  const { srcDir, mdDistDir, exampleDir } = dirConfig
  examples.forEach((example) => {
    const componentGroupName = componentGroupConfig[camelize(example)] || 'base'
    mkdirSync(path.resolve(mdDistDir, componentGroupName), componentGroupName)
    const exampleDocPath = path.resolve(mdDistDir, componentGroupName, `${example}.md`)
    const srcCodeMd = genSrcCodeMd(srcDir, example, fnMixins)
    const cssVariablesMdContent = genComponentsCSSVariablesMd(example)
    let srcCodeMdContent = ''
    if (srcCodeMd) {
      srcCodeMdContent = addCardWrap(srcCodeMd.content + cssVariablesMdContent, '##')
    }
    const exampleMd = genExampleMd(exampleDir, example, options.theme)
    let res = exampleMd + '\n' + srcCodeMdContent
    for (const m of res.matchAll(reg)) {
      const [card] = m
      if (card.match(tableReg)) {
        res = res.replace(card, '')
        continue
      }
    }
    fs.writeFileSync(exampleDocPath, res)
  })
  genBaseCSSVariablesMd()
}

export default genDocMd
