const Service = require('@vue/cli-service')

module.exports = function (api, {pkgContext, projectOptions}) {
  // console.log('pluginssssss', 'platform/web/preview/plugin')
  api.registerCommand('serve', (args, rawArgv) => {
    const service = new Service(pkgContext, {
      plugins: [], // 必须设置为空，否则会自动加载依赖中的插件
      inlineOptions: projectOptions.vueOptions
    })

    service.run('serve', args, rawArgv).then(() => {

    }).catch(err => {
      console.error(err.message)
    })
  })

  api.registerCommand('build', (args, rawArgv) => {

  })
}