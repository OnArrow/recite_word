import Marked from 'marked'

import path from 'path'

import { fsWrite, fsRead, fsReadFolder, shuffle } from './utils'

const targetFilePath: string = path.resolve(__dirname, '../Entire.md')

const readFolderPath: string = path.resolve(__dirname, '../Words')

// 需要复习的单词
let strArr: string[] = []

let joinedWords: string[] = []

const resultArr: string[] = []

readTodoFile()
readWordsFolder()

/** 读取Todo文件 */
async function readTodoFile() {
  // 写入文件标题
  await fsWrite(targetFilePath, '# Entire\n', 'w')
}

/** 读取目录下所有md文件 */
async function readWordsFolder() {
  // 拿到目录下所有文件列表
  const fileArr = await fsReadFolder(readFolderPath)

  for (let fileName of fileArr) {
    if (fileName.includes('.md')) {
      const fileResult = await fsRead(fileName)

      matchWords(fileResult)
    }
  }

  writeContent(resultArr)
}

/** 匹配单词 */
function matchWords(str: string) {
  // 解析文件内容
  const parseArr = Marked.lexer(str)

  try {
    const list = parseArr.find((item) => item.type === 'list').items

    for (let item of list) {
      // 得到单词解释的当前行
      const str = item.tokens.find((ele) => ele.type === 'text').text

      // 碰到组合单词时直接跳过本次循环
      if (!str.includes('**[')) {
        continue
      }

      // 匹配 **[ 前面的内容
      // (.*?)匹配固定内容
      // (.+)匹配某个字符串后面的所有内容
      // '床前明月光' /前(.+)/ 获取到 明月光
      const regex = /(.*?)\*\*\[/g

      // 得到当前解释的单词

      const word = regex.exec(str)![1].trim()

      resultArr.push(str)
      joinedWords.push(word)
    }
  } catch (err) {
    console.log(err)
    console.log(str)
  }
}

/** 写入内容 */
async function writeContent(arr: string[]) {
  for (const [index, item] of arr.entries()) {
    // 追加进文件
    await fsWrite(targetFilePath, `${index + 1}. ${item}\n\n`, 'a')
  }

  const undone: string[] = []

  // 在控制台打印结果
  if (undone.length > 0) {
    console.log(
      '\x1B[31m%s\x1B[0m',
      `There are some words is undone: ${undone.join('  ')}`
    )
  } else {
    console.log(
      '\x1B[32m%s\x1B[0m',
      `Successfully! ${arr.length} words have already been added to ${targetFilePath}`
    )
  }
}
