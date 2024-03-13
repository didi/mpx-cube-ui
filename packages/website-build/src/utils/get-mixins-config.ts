import path from 'path'
import { readFileSync } from './index.js'
import { parser, getExportFileConfig, mergeMixinsOptions } from '@mpxjs/vuese-parser'

const getHelpCreateConponentMixins = function(options) {
  const helpCreatePath = options.helpCreatePath
  const content = readFileSync(helpCreatePath)
  const fns = content.match(/export function(.|\n)*?\}/g) || []
  const fnMixins = {}
  fns.forEach((item: any) => {
    // (export function ).*( \()
    // 断言匹配出中间的.*,括号内的`export function `和` (`不要。
    // 匹配出方法名
    const name = item.match(/(?<=(export function )).*(?=( \())/)[0]
    // 匹配出 mixins
    const mixinsmatch = item.match(/(?<=addMixins\(options,\s?\[).*(?=\])/i)
    let mixins: any[] = []
    if (mixinsmatch) {
      mixins = mixinsmatch[0].replace(/\s/g, '').split(',')
    }
    fnMixins[name] = mixins
  })
  return fnMixins
}

const fnMixinsHandler = function (fnMixins, mixinRes) {
  const vueseResKeys = { props: '', methods: '', events: '', tsType: '' }
  Object.keys(fnMixins).forEach(key => {
    const mixins = fnMixins[key]
    const vueseRes = { props: [], methods: [], events: [], tsType: [] }
    if (mixins.length) {
      mixins.forEach(mixin => {
        const _vueseRes = mixinRes[mixin].vueseRes
        Object.keys(vueseResKeys).forEach(k => {
          _vueseRes[k] && vueseRes[k].push(..._vueseRes[k])
        })
      })
    }
    mergeMixinsOptions(vueseRes)
    fnMixins[key] = {
      mixins: fnMixins[key],
      vueseRes
    }
  })
  return fnMixins
}

const getMixinsConfig = function(options) {
  const mixinEntry = options.mixinEntryPath
  const mixinArr = getExportFileConfig(mixinEntry)
  const mixinRes = {}
  mixinArr.forEach((item: any) => {
    const content = readFileSync(item.path)
    const res = parser(content, {
      isMpx: true,
      isMixin: true,
      basedir: path.dirname(mixinEntry),
      filepath: item.path,
      typedocProject: options.typedocProject
    })
    item.vueseRes = res
    mixinRes[item.name] = item
  })
  const fnMixins = getHelpCreateConponentMixins(options)
  Object.keys(fnMixins).forEach(key => {
    fnMixins[key].unshift('themePropsMixin')
  })
  return fnMixinsHandler(fnMixins, mixinRes)
}

export {
  getMixinsConfig
}
