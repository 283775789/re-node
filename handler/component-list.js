// 生成组件列表
const dirs = require('./dirs')
const fs = require('fs')
const glob = require('glob')

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
      group[groupName][typeName] = {
        demos: [demoObj]
      }
    }
  })

  fs.writeFileSync('data/app/components.json', JSON.stringify(group))
}

let files = []

dirs.forEach(dir => {
  files = files.concat(glob.sync(dir))
})

generateComponentsList(files)
