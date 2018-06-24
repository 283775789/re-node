const project = {
  name: '项目名称',
  version: 'V006R001C05',
  developers: [],
  svn: {
    designImage: '',
    designFile: '',
    html: 'http://192.168.111.244:8888/svn/aischool/doc/02.组织文档/06.UI组/02.HTML文件/03. 前端项目库/学校空间',
    publish: 'http://192.168.111.244:8888/svn/aischool/doc/02.组织文档/06.UI组/02.HTML文件/03. 前端项目库/作品库/trunk/src/static/images',
    flow: ''
  },
  document: {
    prd: 'http://192.168.102.222:9888/pages/viewpage.action?pageId=31922868',
    api: ''
  }
}

const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec

const dirs = [
  {
    name: '代码',
    key: 'html'
  },
  {
    name: '低保真',
    key: ''
  },
  {
    name: '高保真',
    key: 'designImage'
  },
  {
    name: '过程文件',
    key: 'flow'
  },
  {
    name: '源文件',
    key: 'designFile'
  }
]

// 建立需求文档快捷访问
const createShortcut = function () {
  if (!project.document.prd) return

  const html = `<html><header><script>location.href="${project.document.prd}";</script></header></html>`

  fs.writeFile(path.resolve(__dirname, `${project.name}/需求文档.html`), html, (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('已建立需求文档快捷访问方式。')
    }
  })
}

let dirIndex = 0
const createDir = function (index) {
  const dir = dirs[index]
  console.log(`正在创建${dir.name}目录...`)

  let dirPath = path.resolve(__dirname, `${project.name}/${dir.name}`)

  if (dir.name === '代码') {
    fs.mkdirSync(path.resolve(__dirname, project.name))
  } else {
    fs.mkdirSync(dirPath)
    dirPath = path.join(dirPath, `/${project.version}`)
  }

  fs.mkdir(path.resolve(__dirname, dirPath), function (err) {
    function next () {
      if (dirIndex < dirs.length - 1) {
        createDir(++dirIndex)
      } else {
        createShortcut()
      }
    }

    let cmd

    if (project.svn[dir.key]) {
      cmd = `svn co "${project.svn[dir.key]}" "${dirPath}"`
    } else {
      console.log(`${dir.name}目录创建完成。\n`)
      next()
      return
    }

    if (!err) {
      console.log(`${dir.name}目录正在同步svn内容...`)
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          console.log(error)
        } else {
          console.log(`${dir.name}目录创建完成。\n`)
          next()
        }
      })
    }
  })
}

createDir(dirIndex)
