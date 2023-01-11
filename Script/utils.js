// 导入文件模块
const fs = require('fs')

// node path模块
const nodePath = require('path')

// 封装一个异步读取文件的函数
function fsRead(path) {
  return new Promise((resolve, reject) => {
    // 读取文件 readFile
    fs.readFile(
      path,
      {
        flag: 'r',
        encoding: 'utf8',
      },
      (err, data) => {
        // 如果读取失败
        if (err) return reject(err)
        // 读取成功
        resolve(data)
      }
    )
  })
}

// 封装一个写入文件的函数
// 第一个参数为需要写入的文件名 第二个参数为需要写入的内容 第三个参数为文件系统标志 a为追加内容 如果是w就会覆盖原来的内容
function fsWrite(path, content, flag = 'w') {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path,
      content,
      {
        flag: flag,
        encoding: 'utf-8',
      },
      err => {
        if (err) return reject(err)
        resolve()
      }
    )
  })
}

// 删除文件
function deleteFile(path) {
  // 删除文件
  fs.unlink(path, () => {
    console.log('删除文件成功')
  })
}

// 读取文件夹下所有文件
const fileDisplay = (url, cb) => {
  const filePath = nodePath.resolve(url)

  // 收集所有的文件路径
  const arr = []
  let timer = null
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath, (err, files) => {
    if (err) return console.error('Error:(spec)', err)
    files.forEach(filename => {
      //获取当前文件的绝对路径
      const filedir = nodePath.join(filePath, filename)
      // fs.stat(path)执行后，会将stats类的实例返回给其回调函数。
      fs.stat(filedir, (eror, stats) => {
        if (eror) return console.error('Error:(spec)', err)
        // 是否是文件
        const isFile = stats.isFile()
        // 是否是文件夹
        const isDir = stats.isDirectory()
        if (isFile) {
          // 这块我自己处理了多余的绝对路径，第一个 replace 是替换掉那个路径，第二个是所有满足\\的直接替换掉
          arr.push(filedir.replace(__dirname, '').replace(/\\/gim, '/'))
          // 最后打印的就是完整的文件路径了
          if (timer) clearTimeout(timer)
          timer = setTimeout(() => cb && cb(arr), 200)
        }
        // 如果是文件夹
        if (isDir) fileDisplay(filedir, cb)
      })
    })
  })
}

let fileArr = []

// 读取文件夹
function fsReadFolder(path) {
  fileArr = []
  return new Promise((resolve, reject) => {
    getFilePathArr(path)
    setTimeout(() => {
      resolve(fileArr)
    }, 3000)
  })
}

function getFilePathArr(path) {
  const filePath = nodePath.resolve(path)
  fs.readdir(filePath, (err, files) => {
    files.forEach(fileName => {
      //获取当前文件的绝对路径
      const fileDir = nodePath.join(filePath, fileName)
      fs.stat(fileDir, (err2, stats) => {
        // 是否是文件
        const isFile = stats.isFile()
        if (isFile) {
          const filePath = fileDir.replace(__dirname, '').replace(/\\/gim, '/')
          fileArr.push(filePath)
        } else {
          getFilePathArr(fileDir)
        }
      })
    })
  })
}

module.exports = {
  fsRead,
  fsWrite,
  fileDisplay,
  fsReadFolder,
  deleteFile,
}
