const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const { THEME, EXAMPLE_DOC_PORT } = require('../config/index')
const webpack = require('webpack')

function resolve(file) {
  return path.resolve(__dirname, file)
}

module.exports = defineConfig({
  publicPath: `./`,
  outputDir: './dist/' + process.env.MPX_CURRENT_TARGET_MODE + '/',
  pluginOptions: {
    // 指向自定义主题文件
    // themeFilePath: themeFilePath(), // eg: [resolve('theme.styl')]
    mpx: {
      srcMode: 'wx',
      entry: resolve('app.mpx'),
      plugin: {
        // 是否生成用于测试的源文件/dist的映射表
        generateBuildMap: true,
        defs: {
          __themeMode__: THEME || 'default'
        }
      }
    }
  },
  devServer: {
    port: EXAMPLE_DOC_PORT
  },
  chainWebpack(config) {
    config.module.rules.delete('svg')
  },
  configureWebpack: {
    plugins: [
      new webpack.ProgressPlugin()
    ]
  }
})
