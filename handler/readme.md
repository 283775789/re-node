## 文件说明

1. component-list.js 生成组件列表

+ 按组件的demo生成组件列表, demo的模板如下:
+ <template group="xxx" type="xxx" name="xxx">
+ 其中type字段必须与组件对应的scss文件第一行的 /* xxx * / 相同， 会按这里的值生成组件样式映射关系图谱。
+ css与vue组件不能重名

2. component-scss.js 生成scss变量模板

按web项目或移动项目的style/base/_variable.scss中的注释生成样式变量模板。

/* ------------------------------ 分组注释 ------------------------------ */

/* 模块名{类型+} */
$color-main: #26a8ff !default; // 变量显示名称

类型有:
Color 表示颜色模块
NoChange 表示不需要改动的模块
Spacing 表示间距模块
String 表示字本值模块

所有的模块后可以跟[+]号表示是否允许添加变量值

变量显示名可以按如下分组，会生成个个radio组：
[前台样式:web, 后台样式:admin, 移动端样式:mobile]

3. scss.js 将scss模板编译成json对象,也可反编译json对象到scss模板

4. markdown.js 预编译markdown文件，解析.md用{{组件}}引入的组件
