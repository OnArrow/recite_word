import path from 'path'
import fs from 'fs'

/** 重命名文件名 */
function renameFilesInDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err)
      return
    }

    files.forEach((file) => {
      const oldFilePath = path.join(directoryPath, file)

      fs.stat(oldFilePath, (err, stats) => {
        if (err) {
          console.error('Error getting file stats:', err)
          return
        }

        if (stats.isDirectory()) {
          // 如果是子目录，递归调用函数
          renameFilesInDirectory(oldFilePath)
        } else {
          // 如果是文件，修改文件名
          const newFileName = file.replace('-', ' ')
          const newFilePath = path.join(directoryPath, newFileName)

          console.log(newFileName)

          fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
              console.error('Error renaming file:', err)
              return
            }
            console.log(`Renamed ${oldFilePath} to ${newFilePath}`)
          })
        }
      })
    })
  })
}

const targetDirectory = '../Test'

const directoryPath = path.resolve(__dirname, targetDirectory)
renameFilesInDirectory(directoryPath)
