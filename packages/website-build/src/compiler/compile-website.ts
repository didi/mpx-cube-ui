import path from 'path'
import vuepress from 'vuepress'
import doDocsBuild from './compile-website-docs.js'
import { writeFile } from 'fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  DEFAULT_EXAMPLE_PATH,
  DEFAULT_MD_DIST_PATH,
  DEFAULT_SRC_PATH,
  DEFAULT_DOCS_ROOT_PATH,
  DEFAULT_MIXIN_ENTRY_PATH,
  DEFAULT_HELP_CREATE_PATH,
  CACHE_DIR_NAME
} from '../common/constant.js'
import { mkdirSync } from '../utils/index.js'
import { extract } from '@mpxjs/extract-theme-var'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootPath = path.resolve(__dirname, '../../../../')
const resolve = (dir = '') => path.resolve(rootPath, dir)

const doVuepress = (options: Options) => {
  const isProd = options.isProd
  const docsRootDir = resolve(options.docsRootDir)
  const vuepressConfig = {
    sourceDir: docsRootDir,
    theme: '@vuepress/theme-default'
  }
  if (isProd) {
    vuepress.build(vuepressConfig)
      .catch(err => {
        console.error(err)
      })
  } else {
    vuepress.dev(vuepressConfig)
  }
}

const compileWebsite = async (options: Options) => {
  const defaultOptions = {
    exampleDir: resolve(DEFAULT_EXAMPLE_PATH),
    mdDistDir: resolve(DEFAULT_MD_DIST_PATH),
    docsRootDir: resolve(DEFAULT_DOCS_ROOT_PATH),
    srcDir: resolve(DEFAULT_SRC_PATH),
    mixinEntryPath: resolve(DEFAULT_MIXIN_ENTRY_PATH),
    helpCreatePath: resolve(DEFAULT_HELP_CREATE_PATH)
  }
  options = Object.assign({}, defaultOptions, options)
  const {
    themeVarInfo,
    defaultThemeStyle
  } = await extract()
  const tmpDir = path.resolve(__dirname, `../../${CACHE_DIR_NAME}`)
  mkdirSync(tmpDir, CACHE_DIR_NAME)
  const writeThemeFile = (name, data) => {
    return new Promise(resolve => {
      const p = path.resolve(tmpDir, name)
      const dataStr = JSON.stringify(data, null, 2)
      writeFile(p, dataStr, 'utf8', () => resolve(true))
    })
  }
  await Promise.all([
    writeThemeFile('theme-var-info.json', themeVarInfo),
    writeThemeFile('default-theme-style.json', defaultThemeStyle)
  ])
  await doDocsBuild(options)
  doVuepress(options)
}

export default compileWebsite
