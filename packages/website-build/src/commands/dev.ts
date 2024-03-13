import { createRequire } from 'node:module'
import compileWebsite from '../compiler/compile-website.js'

const require = createRequire(import.meta.url)
const { THEME } = require('../../../../config/index.js')

export function dev () {
  compileWebsite({
    theme: THEME || 'default',
    isProd: false
  })
}
