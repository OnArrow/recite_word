/**
 * Generate sider bar by directory
 */

import path from 'path'
import fs from 'fs'

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]

const directoryPath = path.resolve(__dirname, '..') // 请将路径替换为你的实际路径

// 项目名称
const projectName: any = directoryPath.split('\\').pop()

const excludeArr: string[] = [
  'Videos',
  'Images',
  'Script',
  'node_modules',
  'public'
]
const files = fs.readdirSync(directoryPath)

const resultFiles = files.filter((item) => {
  // 过滤以.开头的
  const regex = /^\..*$/
  if (regex.test(item)) return false

  // 过滤在列表中的
  if (excludeArr.includes(item)) return false

  const filePath = path.join(__dirname, `../${item}`)

  const stat = fs.statSync(filePath)

  // 过滤不是文件夹的
  if (!stat.isDirectory()) return false

  return true
})

function generateDirectoryArray(dirPath) {
  const result: any[] = []
  // console.log(dirPath);

  const files = fs.readdirSync(dirPath)

  files.sort((a, b) => {
    const monthOrder = months

    return monthOrder.indexOf(a) - monthOrder.indexOf(b)
  })

  console.log(files)

  // 遍历目录中的每个文件/文件夹
  for (const file of files) {
    const filePath = path.join(dirPath, file)

    if (filePath.includes('node_modules')) continue

    const index = resultFiles.findIndex((item) => {
      if (filePath.includes(item)) return true
    })

    if (index === -1) continue

    const stat = fs.statSync(filePath)

    // 如果是文件夹，则递归处理子目录
    if (stat.isDirectory()) {
      const directoryObj = {
        text: file,
        collapsed: true,
        items: generateDirectoryArray(filePath)
      }
      result.push(directoryObj)
    }
    // 如果是文件且是 Markdown 文件，生成对应的对象
    else if (stat.isFile() && file.endsWith('.md')) {
      const fileName = file.replace('.md', '')
      let fileLink = path.join(dirPath, file)

      // 替换反斜杠为正斜杠
      const convertedPath = fileLink.replace(/\\/g, '/')

      // 删除盘符和根目录部分
      // const finalPath = convertedPath.replace(/^.*Words/, "/Words");

      const fileObj = {
        text: fileName,
        link: convertedPath.split(projectName)[1]
      }
      result.push(fileObj)
    }
  }

  return result
}

export const directoryArray = generateDirectoryArray(directoryPath)
