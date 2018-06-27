// 生成快捷输入键
const type = 'web'
let dirs = []

if (type === 'web') {
  dirs = [
    'teewon/apps/web/src/static/style/modules/**/*.vue',
    'teewon/apps/web/src/assemblies/components/**/demo/*.vue'
  ]
} else if (type === 'mobile') {
  dirs = [
    'teewon/apps/mobile/src/static/style/modules/**/*.vue',
    'teewon/apps/mobile/src/assemblies/components/**/demo/*.vue'
  ]
}

module.exports = dirs
