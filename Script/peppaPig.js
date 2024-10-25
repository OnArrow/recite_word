const XLSX = require('xlsx')
const path = require('path')
const fs = require('fs')

// 读取目录
const readDir = path.resolve(__dirname, './12')

// 输入目录
const outDir = path.resolve(__dirname, '../Reader/Peppa Pig/Season 01')

let fileArr = []

start()

async function start() {
  // 拿到目录下所有文件列表
  const files = await fsReadFolder(readDir)
  const fileResult = files.filter((item) => item.includes('台词.xlsx'))

  // 排序
  fileResult.sort((a, b) => {
    // 提取文件名中的数字
    const numA = parseInt(a.split('第')[2].split('集')[0], 10)
    const numB = parseInt(b.split('第')[2].split('集')[0], 10)

    // 比较数字
    return numA - numB
  })

  for (const [index, item] of fileResult.entries()) {
    const f = path.resolve(__dirname, `.${item}`)

    const jsonData = await readFile(f)

    const row = jsonData[0]

    const [enKey, cnKey] = Object.keys(row)

    const enResult = jsonData.map((item) => item[enKey])
    const cnResult = jsonData.map((item) => item[cnKey])

    await writeContent({
      title: `# ${enKey}\n`,
      fileName: path.resolve(outDir, `${index + 1} ${enKey}.md`),
      ens: enResult,
      cns: cnResult
    })
  }
}

/** 写入内容 */
async function writeContent({ title, ens, cns, fileName }) {
  // 写入文件标题
  await fsWrite(fileName, `${title}`, 'w')

  await fsWrite(fileName, `## Article\n\n`, 'a')

  const enContent = ens
    .map((item, index) => `${index + 1}. ${item}\n\n`)
    .join(' ')

  // 追加进文件
  await fsWrite(fileName, enContent, 'a')

  await fsWrite(fileName, `## Translation\n\n`, 'a')

  const cnContent = cns
    .map((item, index) => `${index + 1}. ${item}\n\n`)
    .join(' ')

  // 追加进文件
  await fsWrite(fileName, cnContent, 'a')
  console.log(`完成 ${title}`)
}

/**
 * 读取excel中的数据，并以json格式输出
 * @param {string} filePath 文件所在路径
 */
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    try {
      const fileContent = XLSX.readFile(filePath) // 读取excel文件
      const name = fileContent.SheetNames[0] // 获取excel第一张sheet的名字
      const sheet = fileContent.Sheets[name] // 获取excel第一张sheet中的数据

      const jsonData = XLSX.utils.sheet_to_json(sheet) // 将数据转成 json 格式
      resolve(jsonData)
    } catch (err) {
      reject()
    }
  })
}

// 读取文件夹
function fsReadFolder(myPath) {
  fileArr = []
  return new Promise((resolve, reject) => {
    getFilePathArr(myPath)
    setTimeout(() => {
      resolve(fileArr)
    }, 3000)
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
        encoding: 'utf-8'
      },
      (err) => {
        if (err) return reject(err)
        resolve(true)
      }
    )
  })
}

function getFilePathArr(myPath) {
  const filePath = path.resolve(myPath)
  fs.readdir(filePath, (err, files) => {
    files.forEach((fileName) => {
      //获取当前文件的绝对路径
      const fileDir = path.join(filePath, fileName)
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
