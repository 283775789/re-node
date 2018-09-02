const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const sass = require('node-sass')
const scss = require('../handler/scss')
const markdown = require('../handler/markdown')
const config = require('../config')
const ncp = require('ncp')
const uid = 0

router.get('/', function (req, res, next) {
  res.sendfile(path.join(__dirname, '../www/main.html'))
})

// 获取开发组成员
router.get('/api/developers', function (req, res, next) {
  const developers = require('../data/common/developers.json')
  res.send(JSON.stringify(developers))
})

// 处理scss变量模板
router.get('/api/scss-vars', function (req, res, next) {
  fs.readFile('teewon/scss/web-variables.scss', 'utf-8', (e, data) => {
    const result = scss.compileTemplate(data)
    res.send(JSON.stringify(result))
  })
})

router.options('*', function (req, res, next) {
  res.send()
})

// 处理所有的组件文档
router.get('/api/docs/:type/:name', function (req, res, next) {
  const name = req.params.name
  let filePath = ''

  if (req.params.type === 'guid') {
    filePath = `docs/guides`
  } else if (req.params.type === 'css') {
    filePath = `teewon/templates/web/default/src/static/style/modules/${name}`
  } else if (req.params.type === 'comps') {
    filePath = `teewon/templates/web/default/src/assemblies/components/${name}`
  } else if (req.params.type === 'directives') {
    filePath = `teewon/templates/web/default/src/assemblies/directives/${name}`
  }

  fs.readFile(`${filePath}/${name}.md`, 'utf-8', (e, data) => {
    res.send(markdown(data, filePath, name, req.params.type))
  })
})

// 处理css请求
router.post('/api/css', function (req, res, next) {
  const scssContent = '@import "functions";\n\n' + scss.createScss(req.body) + fs.readFileSync('src/static/style/main.scss')

  sass.render({
    data: scssContent,
    includePaths: [
      'src/static/style',
      'src/static/style/base',
      'src//assemblies/components',
      'src/static/style/modules'
    ],
    outputStyle: 'compressed'
  }, function (e, result) {
    if (e) {
      console.log(e.message)
    } else {
      res.setHeader('content-type', 'text/css')
      res.send(result.css.toString())
    }
  })
})

// 获取组件列表
router.get('/api/components/:type', function (req, res, next) {
  let components

  if (req.params.type === 'web') {
    components = require('../' + config.path.project.web.components)
  } else if (req.params.type === 'mobile') {
    components = require('../' + config.path.project.mobile.components)
  }

  res.send(JSON.stringify(components))
})

// 增加一个前置项目
router.post('/api/pre-projects', function (req, res, next) {
  const {name, version, developers, type, svn, document} = req.body.project
  const projectTemplate = type === 'web' && config.path.project.web.defaultTemplatePath
  const prePorjectPath = (type === 'web' && config.path.project.web.prePath) + `/${name}-${version}`
  const packageFile = type === 'web' && config.path.project.web.packageTemplate

  try {
    fs.mkdirSync(prePorjectPath)

    if (type === 'web') {
      ncp(projectTemplate, prePorjectPath, function (err) {
        if (err) {
          return console.error(err)
        }

        // 生成packageContent
        const packageContent = require('../' + packageFile)
        packageContent.teewon = {name, version, developers, type, svn, document}
        fs.writeFileSync(`${prePorjectPath}/package.json`, JSON.stringify(packageContent, null, 2))

        // 生成variable.scss
        fs.appendFileSync(`${prePorjectPath}/${config.path.app.scssVariable}`, scss.createScss(req.body.scssVars))

        // 保存全局设计配置用了哪些组件:design.json
        fs.writeFileSync(`${prePorjectPath}/design.json`, JSON.stringify(req.body.comps, null, 2))

        res.send(config.msg.success.preProject)
      })
    }
  } catch (err) {
    res.status(500).send(config.msg.error.preProject)
  }
})

module.exports = router
