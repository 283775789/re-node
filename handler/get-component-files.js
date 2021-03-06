// 按glob后缀获取组件文件夹下的文件
const type = 'web'
let dirs = []
const glob = require('glob')

if (type === 'web') {
  dirs = [
    'teewon/templates/web/default/src/static/style/modules/**/',
    'teewon/templates/web/default/src/assemblies/components/**/'
  ]
} else if (type === 'mobile') {
  dirs = [
    'teewon/templates/mobile/default/src/static/style/modules/**/',
    'teewon/templates/mobile/default/src/assemblies/components/**/'
  ]
}

module.exports = function (globPath, onlyDemo) {
  let files = []

  onlyDemo && (dirs[1] += 'demo/')

  dirs.forEach(dir => {
    files = files.concat(glob.sync(dir + globPath))
  })

  return files
}
