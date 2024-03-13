import fs from 'fs'
import path from 'path'
import nodeWatch from 'node-watch'
import { createTypedocProject } from '@mpxjs/vuese-parser'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import genDocMd from './compile-doc-md.js'

let watched = false
const __dirname = dirname(fileURLToPath(import.meta.url))
const rootPath = path.resolve(__dirname, '../../../../')
const resolve = (dir = '') => path.resolve(rootPath, dir)

function doDocsBuild (options: Options = {}) {
  const isProd = options.isProd
  const exampleDir = resolve(options.exampleDir)
  const mdDistDir = resolve(options.mdDistDir)
  const srcDir = resolve(options.srcDir)
  const examples = fs
    .readdirSync(exampleDir)
    .filter((dir) => fs.statSync(`${exampleDir}/${dir}`).isDirectory())
  // const examples = ['picker']

  const doBuild = async function () {
    const project = await createTypedocProject({
      entryPoints: [
        resolve('packages/mpx-cube-ui/src/common/mixins'),
        resolve('packages/mpx-cube-ui/src/types'),
        resolve('packages/mpx-cube-ui/src/components'),
        resolve('packages/mpx-cube-ui/src/common/helper/confirm-button-group.ts')
      ]
    })
    options.typedocProject = project
    const genMd = () => {
      genDocMd(examples, {
        srcDir,
        mdDistDir,
        exampleDir
      }, options)
    }
    genMd()
    if (!isProd && !watched) {
      watched = true
      nodeWatch([exampleDir, srcDir], { recursive: true }, function () {
        genMd()
      })
    }
  }
  doBuild()
}

export default doDocsBuild
