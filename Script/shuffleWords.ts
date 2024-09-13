/**
 * 乱序指定月份内的文件
 */

import * as Marked from 'marked'

import * as nodePath from 'path'

import { fsWrite, fsRead, fsReadFolder, shuffle } from './utils'

import dayjs from 'dayjs'

const months: string[] = [
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

const monthMap = new Map([
  [1, 'Jan'],
  [2, 'Feb'],
  [3, 'Mar'],
  [4, 'Apr'],
  [5, 'May'],
  [6, 'Jun'],
  [7, 'Jul'],
  [8, 'Aug'],
  [9, 'Sep'],
  [10, 'Oct'],
  [11, 'Nov'],
  [12, 'Dec']
])

/**
 * 需要乱序的文件
 * 如：['2024/May', '2024/Jun']
 */
let shuffleMonths: string[] = ['2024/Aug', '2024/Sep']

// 读取的文件夹路径
let readFolderPath: string = nodePath.resolve(__dirname, '../Words')

// 判断是否跟随参数
if (process.argv) {
  // 默认。没有跟随参数
  if (process.argv.length === 2) {
    readWordsFolder()
  }

  // 跟随一个参数，如 pnpm run shuffle 4.03
  if (process.argv.length === 3) {
    // shuffleMonths = process.argv.slice(2)
    const val = process.argv[2]
    if (val.toLowerCase() === 'latest') {
      onLatest()
    } else {
      onParticular(val)
    }
  }
}

/**
 * 乱序最新的文件
 */
async function onLatest() {
  const year = dayjs().year()
  readFolderPath = nodePath.resolve(readFolderPath, `${year}`)
  // 拿到目录下所有文件列表
  const fileArr = await fsReadFolder(readFolderPath)

  // 按照固定格式排序
  fileArr.sort((a, b) => {
    const regex = /(\d+\.\d+)\.md$/

    const numberA = parseFloat(a.match(regex)[1])
    const numberB = parseFloat(b.match(regex)[1])

    return numberA - numberB
  })

  const latestFile = fileArr.pop()
  shuffleContent(latestFile)
}

/**
 * 乱序指定文件
 * pnpm run shuffle 2022/8.05
 * pnpm run shuffle 4.03 // 不写年份默认今年的4.03
 */
async function onParticular(str: string) {
  const v = str.split('/')
  let s = ''

  // 判断是否有年份
  if (v.length === 2) {
    readFolderPath = nodePath.resolve(readFolderPath, `${v[0]}`)
    s = v[1]
  } else {
    const year = dayjs().year()
    readFolderPath = nodePath.resolve(readFolderPath, `${year}`)
    s = v[0]
  }

  // 拿到目录下所有文件列表
  const fileArr = await fsReadFolder(readFolderPath)

  const particularFile = fileArr.find((item: string) => item.includes(s))
  if (particularFile) {
    shuffleContent(particularFile)
  } else {
    console.log('\x1B[31m%s\x1B[0m', `No such file!`)
  }
}

/** 读取目录下所有md文件 */
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

/** 乱序内容 */
async function shuffleContent(fileName: string) {
  const fileResult = await fsRead(fileName)
  // 解析md内容
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

/** 写入内容 */
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
