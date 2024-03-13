import path from 'path'
import {
  readFileSync,
  delScriptJsonBlock,
  getExamplesMpxFiles
} from '../utils/index.js'
import { UN_SOLVE_FILES } from '../common/constant.js'
import { addExampleToMd } from '../utils/extractor.js'

/**
 * 解析根目录 example 文件夹下的组件，生成md文档
 *
 * @param {string} exampleDir
 * @param {string} component
 * @param {string} theme
 * @return {*}
 */
const genExampleMd = function (exampleDir: string, component: string, theme?: string) {
  const exampleRoot = path.resolve(exampleDir, component)
  const mpxFiles = getExamplesMpxFiles(exampleRoot)
  const nameContentMap = {}
  const mdFile = path.resolve(exampleRoot, 'README.md')
  const mdContent = readFileSync(mdFile)
  mpxFiles.forEach(file => {
    const key = file.split('.')[0]
    if (UN_SOLVE_FILES.indexOf(key) > -1) {
      return
    }
    nameContentMap[key] = delScriptJsonBlock(readFileSync(path.resolve(exampleRoot, file)))
  })
  const content = addExampleToMd(mdContent, nameContentMap, theme)
  return content
}

export default genExampleMd
