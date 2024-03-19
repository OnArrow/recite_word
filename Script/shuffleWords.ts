import * as Marked from 'marked'

import * as nodePath from 'path'

import { fsWrite, fsRead, fsReadFolder, shuffle } from './utils'

const shuffleMonths = ['2024/Apr']

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
  writeContent(title, arr)
}

// 写入内容
async function writeContent(title, arr: string[]) {
  const newArr = shuffle(arr)

  for (const [index, item] of newArr.entries()) {
    let codeArr = []
    let content = ''
    if (item.code) {
      codeArr = item.code.split('\n')
      content = `
${index === 0 ? title : ''}
${index + 1}. ${item.top}
    \`\`\`
    ${codeArr[0] || ''}
    ${codeArr[1] || ''}
    \`\`\`
`
    } else {
      content = `
${index === 0 ? title : ''}
${index + 1}. ${item.top}
`
    }

    // 追加进文件
    await fsWrite(
      'D:/Jack/personal/recite_word/Words/2024/Mar/3.21.md',
      content,
      'a'
    )
  }
}

readWordsFolder()
