const path = require('path');

module.exports = (options, ctx) => {
  return {
    name: 'vuepress-plugin-code-copy',
    clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
  }
 }