const fs = require('fs')
const process = require('process')
let varsPath
let compSassPath
let varsTemplatePath

varsPath = 'templates/scss/web-vars.scss'
compSassPath = 'templates/apps/web/src/static/css/teewon/'
varsTemplatePath = 'templates/scss/web-variables.scss'

// 指定web端组件或移动端组件的scss相关路径
// if (process.argv[2] === 'web') {
//   varsPath = 'templates/scss/web-vars.scss'
//   compSassPath = 'templates/apps/web/src/static/css/teewon/'
// } else if (process.argv[2] === 'mobile') {
//   varsPath = 'templates/scss/mobile-vars.scss'
//   compSassPath = 'templates/apps/mobile/src/static/css/teewon/'
// } else {
//   console.error('请指定正确的命令行参数,可选的值为[web],[mobile]')
// }

const getCompVars = function (data) {
  const dataRows = data.split('\n')
  const endReg = /(^\s*$)|(^\s*\/\/)/
  const defaultReg = /\s*!default/
  const result = []

  for (let i = 0; i < dataRows.length; i++) {
    if (endReg.test(dataRows[i])) break
    result.push(dataRows[i].replace(defaultReg, ''))
  }

  if (result.length < 2) {
    return ''
  } else {
    return result.join('\n') + '\n\n'
  }
}

fs.readdir(compSassPath, function (e, files) {
  let result = '\n/* ------------------------------ 组件变量 ------------------------------ */\n'

  files.forEach(filename => {
    if (/.scss$/.test(filename)) {
      result += getCompVars(fs.readFileSync(compSassPath + filename, 'utf-8'))
    }
  })

  fs.writeFileSync(varsTemplatePath, fs.readFileSync(varsPath, 'utf-8') + result)
})
