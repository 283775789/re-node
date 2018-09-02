/**
 * 生成组件列表
 * + 按组件的demo生成组件列表, demo的模板如下:
 * + <template group="xxx" type="xxx" name="xxx">
 * + 其中type字段必须与组件对应的scss文件第一行的 /* xxx * / 相同， 会按这里的值生成组件样式映射关系图谱。
 */
const fs = require('fs')
const getComponentFiles = require('./get-component-files')

function generateComponentsList (files) {
  const group = {}
  const groupNameReg = /<template .*group="(.*?)"/
  const typeNameReg = /<template .*type="(.*?)"/
  const nameReg = /<template .*name="(.*?)"/

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8')
    const groupName = groupNameReg.exec(content) ? groupNameReg.exec(content)[1] : ''
    const typeName = typeNameReg.exec(content) ? typeNameReg.exec(content)[1] : ''
    const name = nameReg.exec(content) ? nameReg.exec(content)[1] : ''

    if (!groupName || !typeName || !name) return

    const demoObj = {
      name: name,
      tag: 'demo-' + /([-_\w]*).vue/.exec(file)[1]
    }

    if (group[groupName]) {
      if (group[groupName][typeName]) {
        group[groupName][typeName]['demos'].push(demoObj)
      } else {
        group[groupName][typeName] = [demoObj]
      }
    } else {
      group[groupName] = {}
      console.log(typeName)
      if (typeName === '头部') {
        debugger
      }
      group[groupName][typeName] = {
        demos: [demoObj]
      }
    }
  })

  fs.writeFileSync('data/app/components.json', JSON.stringify(group))
}

generateComponentsList(getComponentFiles('*.vue', true))
