const path = require('path')
const gulp = require('gulp')
const spriteSmith = require('gulp.spritesmith')
const replace = require('gulp-replace')
const watch = require('gulp-watch')

function appSrc (dir) {
  return path.join(__dirname, 'src', dir)
}

const appPaths = {
  src: {
    css: appSrc('static/css'),
    icons: [appSrc('static/icons/*.*'), appSrc('static/icons/.*.*')],
    images: appSrc('static/images')
  }
}

const appTasks = {
  // 生成雪碧图及相对应的css
  sprite: function () {
    const opt = {
      imgName: 'icons.png',
      cssName: '_sprite.scss',
      cssFormat: 'css',
      imgPath: '../images/icons.png',
      padding: 10,
      cssTemplate: 'csstemplate/px.handlebars',
      // 按图标的文件名生成类名
      // 因windows操作系统文件名不能有特殊字符的限制，文件名中要用到的css选择符用【)】表示【>】，用【;】表示【:】
      cssVarMap: function (sprite) {
        const cssName = sprite.name.replace(/;/g, ':').replace(/\)/g, '>')
        const nameList = cssName.split(',')

        for (var i = 0; i < nameList.length; i++) {
          nameList[i] = /\s(\S*)$/.test(nameList[i])
            ? nameList[i].replace(/\s(\S*)$/, ' .tw-ico.x$1')
            : nameList[i].replace(/(^.*$)/, '.tw-ico.x$1')
        }

        sprite.name = nameList.join(',')
      }
    }

    const spriteData = gulp.src(appPaths.src.icons).pipe(spriteSmith(opt))
    spriteData.img.pipe(gulp.dest(appPaths.src.images))

    const gtReg = /&gt;/g
    return spriteData.css.pipe(replace(gtReg, '>')).pipe(gulp.dest(appPaths.src.css))
  }
}

gulp.task('sprite', appTasks.sprite)
gulp.task('watch', ['sprite'], function () {
  // icons文件有变动时，重新生成雪碧图及相对应的css
  return watch(appPaths.src.icons, function () {
    appTasks.sprite()
  })
})
