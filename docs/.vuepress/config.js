const sidebarConfig = require('../config/sidebar')
const codeCopyPlugin = require('./plugins/code-copy-plugin')
const extendMarkdown = require('./highlight')

module.exports = {
  title: 'mpx-cube-ui',
  description: 'mpx-cube-ui-description',
  base: `/mpx-cube-ui/`,
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  plugins: [
    codeCopyPlugin()
  ],
  markdown: {
    lineNumbers: true,
    extendMarkdown
  },
  themeConfig: {
    logo: 'data:image/png;base64,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',
    nav: [
      {
        text: 'GitHub',
        link: 'https://github.com/didi/mpx-cube-ui'
      }
    ],
    sidebar: sidebarConfig
  }
}
