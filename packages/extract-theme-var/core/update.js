const shell = require('shelljs')
const path = require('path')
const { themeSrcGitBranch } = require('../config/upload')

module.exports = function() {
  // 拉取mpx-cube-ui组件库代码
  const tmpDir = path.join(__dirname, '../tmp')
  shell.exec(`git clone -b ${themeSrcGitBranch} git@github.com:mpx-ecology/mpx-cube-ui.git ${tmpDir}`)
  // 将stylus保存在theme-stylus中
  const mpxCubeUiStylusSrcPath = path.resolve(__dirname, '../tmp/src/common/stylus/')
  const themeStyleThemePath = path.resolve(__dirname, '../theme-stylus')
  shell.exec(`cp -r ${mpxCubeUiStylusSrcPath} ${themeStyleThemePath}`)
  shell.exec('rm -rf tmp')
}
