const path = require('path')
const util = require('util')
const copy = require('copy')
const fs = require('fs')
const exec = util.promisify(require('child_process').exec)

const libTsConfig = path.resolve(__dirname, '../tsconfig.lib.json')
console.log(libTsConfig)
const libDir = path.resolve(__dirname, '../lib')
const libComponentsDir = path.resolve(__dirname, '../lib/components')

function getComponentsDir() {
  let nestedComponentsDir = []
  const componentsDir = fs
    .readdirSync(libComponentsDir)
    .filter(dir => {
      return fs.statSync(`${libComponentsDir}/${dir}`).isDirectory()
    })
    .map((dir) => {
      const arr = fs
        .readdirSync(`${libComponentsDir}/${dir}`)
        .filter(item => {
          return fs.statSync(`${libComponentsDir}/${dir}/${item}`).isDirectory()
        })
        .map(item => {
          return path.resolve(`${libComponentsDir}/${dir}`, item)
        })
      nestedComponentsDir = [...nestedComponentsDir, ...arr]
      return path.resolve(libComponentsDir, dir)
    })
  return [...componentsDir, ...nestedComponentsDir]
}

async function compileTs(dist, config) {
  try {
    await exec(`npx tsc -p ${config}`)
    await exec(`npx tscpaths -p ${config} -s ./src -o ${dist}`)
  } catch (e) {
    // console.log('the error is:', e)
  }
}

async function copyStatic() {
  const fileArr = ['styl', 'ttf', 'woff', 'mpx'].map(fileItem => path.resolve(__dirname, `../src/**/*.${fileItem}`))
  const fileFoldArr = ['images'].map(fileFoldItem => path.resolve(__dirname, `../src/**/${fileFoldItem}/**`))
  const pathArr = [
    ...fileArr,
    ...fileFoldArr
  ]

  return new Promise((resolve, reject) => {
    copy(pathArr, libDir, (err) => {
      if (err) {
        throw Error(err)
      } else {
        resolve()
      }
    })
  })
}

async function build() {
  await exec(`rm -rf ${libDir}/*`) // 确保每次gen lib都是最新的
  await compileTs(libDir, libTsConfig)
  await copyStatic()
  modifyMpxScriptRef()

  // console.log('Done: compile component lib dir')
}

function modifyMpxScriptRef() {
  const dirs = getComponentsDir()
  dirs.forEach((filePath) => {
    const subFiles = fs.readdirSync(filePath)
    subFiles.forEach(item => {
      if (!item.includes('.mpx')) return
      try {
        const finalPath = path.resolve(filePath, item)
        let content = fs.readFileSync(finalPath, 'utf-8')
        let jsonBlock = ''
        const jsonBlockReg = /(<script\s[\w\s]*(name=["']json["']|type=["']application\/json["'])(\s|[\w\s])*>[\s\S]*<\/script>)/
        content = content
          .replace(jsonBlockReg, function (...args) {
            jsonBlock = args[0]
            return ''
          })
          .replace(/<script[\s\S]*>[\s\S]*<\/script>/, function (...args) {
            const fileName = item.split('.')[0]
            return `<script src="./${fileName}.js"></script>`
          })
        content += '\n' + jsonBlock
        fs.writeFileSync(finalPath, content)
      } catch (err) {}
    })
  })
}

build()
