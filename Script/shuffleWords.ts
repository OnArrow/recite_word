/**
 * 乱序指定月份内的文件
 */

import * as Marked from 'marked'

import * as nodePath from 'path'

import { fsWrite, fsRead, fsReadFolder, shuffle } from './utils'

// 需要乱序的文件
const shuffleMonths = ['2024/May']

const readFolderPath = nodePath.resolve(__dirname, '../Words')

// 读取目录下所有md文件
async function readWordsFolder() {
  // 拿到目录下所有文件列表
  const fileArr = await fsReadFolder(readFolderPath)

  // console.log(fileArr)
  for (let fileName of fileArr) {
    if (fileName.includes('.md')) {
      for (let shuffleMonth of shuffleMonths) {
        if (fileName.includes(shuffleMonth)) {
          shuffleContent(fileName)
        }
      }
    }
  }
}

async function shuffleContent(fileName: string) {
  const fileResult = await fsRead(fileName)
  const parseArr = Marked.lexer(fileResult)
  const title = parseArr.find((item) => item.type === 'heading').raw

  const list = parseArr.find((item) => item.type === 'list').items

  const arr: any[] = []

  for (let item of list) {
    // console.log(item)

    // 得到单词解释的当前行
    const str: string = item.tokens.find((ele) => ele.type === 'text').text

    // 得到单词的例句
    let code = ''
    let v = item.tokens.find((ele) => ele.type === 'code')
    if (v) {
      code = v.text
    }

    // 碰到组合单词时直接跳过本次循环
    if (!str.includes('**[')) {
      continue
    }

    const obj = {
      top: str,
      code
    }
    arr.push(obj)
  }
  writeContent(title, arr, fileName)
}

// 写入内容
async function writeContent(title, arr: string[], fileName: string) {
  const newArr = shuffle(arr)

  // 写入文件标题
  await fsWrite(fileName, `${title}`, 'w')

  for (const [index, item] of newArr.entries()) {
    let codeArr = []
    let content = ''
    if (item.code) {
      codeArr = item.code.split('\n')
      content = `
${index + 1}. ${item.top}
    \`\`\`
    ${codeArr[0] || ''}
    ${codeArr[1] || ''}
    \`\`\`
`
    } else {
      content = `
${index + 1}. ${item.top}
`
    }

    // 追加进文件
    await fsWrite(fileName, content, 'a')
  }
}

readWordsFolder()
