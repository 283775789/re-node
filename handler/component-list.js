const fs = require('fs')
const examplesPath = 'examples/demo/'
const group = {}
const groupNameReg = /<template .*group="(.*?)"/
const typeNameReg = /<template .*type="(.*?)"/
const nameReg = /<template .*name="(.*?)"/

fs.readdir(examplesPath, function (e, files) {
  files.forEach(filename => {
    const content = fs.readFileSync(examplesPath + filename)
    const groupName = groupNameReg.exec(content)[1]
    const typeName = typeNameReg.exec(content)[1]
    const name = nameReg.exec(content)[1]
    const demoObj = {
      name: name,
      tag: 'tw-' + filename.replace(/.vue$/, '')
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
        name: typeName,
        demos: [demoObj]
      }
    }
  })

  fs.writeFileSync('examples/config/components.json', JSON.stringify(group))
})
