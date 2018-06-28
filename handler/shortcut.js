// 生成快捷输入键
const fs = require('fs')
const shortcuts = {}
const getComponentFiles = require('./get-component-files')

function generateShortcut (files) {
  files.forEach((file, index) => {
    let n = 1

    const dataRows = fs.readFileSync(file, 'utf-8').split('\n')
    const prefix = 'tw-' + /([-_\w]*).vue/.exec(file)[1]

    const resultCode = []
    for (let i = 0; i < dataRows.length; i++) {
      // 去除style的内容
      if (/<style\s+lang/.test(dataRows[i])) break
      // 去除demo的template标签
      if (/(^<template)|(^<\/template)/.test(dataRows[i])) continue

      resultCode.push(dataRows[i])
    }

    let result = resultCode.join('\n')

    // 光标定位到标签内容区
    result = result.replace(/>([^<>\n]+?)</gm, function (m, p1) {
      return `>\${${n++}:${p1}}<`
    })

    // 光标定位到标签属性值
    result = result.replace(/(=\s*?")(.*?)"/gm, function (m, p1, p2) {
      return `${p1}\${${n++}:${p2}}"`
    })

    // 光标定位到键值对
    result = result.replace(/(\s+)([\w]+)(:\s*'?)([^,'\n]*)/gm, function (m, p1, p2, p3, p4) {
      return `${p1}\${${n++}:${p2}}${p3}\${${n++}:${p4}}`
    })

    shortcuts[prefix] = {
      'prefix': prefix,
      'body': [result]
    }
  })

  fs.writeFile('teewon/shortcut/vue-html.json', JSON.stringify(shortcuts), 'utf-8', function (e) {
    if (e) {
      console.log(e)
    }
  })
}

generateShortcut(getComponentFiles('*.vue', true))
