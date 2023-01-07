const MarkdownIt = require('markdown-it')

const { fsWrite, fsRead, fileDisplay, fsReadFolder } = require('./utils')

const md = new MarkdownIt()

let strArr = []

let wordsArr = []

let wordsStr = ''

async function readTodoFile() {
  const result = await fsRead('../Todo.md')

  const ParsedResult = md.parse(result)
  const index = ParsedResult.findIndex(item => {
    if (item.type === 'inline' && item.content === '**复习**') return true
  })

  strArr = ParsedResult[index + 2].content.split(' ').filter(item => item)
  strArr.filter
}

async function readWordsFolder() {
  fileDisplay('../Words/April', arr => {
    wordsArr.push(...arr)

    const newArr = wordsArr.filter(item => {
      if (item.includes('.md')) return true
    })

    // newArr.forEach(async item => {
    //   //
    //   const res = await fsRead(item)
    //   console.log(res)
    //   // const ParsedResult = md.parse(res)
    //   // console.log(ParsedResult)
    //   debugger
    // })

    for (let item of newArr) {
      fsRead('../T1.md').then(res => {
        try {
          wordsStr += res
          wordsStr += '23482784737437473743747374374737437'
          console.log(wordsStr)
          console.log(wordsStr.replaceAll('milkshake', '11111'))
        } catch (err) {
          console.log(err)
        }
      })
    }
  })
}

readTodoFile()

readWordsFolder()
