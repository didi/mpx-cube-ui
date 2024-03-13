const fs = require('fs')
const path = require('path')

/**
 * 获取某个文件夹下的文件内容
 * @param {*} fileFolderDir 需遍历的文件夹的目录
 * @param {*} processFileCb 文件处理的回调函数
 */
function traverseFileFolder (fileFolderDir, processFileCb) {
  return new Promise((resolve, reject) => {
    fs.readdir(fileFolderDir, function (err, files) {
      if (err) {
        console.warn(err)
        reject(err)
      } else {
        const tasks = files.map(function (filename) {
          return new Promise((resolve) => {
            const filePath = path.join(fileFolderDir, filename)

            fs.stat(filePath, async function (err, stats) {
              if (err) {
                console.warn('获取文件stats失败')
                resolve([false, err])
              } else {
                const isFile = stats.isFile()
                // 是一个文件
                if (isFile) {
                  await (processFileCb && processFileCb(filePath, filename))
                  resolve([true, filePath])
                }
              }
            })
          })
        })
        Promise.all(tasks).then(resolve)
      }
    })
  })
}

module.exports = {
  traverseFileFolder
}
