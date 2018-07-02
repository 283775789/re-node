module.exports = {
  project: {
    web: {
      path: 'teewon/projects/web',
      prePath: 'teewon/pre-projects/web',
      packageTemplate: 'teewon/config-templates/web/package.json',
      templatePath: 'teewon/templates/web',
      defaultTemplatePath: 'teewon/templates/web/default',
      scssTemplatePath: 'teewon/scss/web-variables.scss',
      shortcutPath: 'teewon/shortcut/web/vue-html.json'
    },
    mobile: {
      path: 'teewon/projects/mobile',
      prePath: 'teewon/pre-projects/mobile',
      templatePath: 'teewon/templates/mobile',
      defaultTemplatePath: 'teewon/templates/mobile/default',
      scssTemplatePath: 'teewon/scss/mobile-variables.scss',
      shortcutPath: 'teewon/shortcut/mobile/vue-html.json'
    }
  },
  app: {
    stylePath: '/src/static/style',
    styleModulesPath: '/src/static/style/modules',
    assembliesPath: '/src/assemblies',
    compsPath: '/src/assemblies/components',
    scssVariable: '/src/static/style/base/_variables.scss'
  }
}
