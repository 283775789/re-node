const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const sass = require('node-sass')
const scss = require('../handler/scss')
const markdown = require('../handler/markdown')
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

// 处理所有的组件文档
router.get('/api/docs/:type/:name', function (req, res, next) {
  const name = req.params.name
  let filePath = ''

  if (req.params.type === 'guid') {
    filePath = `docs/guides`
  } else if (req.params.type === 'css') {
    filePath = `teewon/apps/web/src/static/style/modules/${name}`
  } else if (req.params.type === 'comps') {
    filePath = `teewon/apps/web/src/assemblies/components/${name}`
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

module.exports = router
