const fs = require('fs')
const path = require('path')
const readline = require('readline')
const commonVarDirPath = path.resolve(__dirname, '../../mpx-cube-ui/src/common/stylus/theme/var')
const componentsDirPath = path.resolve(__dirname, '../../mpx-cube-ui/src/common/stylus/theme/components')
const { traverseFileFolder } = require('./utils')
/**
 * 保存默认主题「样式变量key - origin value」映射
 */
const defaultThemeStyle = {
  base: {},
  components: {}
}
/**
 * 保存主题变量信息
{
  '$btn-color': {
    name: 'btn-color',
    originValue: '$color-white', // 继承变量
    value: '#fff', // 最后的计算值
    desc: '按钮字体第一主色', // 需要配合注释
    type: 'color' // 标志编辑器类型
  }
}
 */
const themeVarInfo = {}
// 保存基本变量
const baseVarCache = {}

module.exports = async function() {
  // 提取基本变量
  const extractBaseVar = traverseFileFolder(commonVarDirPath, async (filePath, filename) => {
    await processFileLineToConfig({
      filePath,
      filename,
      splitStr: ':=',
      classification: 'base'
    })
  })

  // 提取各组件中变量
  const extractComponentVar = traverseFileFolder(componentsDirPath, async (filePath, filename) => {
    await processFileLineToConfig({
      filePath,
      filename,
      splitStr: ':=',
      classification: 'components'
    })
  })

  await Promise.all([extractBaseVar, extractComponentVar])
  return {
    themeVarInfo,
    defaultThemeStyle
  }
}
/**
 * 解析文件的每行内容
 * @param {*} filePath
 */
async function processFileLineToConfig({
  filePath,
  filename,
  splitStr = ':=',
  classification = 'base'
}) {
  const componentConfigData = {
    other: {}
  } // 保存单个组件配置
  const key = filename.split('.styl')[0].trim()
  const fileStream = fs.createReadStream(filePath)
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  let componentType = 'other'

  for await (const line of rl) {
    if (line.indexOf('@type') !== -1) {
      componentType = line.split('@type')[1].trim()
      componentConfigData[componentType] = {}
    }

    if (line.indexOf('$') !== -1) {
      let varOriginKey = ''
      let varOriginValue = ''
      const lineArr = line.split(splitStr)

      if (!lineArr[0] || !lineArr[1]) continue

      varOriginKey = lineArr[0].trim()
      varOriginValue = lineArr[1].indexOf('//') !== -1 ? lineArr[1].split('//')[0].trim() : lineArr[1].trim()
      const varDesc = lineArr[1].indexOf('//') !== -1 ? lineArr[1].split('//')[1].trim() : ''
      componentConfigData[componentType][varOriginKey] = varOriginValue
      const { type, parseValue } = getStyleVarInfo(varOriginValue)

      themeVarInfo[varOriginKey] = {
        name: lineArr[0].split('$')[1].trim(),
        originValue: varOriginValue,
        value: parseValue,
        desc: varDesc,
        type
      }
      // 收集基本变量
      if (classification === 'base') {
        baseVarCache[varOriginKey] = varOriginValue
      }
    }
    defaultThemeStyle[classification][key] = componentConfigData
  }
}

function getStyleVarInfo(value) {
  let type = 'other'
  let parseValue = value
  const colorReg = /^#|^rgba|^rgb|^linear-gradient/

  // 避免value是表达式，含有多个$的情况
  if (value.lastIndexOf('$') === 0) {
    value = value.indexOf('var') !== -1 ? '$' + value.slice(5, -1) : value // $var(color-white)转换为$color-white
    parseValue = baseVarCache[value]
      ? baseVarCache[value]
      : themeVarInfo[value]
        ? themeVarInfo[value].value
        : value
  }
  type = colorReg.test(parseValue) ? 'color' : 'other'

  return {
    type,
    parseValue
  }
}
