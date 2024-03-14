import * as Marked from 'marked'

import * as nodePath from 'path'

import dayjs from 'dayjs'

import { fsWrite, fsRead, fsReadFolder } from './utils'

const targetFilePath = nodePath.resolve(__dirname, '../Review.md')

const readFolderPath = nodePath.resolve(__dirname, '../Words')

// 需要复习的单词
let strArr: string[] = []

const resultArr: string[] = []

// 读取Todo文件
async function readTodoFile() {
  // 读取文件内容
  const result = await fsRead(nodePath.resolve(__dirname, '../Todo.md'))

  // 解析文件内容
  const parseArr = Marked.lexer(result)
  // 找出复习那一栏
  const targetData = parseArr
    .find((item) => item.type === 'list')
    .items.find((item) => item.text.includes('**Review**'))
    .tokens.find((item) => item.type === 'code')

  // 把所有单词组成一个数组
  strArr = targetData.text.split(' ').filter((item) => item)

  // 写入文件标题
  await fsWrite(targetFilePath, '# Review\n', 'w')
}

// 读取目录下所有md文件
async function readWordsFolder() {
  // 拿到目录下所有文件列表
  const fileArr = await fsReadFolder(readFolderPath)

  // console.log(fileArr)
  for (let fileName of fileArr) {
    if (fileName.includes('.md')) {
      const fileResult = await fsRead(fileName)
      // const fileResult = await fsRead(
      //   '/Users/jack/code/单词/Words/November/11.14.md'
      // )

      matchWords(fileResult)
    }
  }

  writeContent(resultArr)
}

// 匹配单词
function matchWords(str) {
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

      // console.log(word);

      if (strArr.includes(word)) {
        resultArr.push(str)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

// 写入内容
async function writeContent(arr: string[]) {
  const newArr = shuffle(arr)
  for (const [index, item] of newArr.entries()) {
    // 追加进文件
    await fsWrite(targetFilePath, `${index + 1}. ${item}\n\n`, 'a')
  }
  console.timeEnd('abc')
}

// 数组乱序
function shuffle(a: any[]) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i)
    ;[a[i - 1], a[j]] = [a[j], a[i - 1]]
  }
  return a
}

console.time('abc')

readTodoFile()
readWordsFolder()
