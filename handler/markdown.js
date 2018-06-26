// 编译markdown文件的demo内容
const fs = require('fs')

module.exports = function (data, filePath, name, type) {
  if (!data) return
  if (type === 'comps') filePath += '/demo'

  const dataRows = data.split('\n')

  for (let i = 0; i < dataRows.length; i++) {
    const demoReg = /^\{\{(.*)\}\}/

    if (demoReg.test(dataRows[i])) {
      const matches = demoReg.exec(dataRows[i])

      let code = fs.readFileSync(`${filePath}/${matches[1]}.vue`, 'utf-8')
      code = code.replace(/template\s+name=".*"/, 'template')

      let codeRows = code.split('\n')
      let resultCode = []

      for (let i = 0; i < codeRows.length; i++) {
        // 去除demo样式
        if (/<style\s+lang/.test(codeRows[i])) break
        // 去除demo的template标签
        if (/(^<template)|(^<\/template)/.test(codeRows[i])) continue

        resultCode.push(codeRows[i])
      }

      code = resultCode.join('\n')

      if (type !== 'guid') {
        dataRows[i] = `<div class="tw-demo"><demo-${matches[1]} /></div>\n\n<div class="tw-markdown-shortcut"><span>快捷键 | </span>tw-${matches[1]}</div>\n\n\`\`\`xml\n${code}\`\`\``
      } else {
        dataRows[i] = `<div class="tw-demo"><demo-${matches[1]} /></div>\n`
      }
    }
  }

  return dataRows.join('\n')
}
