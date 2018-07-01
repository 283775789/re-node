const config = require('../config')
const fs = require('fs')
const glob = require('glob')

const dirs = [
  config.path.project.web.defaultTemplatePath + '/src/components/**/*.*',
  config.path.project.web.defaultTemplatePath + '/src/components/**',
  config.path.project.web.defaultTemplatePath + '/src/components',
  config.path.project.web.defaultTemplatePath + '/package.json',
  config.path.project.web.defaultTemplatePath + config.path.app.templateAssembliesPath + '/**/*.md',
  config.path.project.web.defaultTemplatePath + config.path.app.templateStylePath + '/**/*.+(md|vue)',
  config.path.project.web.defaultTemplatePath + config.path.app.templateCompsPath + '/**/demo/*.vue',
  config.path.project.web.defaultTemplatePath + config.path.app.templateCompsPath + '/**/demo',
  config.path.project.web.defaultTemplatePath + config.path.app.templateStyleModulesPath + '/**/'
]

dirs.forEach(dir => {
  const paths = glob.sync(dir)

  paths.forEach(p => {
    const stats = fs.statSync(p)

    if (stats.isDirectory()) {
      const files = fs.readdirSync(p)
      if (files.length === 0) {
        fs.rmdirSync(p)
      }
    } else {
      fs.unlinkSync(p)
    }
  })
})
