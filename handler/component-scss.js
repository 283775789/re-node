/**
 * 生成组件SCSS变量模板
 */
const fs = require('fs')
const process = require('process')
const getComponentFiles = require('./get-component-files')

let variablesPath = 'teewon/templates/web/default/src/static/style/base/_variables.scss'
let scssFiles = getComponentFiles('*.scss')
let variablesTemplate = 'teewon/scss/web-variables.scss'

// 指定web端组件或移动端组件的scss相关路径
// if (process.argv[2] === 'web') {
//   varsPath = 'templates/scss/web-vars.scss'
//   compSassPath = 'templates/templates/web/default/src/static/css/teewon/'
// } else if (process.argv[2] === 'mobile') {
//   varsPath = 'templates/scss/mobile-vars.scss'
//   compSassPath = 'templates/templates/mobile/default/src/static/css/teewon/'
// } else {
//   console.error('请指定正确的命令行参数,可选的值为[web],[mobile]')
// }

// 获取组件变量值
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

let result = '\n/* ------------------------------ 组件变量 ------------------------------ */\n'

scssFiles.forEach(file => {
  result += getCompVars(fs.readFileSync(file, 'utf-8'))
})

fs.writeFileSync(variablesTemplate, fs.readFileSync(variablesPath, 'utf-8').replace(/\s*!default/gm, '') + result)
