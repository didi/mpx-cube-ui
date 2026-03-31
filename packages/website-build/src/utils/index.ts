import fs from 'fs'

const camelizeRE = /-(\w)/g
const camelize = str => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
}

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

// 去除开头结尾的回车
const trimLineBreak = str => {
  const match = str.match(/[\s]*[/\n]*[\s]*(.*\n*.*)[\s]*[/\n]*[\s]*/)
  if (match) {
    return match[1]
  }
  return str
}

/**
 * 读取文件
 *
 * @param {*} path
 * @return {*}
 */
const readFileSync = path => {
  if (fs.existsSync(path)) {
    return fs.readFileSync(path, 'utf-8')
  }
  return ''
}

/**
 * 是否为mpx文件
 *
 * @param {*} file
 */
const isMpxFile = (file) => file && file.match(/\.mpx/)

/**
 * 从示例文件夹获取获取mpx示例文件
 *
 * @param {string} exampleDir
 */
const getExamplesMpxFiles = (exampleDir: string) => fs
  .readdirSync(exampleDir)
  .filter((dir) => isMpxFile(dir))

/**
 * 创建文件夹
 *
 * @param {string} pathName
 * @param {string} dirName
 * @return {*}
 */
const mkdirSync = (pathName: string, dirName: string) => {
  if (fs.existsSync(pathName)) return true
  try {
    fs.mkdirSync(pathName, { recursive: true })
    return true
  } catch (err) {
    console.log(`创建文件夹${dirName}失败`)
    throw new Error(err)
  }
}

/**
 * 删除 script json
 *
 * @param {string} content
 * @return {*}
 */
const delScriptJsonBlock = function (content: string) {
  const jsonBlockReg = /<script\s[\w\s]*(name=["']json["']|type=["']application\/json["'])(\s|[\w\s])*>[\s\S]*<\/script>/
  return content.replace(jsonBlockReg, '')
}

/**
 * When parsing the content in script, if the javascript code is imported from outside,
 * the content inside the script tag will be parsed as \n when there is a newline.
 * @param {*} content
 */
const delEmptyContentLineBreaks = function (content) {
  const scriptContentReg = /(?<=<script\b[^>]*>)[\s\S]*(?=<\/script>)/ig
  const scriptContent = content.match(scriptContentReg)[0]
  const isEmpty = scriptContent && scriptContent.replace('\n', '').length === 0
  if (isEmpty) {
    return content.replace(scriptContentReg, '')
  }
  return content
}

/**
 * 转换CSS变量格式：$var($) -> var(--cube-), $var() -> var(--cube-), $ -> --cube-
 * @param origin 原始变量字符串
 * @returns 转换后的CSS变量字符串
 */
const convertCssVarFormat = (origin: string): string => {
  return origin
    .replace(/\$var\(\$(.+)\)/g, 'var(--cube-$1)')
    .replace(/\$var\((.+)\)/g, 'var(--cube-$1)')
    .replace(/\$(.+)/g, '--cube-$1')
}

export {
  camelize,
  isMpxFile,
  mkdirSync,
  capitalize,
  readFileSync,
  trimLineBreak,
  convertCssVarFormat,
  delScriptJsonBlock,
  getExamplesMpxFiles,
  delEmptyContentLineBreaks
}
